import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-6">
      <h1 className="text-6xl font-bold text-[#0d2d47] mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">
        The page you are looking for does not exist.
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-[#0d2d47] text-white rounded-lg hover:bg-[#10365a] transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
