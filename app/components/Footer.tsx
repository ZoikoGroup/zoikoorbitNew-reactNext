"use client";

import Image from "next/image";
import { FaXTwitter, FaLinkedinIn, FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa6";
import { HiOutlineLocationMarker, HiOutlineMail } from "react-icons/hi";
import { FiPhone } from "react-icons/fi";

const socialLinks = [
  { Icon: FaXTwitter, label: "X (Twitter)", href: "https://x.com/zoikoorbit" },
  { Icon: FaLinkedinIn, label: "LinkedIn", href: "https://www.linkedin.com/uas/login?session_redirect=%2Fcompany%2F107837431" },
  { Icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/zoikoorbit/" },
  { Icon: FaFacebookF, label: "Facebook", href: "https://www.facebook.com/ZoikoOrbit/" },
    { Icon: FaYoutube, label: "Youtube",  href:"https://www.youtube.com/@ZoikoOrbit" },
];

export default function Footer() {
  return (
    <footer className="bg-teal-700 text-white">
      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-5 gap-10">

        {/* Logo + Description */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl p-3 inline-block">
            <Image
              src="/image/Rectangle 14.png"
              alt="Zoiko Orbit"
              width={110}
              height={40}
            />
          </div>

          <p className="mt-6 text-sm text-gray-200 leading-relaxed max-w-sm">
            Zoiko Orbit&trade; delivers seamless global eSIM connectivity for travelers and
            businesses, empowering them to stay connected anywhere &mdash; while supporting
            animal welfare with every plan.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="font-semibold mb-4">Explore</h3>
          <ul className="space-y-2 text-gray-200 text-sm">
            <li><a href="/coverages" className="hover:underline">Coverage</a></li>
            <li><a href="/plans" className="hover:underline">Plans</a></li>
            <li><a href="/travel-ecosystem-partner" className="hover:underline">Ecosystem</a></li>
            <li><a href="/about-us" className="hover:underline">About Us</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold mb-4">Support &amp; Help</h3>
          <ul className="space-y-2 text-gray-200 text-sm">
            <li><a href="/support" className="hover:underline">Support Center</a></li>
            <li><a href="/faqs" className="hover:underline">FAQs</a></li>
            <li><a href="/accessibility" className="hover:underline">Accessibility Options</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-semibold mb-4">Legal &amp; Privacy</h3>
          <ul className="space-y-2 text-gray-200 text-sm">
            <li><a href="/privacy-policy" className="hover:underline">Privacy Policy</a></li>
            <li><a href="/terms-of-service" className="hover:underline">Terms Of Service</a></li>
            <li><a href="/cookie-preferences" className="hover:underline">Cookie Preferences</a></li>
          </ul>
        </div>

      </div>

      {/* MIDDLE SECTION */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-10">

          {/* Business */}
          <div>
            <h3 className="font-semibold mb-4">For Business</h3>
            <ul className="space-y-2 text-gray-200 text-sm">
              <li><a href="/partner-with-us" className="hover:underline">Partner With Us</a></li>
              <li><a href="/travel-agencies-otas" className="hover:underline">Travel Agencies &amp; OTAs</a></li>
              <li><a href="/corporate-travel-solutions/" className="hover:underline">Corporate Travel Solutions</a></li>
              <li><a href="/api-integrations" className="hover:underline">API Integrations</a></li>
            </ul>
          </div>

          {/* Corporate */}
          <div>
            <h3 className="font-semibold mb-4">Corporate &amp; Responsibility</h3>
            <ul className="space-y-2 text-gray-200 text-sm">
              <li><a href="/corporate-responsibility" className="hover:underline">Corporate Responsibility</a></li>
              <li><a href="/investor-relations" className="hover:underline">Investor Relations</a></li>
              <li><a href="/press-media" className="hover:underline">Press &amp; Media</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm text-gray-200">
              <p className="flex items-center gap-2">
                <HiOutlineLocationMarker />
                1401 21st Street, Suite R, Sacramento, CA 95811
              </p>

             <p className="flex items-center gap-2">
  <FiPhone />
  <a href="tel:+18004845574" className=" hover:text-blue-800 underline">
    +1 800-484-5574
  </a>
</p>


              <p className="flex items-center gap-2">
  <HiOutlineMail />
  <a href="mailto:info@zoikoorbit.com" className=" hover:text-purple-800 underline">
    info@zoikoorbit.com
  </a>
</p>

            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Connect with us</h3>

            <div className="flex gap-4">
              {socialLinks.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-white/30 hover:bg-white hover:text-teal-700 transition cursor-pointer"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}