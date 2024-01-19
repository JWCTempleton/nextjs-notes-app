// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export default function NoteSkeleton() {
  return (
    <div className="mx-auto mt-10 w-8/12 border-solid border-2 rounded-xl bg-gray-300 p-4">
      {/* <div
        className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
      > */}
      <div
        className={`${shimmer} mx-6 relative mb-4 h-8 w-20 overflow-hidden rounded-md bg-gray-100`}
      />
      <div className="flex p-4">
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8"></div>
    </div>
    // </div>
  );
}
