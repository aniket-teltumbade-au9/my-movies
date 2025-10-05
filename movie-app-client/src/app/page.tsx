import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center relative overflow-y-auto px-4">
      <div className="w-full max-w-[680px] z-10 text-center">
        <h1 className="text-[#fff] text-[64px] lg:text-[80px] font-bold leading-[72px] lg:leading-[88px] mb-6">
          Your Personal Movie Database
        </h1>

        <p className="text-[#fff]/70 text-[18px] lg:text-[20px] leading-[28px] mb-12 max-w-[540px] mx-auto">
          Track, rate, and discover your favorite films. Build your ultimate movie collection and never forget what to watch next.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/sign-up"
            className="w-full sm:w-auto min-w-[180px] px-8 py-4 bg-[#fff] text-[#000] rounded-[8px] font-semibold text-[16px] hover:bg-[#fff]/90 transition-all"
          >
            Sign Up
          </Link>

          <Link
            href="/sign-in"
            className="w-full sm:w-auto min-w-[180px] px-8 py-4 bg-transparent text-[#fff] rounded-[8px] font-semibold text-[16px] border-2 border-[#fff]/20 hover:border-[#fff]/40 transition-all"
          >
            Sign In
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
          <div>
            <h3 className="text-[#fff] font-semibold text-[18px] mb-2">Track</h3>
            <p className="text-[#fff]/60 text-[14px] leading-[20px]">
              Keep track of every movie you've watched and want to watch
            </p>
          </div>
          <div>
            <h3 className="text-[#fff] font-semibold text-[18px] mb-2">Rate</h3>
            <p className="text-[#fff]/60 text-[14px] leading-[20px]">
              Rate and review films to remember your favorites
            </p>
          </div>
          <div>
            <h3 className="text-[#fff] font-semibold text-[18px] mb-2">Discover</h3>
            <p className="text-[#fff]/60 text-[14px] leading-[20px]">
              Find new films based on your taste and preferences
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}