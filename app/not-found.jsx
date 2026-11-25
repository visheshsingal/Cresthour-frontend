import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070b14] text-white p-4">
      <div className="text-center max-w-md space-y-4">
        <div className="text-6xl font-black text-emerald-400">404</div>
        <h1 className="text-2xl font-bold">Page Not Found</h1>
        <p className="text-sm text-slate-400">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-colors"
        >
          Back to Cresthour Home
        </Link>
      </div>
    </div>
  );
}
