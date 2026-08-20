import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-rich-black text-gray-900 dark:text-white transition-colors duration-300 font-sans">
      <div className="text-center px-4">
        <h1 className="text-6xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-electric-indigo to-purple-600 mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-4xl font-bold mb-6 tracking-tight">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-10 max-w-md mx-auto text-sm md:text-base leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-electric-indigo text-white font-semibold shadow-lg shadow-electric-indigo/20 hover:bg-indigo-600 hover:scale-105 hover:shadow-electric-indigo/40 transition-all duration-300"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
