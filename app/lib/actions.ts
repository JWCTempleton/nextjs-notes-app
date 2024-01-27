"use server";

import { signIn, auth, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { EditNote } from "../ui/buttons";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export type State = {
  errors?: {
    note?: string[];
  };
  message?: string | null;
};

export type CreateUserState = {
  errors?: {
    email?: string[];
    username?: string[];
    password?: string[];
  };
  message: string | null;
};

const FormSchema = z.object({
  note: z.string().min(1, {
    message: "Please enter at least 1 character",
  }),
  is_public: z.boolean() || null,
  is_important: z.boolean() || null,
  //   date: z.string(),
});

const UserSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  username: z.string().min(3, {
    message: "Usernames must be longer than 3 characters.",
  }),
  password: z.string().min(6, {
    message: "Passwords must be greater than 6 characters.",
  }),
});

const CreateNote = FormSchema.omit({
  //   date: true,
  //   public: true,
  //   important: true,
});

const CreateUser = UserSchema;

const UpdateNote = FormSchema;

export async function createNote(prevState: State, formData: FormData) {
  const session = await auth();
  const userEmail = session?.user?.email;

  const validatedFields = CreateNote.safeParse({
    note: formData.get("note"),
    is_public: (formData.get("public") === "on" && true) || false,
    is_important: (formData.get("important") === "on" && true) || false,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to create Note",
    };
  }
  const { note, is_public, is_important } = validatedFields.data;
  try {
    const userData = await sql`
        SELECT user_id, name, is_suspended from noteusers WHERE email = ${`${userEmail}`};
    `;

    await sql`
        INSERT INTO notes (user_id, content, is_public, is_important) VALUES
            (${userData.rows[0].user_id}, ${note}, ${is_public}, ${is_important})
    `;
  } catch (error) {
    return {
      message: "Database error: Failed to create Note",
    };
  }
  revalidatePath("/usernotes");
  revalidatePath("/notes");
  redirect("/usernotes");
}

export async function createUser(
  prevState: CreateUserState,
  formData: FormData
) {
  const validatedFields = CreateUser.safeParse({
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to create User",
    };
  }

  const { email, username, password } = validatedFields.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await sql`
            INSERT INTO noteusers (name, email, password)
                VALUES (${username}, ${email}, ${hashedPassword})
            
        `;
  } catch (error) {
    return {
      message: "Database error: Failed to create Note",
    };
  }
  await signIn("credentials", validatedFields.data);
  redirect("/usernotes");
}
// WHERE NOT EXISTS (
//     SELECT null FROM noteusers WHERE (email, name) =
//     (${email}, ${username})
// )
// SELECT name FROM noteusers WHERE name = ${`${username}`}

export async function updateNote(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateNote.safeParse({
    note: formData.get("note"),
    is_public: (formData.get("public") === "on" && true) || false,
    is_important: (formData.get("important") === "on" && true) || false,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to create Note",
    };
  }
  const { note, is_public, is_important } = validatedFields.data;

  try {
    await sql`
    UPDATE notes SET content = ${note}, is_public = ${is_public}, is_important = ${is_important} WHERE note_id = ${id}
  `;
  } catch (error) {
    return {
      message: "Database error: Failed to create Note",
    };
  }

  revalidatePath("/usernotes");
  redirect("/usernotes");
}

export async function deleteNote(id: string) {
  await sql`
        DELETE FROM notes WHERE note_id = ${id}
    `;
  revalidatePath("/usernotes");
}
