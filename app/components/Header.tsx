"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDown, Search, User, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

const navLinks = [
  { label: "Plans", href: "/plans" },
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

const languages = ["Arabic", "Dutch", "French", "German", "Italian", "Portuguese"];

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [orbitOpen, setOrbitOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const [cartCount, setCartCount] = useState(0);

  // Cart key must match whatever BuyPlanModal writes to.
  // Default in your modal is "driverx_checkout".
  const CART_KEY = "driverx_checkout";

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

    // Initial read
    readCount();

    // Cross-tab updates (fires in OTHER tabs when localStorage changes)
    window.addEventListener("storage", readCount);

    // Same-tab updates — localStorage doesn't fire 'storage' in the tab
    // that wrote to it, so we use a custom event for that.
    window.addEventListener("cart:updated", readCount);

    return () => {
      window.removeEventListener("storage", readCount);
      window.removeEventListener("cart:updated", readCount);
    };
  }, []);

  const router = useRouter();

  // ✅ Check login (IMPORTANT FIX)
  useEffect(() => {
    const token = localStorage.getItem("zoikoorbit_token"); // <-- correct key
    setIsLoggedIn(!!token);
  }, []);

  // ✅ Logout
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
          {navLinks.map((item) => (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => item.dropdown && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {item.href ? (
                <Link href={item.href} className="hover:text-gray-200 font-medium">
                  {item.label}
                </Link>
              ) : (
                <button className="flex items-center gap-1 font-medium">
                  {item.label}
                  <ChevronDown size={16} />
                </button>
              )}

              {item.dropdown && openDropdown === item.label && (
                <div className="absolute top-8 left-0 bg-white text-black rounded-xl shadow-lg py-3 w-64">
                  {item.dropdown.map((d) => (
                    <Link key={d.label} href={d.href} className="block px-5 py-2 hover:bg-gray-100">
                      {d.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* Search */}
          {/* <Search className="cursor-pointer hidden md:block" size={20} /> */}

          {/* Search */}
          {/* <Search className="cursor-pointer hidden md:block" size={20} /> */}

          {/* Cart */}
          <Link href="/checkout" className="relative cursor-pointer" aria-label="Cart">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-[#0b328c] leading-none">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {/* ✅ My Orbit Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOrbitOpen(!orbitOpen)}
              className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              <User size={18} />
              My Orbit
              <ChevronDown size={14} />
            </button>

            {orbitOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-48 py-2">

                {isLoggedIn ? (
                  <>
                    <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100">
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="block px-4 py-2 hover:bg-gray-100">
                      Login
                    </Link>
                    <Link href="/register" className="block px-4 py-2 hover:bg-gray-100">
                      Register
                    </Link>
                  </>
                )}

              </div>
            )}
          </div>

          {/* Language */}
          {/* <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 font-medium"
            >
              🇺🇸 EN <ChevronDown size={14} />
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-48 py-2">
                {languages.map((lang) => (
                  <div key={lang} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    {lang}
                  </div>
                ))}
              </div>
            )}
          </div> */}

        </div>
      </div>
    </header>
  );
}

