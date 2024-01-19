export type User = {
  user_id: string;
  name: string;
  email: string;
  password: string;
  created_at: string;
  is_admin: boolean;
  is_suspended: boolean;
};

export type Note = {
  note_id: string;
  user_id: string;
  name: string;
  content: string;
  created_at: string;
  is_important: boolean;
  is_public: boolean;
};
