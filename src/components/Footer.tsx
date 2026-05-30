
export default function Footer() {
  return (
    <footer className="border-t border-cream-200 bg-cream-50/50 py-8 dark:border-dark-border dark:bg-[#0C0D0E]/50 text-center text-xs text-cream-500 dark:text-dark-text-secondary no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
        <p className="font-serif tracking-wider font-semibold text-cream-900 dark:text-[#E8E7E3]">VERITAS</p>
        <p>
          Powered by <span className="font-semibold text-accent-blue">Wire</span> — The Query Layer for the Internet.
        </p>
        <p className="text-2xs text-cream-400 dark:text-neutral-600">
          &copy; {new Date().getFullYear()} Veritas Research. Build-a-thon Submission.
        </p>
      </div>
    </footer>
  );
}
