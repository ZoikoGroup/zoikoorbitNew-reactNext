"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, User, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  {
    label: "Solutions",
    dropdown: [
      { label: "For Personal Travelers", href: "/personal-travelers" },
      { label: "For Enterprises", href: "/enterprises" },
      { label: "For Ecosystem Partners", href: "/travel-ecosystem-partner" },
    ],
  },
  { label: "Plans", href: "/plans" },
  {
    label: "Ecosystem Partners",
    dropdown: [
      { label: "Travelers", href: "/travelers" },
      { label: "Businesses", href: "/businesses-enterprises" },
    ],
  },
  { label: "Support", href: "/support" },
];

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [orbitOpen, setOrbitOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Timer used to delay dropdown close on mouse-leave so the user has
  // a moment to move the cursor onto the panel without it snapping shut.
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const router = useRouter();

  // Cart key must match whatever BuyPlanModal writes to.
  const CART_KEY = "driverx_checkout";

  // ── Cart count syncing ────────────────────────────────
  useEffect(() => {
    const readCount = () => {
      try {
        const raw = localStorage.getItem(CART_KEY);
        const arr = raw ? JSON.parse(raw) : [];
        setCartCount(Array.isArray(arr) ? arr.length : 0);
      } catch {
        setCartCount(0);
      }
    };

    readCount();
    window.addEventListener("storage", readCount);
    window.addEventListener("cart:updated", readCount);

    return () => {
      window.removeEventListener("storage", readCount);
      window.removeEventListener("cart:updated", readCount);
    };
  }, []);

  // ── Login check ───────────────────────────────────────
  useEffect(() => {
    const token = localStorage.getItem("zoikoorbit_token");
    setIsLoggedIn(!!token);
  }, []);

  // Clean up any pending close-timer on unmount
  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  // ── Dropdown handlers ─────────────────────────────────
  const handleOpenDropdown = (label: string) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenDropdown(label);
  };

  const handleCloseDropdown = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150); // small delay so the cursor can travel onto the panel
  };

  // ── Logout ────────────────────────────────────────────
  const handleLogout = () => {
    localStorage.removeItem("zoikoorbit_token");
    localStorage.removeItem("zoikoorbit_user");
    setIsLoggedIn(false);
    setOrbitOpen(false);
    router.push("/login");
  };

  return (
    <header className="bg-[#0b7285] text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/image/Rectangle 14.png"
            alt="Zoiko"
            width={110}
            height={40}
            className="bg-white rounded-lg p-1"
          />
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => {
            const hasDropdown = !!item.dropdown;
            const isOpen = openDropdown === item.label;

            return (
              <div
                key={item.label}
                className="relative py-2"
                onMouseEnter={() => hasDropdown && handleOpenDropdown(item.label)}
                onMouseLeave={() => hasDropdown && handleCloseDropdown()}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-gray-200 font-medium"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    className="flex items-center gap-1 font-medium cursor-pointer"
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                )}

                {hasDropdown && isOpen && (
                  /* 
                    Wrapper sits flush against the trigger (top-full).
                    Inner padding-top creates breathing room while still
                    being part of the hover zone — eliminates the gap.
                  */
                  <div className="absolute top-full left-0 pt-2 z-50">
                    <div className="bg-white text-black rounded-xl shadow-lg py-3 w-64">
                      {item.dropdown!.map((d) => (
                        <Link
                          key={d.label}
                          href={d.href}
                          className="block px-5 py-2 hover:bg-gray-100"
                        >
                          {d.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* Cart */}
          <Link
            href="/checkout"
            className="relative cursor-pointer"
            aria-label="Cart"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-[#0b328c] leading-none">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {/* My Orbit Dropdown — click-toggle, with click-outside close */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOrbitOpen(!orbitOpen)}
              aria-haspopup="true"
              aria-expanded={orbitOpen}
              className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition cursor-pointer"
            >
              <User size={18} />
              My Orbit
              <ChevronDown
                size={14}
                className={`transition-transform ${orbitOpen ? "rotate-180" : ""}`}
              />
            </button>

            {orbitOpen && (
              <>
                {/* invisible overlay to close on outside click */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setOrbitOpen(false)}
                />
                <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-48 py-2 z-50">
                  {isLoggedIn ? (
                    <>
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setOrbitOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setOrbitOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        href="/register"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setOrbitOpen(false)}
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}