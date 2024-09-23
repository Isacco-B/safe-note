import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="flex flex-col items-center">
          <p className="mb-4 text-sm font-semibold uppercase text-neutral-800 dark:text-neutral-100 md:text-base">
            That’s a 404
          </p>
          <h1 className="font-poppins font-bold text-2xl md:text-3xl text-neutral-700 dark:text-neutral-200">
            Page not found
          </h1>

          <p className="mb-12 max-w-screen-md text-center text-neutral-700 font-poppins md:text-lg">
            The page you’re looking for doesn’t exist.
          </p>

          <Link
            to={"/"}
            className="inline-block rounded-lg bg-gray-100 px-8 py-3 text-center text-sm font-semibold text-neutral-700 hover:bg-gray-300 active:text-neutral-900 md:text-base"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
