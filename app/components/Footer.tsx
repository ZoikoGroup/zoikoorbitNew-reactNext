"use client";

import Image from "next/image";
import { FaXTwitter, FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa6";
import { HiOutlineLocationMarker, HiOutlineMail } from "react-icons/hi";
import { FiPhone } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-teal-700 text-white">
      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-6 gap-10">

        {/* Logo + Description */}
        <div className="col-span-2 md:col-span-2">
          <div className="bg-white rounded-xl p-3 inline-block">
            <Image
              src="/image/Rectangle 14.png"
              alt="Zoiko Orbit"
              width={100}
              height={50}
            />
          </div>

          <p className="mt-6 text-sm text-gray-200 leading-relaxed max-w-sm">
            Zoiko Orbit&trade; delivers seamless global eSIM connectivity for
            travelers and businesses, empowering them to stay connected anywhere
            &mdash; while supporting animal welfare with every plan.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="font-semibold mb-4">Explore</h3>
          <ul className="space-y-2 text-gray-200 text-sm">
            <li>
              <a href="/coverage" className="hover:underline">
                Coverage
              </a>
            </li>
            <li>
              <a href="/plans" className="hover:underline">
                Plans
              </a>
            </li>
            <li>
              <a href="/travel-ecosystem-partner" className="hover:underline">
                Ecosystem
              </a>
            </li>
            <li>
              <a href="/about-us" className="hover:underline">
                About Us
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold mb-4">Support &amp; Help</h3>
          <ul className="space-y-2 text-gray-200 text-sm">
            <li>Support Center</li>
            <li>
              <a href="/faqs" className="hover:underline">
                FAQs
              </a>
            </li>
            <li>
              <a href="/accessibility" className="hover:underline">
                Accessibility Options
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-semibold mb-4">Legal &amp; Privacy</h3>
          <ul className="space-y-2 text-gray-200 text-sm">
            <li>Privacy Policy</li>
            <li>Terms Of Service</li>
            <li>Cookie Preferences</li>
          </ul>
        </div>

        {/* Business */}
        <div>
          <h3 className="font-semibold mb-4">For Business</h3>
          <ul className="space-y-2 text-gray-200 text-sm">
            <li>Partner With Us</li>
            <li>Travel Agencies &amp; OTAs</li>
            <li>Corporate Travel Solutions</li>
            <li>API Integrations</li>
          </ul>
        </div>
      </div>

      {/* MIDDLE SECTION */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-10">

          {/* Corporate */}
          <div>
            <h3 className="font-semibold mb-4">Corporate &amp; Responsibility</h3>
            <ul className="space-y-2 text-gray-200 text-sm">
              <li>
                <a href="/corporate-responsibility" className="hover:underline">
                  Corporate Responsibility
                </a>
              </li>
              <li>
                <a href="/investor-relations" className="hover:underline">
                  Investor Relations
                </a>
              </li>
              <li>
                <a href="/press-media" className="hover:underline">
                  Press &amp; Media
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm text-gray-200">
              <p className="flex items-start gap-2">
                <HiOutlineLocationMarker className="mt-0.5 flex-shrink-0" />
                <span>1401 21st Street, Suite R, Sacramento, CA 95811</span>
              </p>
              <p className="flex items-center gap-2">
                <FiPhone />
                +1 800-484-5574
              </p>
              <p className="flex items-center gap-2">
                <HiOutlineMail />
                info@zoikoorbit.com
              </p>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Connect with us</h3>
            <div className="flex gap-4">
              {[FaXTwitter, FaLinkedinIn, FaInstagram, FaFacebookF].map(
                (Icon, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-white/30 hover:bg-white hover:text-teal-700 transition cursor-pointer"
                  >
                    <Icon size={16} />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}