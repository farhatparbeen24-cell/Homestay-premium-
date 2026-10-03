import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F5F7F8] text-[#101B2D] flex flex-col items-center justify-center p-6 text-center">
      <span className="text-xs text-[#8FA08A] font-medium mb-2">
        Mountain trail notice
      </span>
      <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#101B2D] mb-4">
        404 - Sanctuary Not Found
      </h1>
      <p className="text-sm text-[#101B2D]/75 max-w-md mx-auto mb-8 leading-relaxed">
        The path you are looking for has drifted into the mist. Return to the main homestay lodge below.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-gradient-to-r from-[#C9993F] to-[#E3C27A] hover:brightness-105 text-[#101B2D] text-sm font-medium rounded-xl transition-all shadow-sm"
      >
        Return to Homestay
      </Link>
    </div>
  );
}
