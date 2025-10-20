import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 group">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold">
              A
            </span>
            <span className="text-lg font-semibold tracking-tight group-hover:text-primary transition-colors">
              ASPAC Rural Bank
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a className="hover:text-primary" href="/products">
              Products
            </a>
            <a className="hover:text-primary" href="/loans">
              Loans
            </a>
            <a className="hover:text-primary" href="/about">
              About
            </a>
            <a className="hover:text-primary" href="/contact">
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="/login"
              className="rounded-xl px-3 py-2 text-sm font-medium hover:text-primary"
            >
              Log in
            </a>
            <a
              href="/open"
              className="rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-white shadow hover:bg-aspac-green/90"
            >
              Open an account
            </a>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="bg-neutral-900 text-neutral-200 mt-16">
        <div className="mx-auto max-w-7xl px-4 py-10 grid md:grid-cols-4 gap-8">
          <div>
            <div className="inline-flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold">
                A
              </span>
              <span className="font-semibold">ASPAC Rural Bank</span>
            </div>
            <p className="mt-3 text-sm text-neutral-400">
              Serving communities with secure, accessible financial services.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Products</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a className="hover:text-aspac-yellow" href="/products#savings">
                  Savings
                </a>
              </li>
              <li>
                <a
                  className="hover:text-aspac-yellow"
                  href="/products#time-deposit"
                >
                  Time Deposit
                </a>
              </li>
              <li>
                <a className="hover:text-aspac-yellow" href="/loans">
                  Loans
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white">Company</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a className="hover:text-aspac-yellow" href="/about">
                  About
                </a>
              </li>
              <li>
                <a className="hover:text-aspac-yellow" href="/careers">
                  Careers
                </a>
              </li>
              <li>
                <a className="hover:text-aspac-yellow" href="/contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white">Get the App</h4>
            <div className="mt-3 flex gap-3">
              <a
                className="rounded-xl bg-white text-primary px-4 py-2 text-sm font-semibold"
                href="#"
              >
                App Store
              </a>
              <a
                className="rounded-xl bg-white text-primary px-4 py-2 text-sm font-semibold"
                href="#"
              >
                Google Play
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-6 text-xs text-neutral-400 flex items-center justify-between">
            <p>
              © {new Date().getFullYear()} ASPAC Rural Bank, Inc. All rights
              reserved.
            </p>
            <div className="flex items-center gap-4">
              <a className="hover:text-aspac-yellow" href="/privacy">
                Privacy
              </a>
              <a className="hover:text-aspac-yellow" href="/terms">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
