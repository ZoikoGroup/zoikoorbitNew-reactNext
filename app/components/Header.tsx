"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Search, User, ShoppingCart, X, Menu } from "lucide-react";
import { useRouter } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  {
    label: "Solutions",
    dropdown: [
      { label: "For Personal Travelers", href: "/solutions/personal" },
      { label: "For Enterprises", href: "/solutions/enterprise" },
      { label: "For Ecosystem Partners", href: "/solutions/partners" },
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

const languages = [
  { code: "EN", flag: "🇺🇸", label: "English" },
  { code: "AR", flag: "🇸🇦", label: "Arabic" },
  { code: "NL", flag: "🇳🇱", label: "Dutch" },
  { code: "FR", flag: "🇫🇷", label: "French" },
  { code: "DE", flag: "🇩🇪", label: "German" },
  { code: "IT", flag: "🇮🇹", label: "Italian" },
  { code: "PT", flag: "🇵🇹", label: "Portuguese" },
];

const CART_KEY = "driverx_checkout";

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [mobileSearchFocus, setMobileSearchFocus] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [orbitOpen, setOrbitOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(64);

  const router = useRouter();
  const langRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const mobileSearchRef = useRef<HTMLInputElement>(null);

  // Mount flag for portal
  useEffect(() => { setMounted(true); }, []);

  // Measure header height — re-runs when search bar or mobile menu toggles
  useEffect(() => {
    const measure = () => {
      if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
    };
    const timer = setTimeout(measure, 10); // slight delay so DOM has updated
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", measure);
    };
  }, [searchOpen, mobileMenuOpen]);

  // Cart count
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

  // Auth check
  useEffect(() => {
    const token = localStorage.getItem("zoikoorbit_token");
    setIsLoggedIn(!!token);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
      if (orbitRef.current && !orbitRef.current.contains(e.target as Node)) {
        setOrbitOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close mobile menu on route change / outside tap handled by links

  const handleLogout = () => {
    localStorage.removeItem("zoikoorbit_token");
    localStorage.removeItem("zoikoorbit_user");
    setIsLoggedIn(false);
    setOrbitOpen(false);
    router.push("/login");
  };

  return (
    <>
    <header ref={headerRef} className="bg-[#0b7285] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-3 md:py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <Image
            src="/image/Rectangle 14.png"
            alt="Zoiko Orbit"
            width={110}
            height={40}
            className="bg-white rounded-lg p-1"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.dropdown && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-gray-200 font-medium text-sm xl:text-base whitespace-nowrap transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <button className="flex items-center gap-1 font-medium text-sm xl:text-base whitespace-nowrap hover:text-gray-200 transition-colors">
                  {item.label}
                  <ChevronDown
                    size={15}
                    className={`transition-transform duration-200 ${openDropdown === item.label ? "rotate-180" : ""}`}
                  />
                </button>
              )}

              {item.dropdown && openDropdown === item.label && (
                <div className="absolute top-full left-0 mt-2 bg-white text-gray-800 rounded-xl shadow-xl py-2 w-56 z-50 border border-gray-100">
                  {item.dropdown.map((d) => (
                    <Link
                      key={d.label}
                      href={d.href}
                      className="block px-5 py-2.5 hover:bg-gray-50 hover:text-[#0b7285] text-sm transition-colors"
                    >
                      {d.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-3">

          {/* Search — mobile: opens menu with search focused | desktop: drops bar below header */}
          <button
            onClick={() => {
              if (window.innerWidth < 1024) {
                // Mobile: open menu and focus the search input
                setMobileMenuOpen(true);
                setMobileSearchFocus(true);
              } else {
                // Desktop: toggle search bar below header
                setSearchOpen(!searchOpen);
              }
            }}
            className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Search"
          >
            {searchOpen ? <X size={20} /> : <Search size={20} />}
          </button>

          {/* Cart */}
          <Link
            href="/checkout"
            className="relative flex items-center justify-center w-9 h-9 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Cart"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-[#0b328c] leading-none">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {/* My Orbit Dropdown */}
          <div className="relative" ref={orbitRef}>
            <button
              onClick={() => { setOrbitOpen(!orbitOpen); setLangOpen(false); }}
              className="flex items-center gap-1.5 bg-white text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
            >
              <User size={16} />
              <span className="hidden sm:inline">My Orbit</span>
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${orbitOpen ? "rotate-180" : ""}`}
              />
            </button>

            {orbitOpen && (
              <div className="absolute right-0 mt-2 bg-white text-gray-800 rounded-xl shadow-xl w-48 py-2 border border-gray-100 z-50">
                {isLoggedIn ? (
                  <>
                    <Link href="/dashboard" className="block px-4 py-2.5 hover:bg-gray-50 text-sm transition-colors" onClick={() => setOrbitOpen(false)}>
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 hover:bg-red-50 text-red-600 text-sm transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="block px-4 py-2.5 hover:bg-gray-50 text-sm transition-colors" onClick={() => setOrbitOpen(false)}>
                      Login
                    </Link>
                    <Link href="/register" className="block px-4 py-2.5 hover:bg-gray-50 text-sm transition-colors" onClick={() => setOrbitOpen(false)}>
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Language Selector — desktop only */}
          <div className="relative hidden lg:block" ref={langRef}>
            <button
              onClick={() => { setLangOpen(!langOpen); setOrbitOpen(false); }}
              className="flex items-center gap-1.5 font-medium text-sm hover:text-gray-200 transition-colors"
            >
              <span>{selectedLang.flag}</span>
              <span>{selectedLang.code}</span>
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}
              />
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 bg-white text-gray-800 rounded-xl shadow-xl w-44 py-2 border border-gray-100 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { setSelectedLang(lang); setLangOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm flex items-center gap-2 transition-colors ${selectedLang.code === lang.code ? "text-[#0b7285] font-semibold" : ""}`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Hamburger — mobile/tablet */}
          <button
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              setMobileSearchFocus(false);
            }}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Search Bar — desktop only, drops below header */}
      {searchOpen && (
        <div className="hidden lg:block border-t border-white/20 bg-[#0b7285]">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
            <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-2.5">
              <Search size={18} className="text-white/70 flex-shrink-0" />
              <input
                autoFocus
                type="text"
                placeholder="Search plans, destinations..."
                className="bg-transparent text-white placeholder-white/60 outline-none flex-1 text-sm"
                onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
              />
              <button onClick={() => setSearchOpen(false)} className="text-white/70 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

    </header>

    {/* Mobile Menu — auto-height dropdown below header, full width, page stays scrollable */}
    {mounted && mobileMenuOpen && createPortal(
      <div
        className="fixed left-0 right-0 bg-white text-gray-800 z-[999] shadow-lg lg:hidden"
        style={{ top: headerHeight }}
      >
        {/* Search bar at top of mobile menu */}
        <div className="px-4 py-3 border-b border-gray-100 bg-white">
          <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-2.5">
            <Search size={18} className="text-gray-400 flex-shrink-0" />
            <input
              ref={mobileSearchRef}
              type="text"
              placeholder="Search plans, destinations..."
              className="bg-transparent text-gray-800 placeholder-gray-400 outline-none flex-1 text-sm"
              autoFocus={mobileSearchFocus}
              onFocus={() => setMobileSearchFocus(false)}
            />
            <button
              onClick={() => { setMobileMenuOpen(false); setMobileSearchFocus(false); }}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Mobile Nav Links */}
        <nav className="border-b border-gray-100">
          {navLinks.map((item) => (
            <div key={item.label}>
              {item.href ? (
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center px-5 py-3.5 font-medium border-b border-gray-100 transition-colors ${
                    item.label === "Home"
                      ? "bg-[#1a1a2e] text-white"
                      : "text-gray-800 active:bg-gray-50"
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => setMobileDropdown(mobileDropdown === item.label ? null : item.label)}
                    className="w-full flex items-center justify-between px-5 py-3.5 font-medium text-gray-800 border-b border-gray-100 active:bg-gray-50"
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      className={`text-gray-500 transition-transform duration-200 ${mobileDropdown === item.label ? "rotate-180" : ""}`}
                    />
                  </button>

                  {mobileDropdown === item.label && item.dropdown && (
                    <div className="bg-gray-50">
                      {item.dropdown.map((d) => (
                        <Link
                          key={d.label}
                          href={d.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2 pl-9 pr-5 py-3 text-sm text-gray-600 border-b border-gray-100 last:border-0 active:bg-gray-100"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0b7285]/50 flex-shrink-0" />
                          {d.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </nav>
      </div>,
      document.body
    )}
    </>
  );
}