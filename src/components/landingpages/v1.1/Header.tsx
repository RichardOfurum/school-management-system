"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image';

interface LinkItem {
  title: string;
  href: string;
}

const linkData: LinkItem[] = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Mission", href: "/mission" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" },
  { title: "Prospectus", href: "/prospectus" },
  { title: "FAQs", href: "/faq" },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-[#FCF8F1] bg-opacity-30">
      <div className="px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="flex">
              <Image height={50} width={50} className=" auto object-cover rounded-full" src="/logo.png" alt="" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
              </svg>
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
            {linkData.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                className="text-base text-black transition-all duration-200 hover:text-opacity-80 font-semibold"
              >
                {link.title}
              </Link>
            ))}
          </nav>

          <Link 
            href="/sign-in" 
            className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 text-base transition-all duration-200 hover:bg-sky-700 hover:text-gray-100 focus:text-gray-100 focus:bg-yellow-300 font-semibold text-white bg-sky-950 rounded-full" 
            role="button"
          >
            School Dashboard
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="pt-2 pb-4 space-y-2">
            {linkData.map((link) => (
              <Link
                href={link.href}
                key={`mobile-${link.href}`}
                className="block px-3 py-2 text-base font-medium text-black rounded-md hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}
            <Link
                href="/sign-in"
                className="block px-3 py-2 text-base font-medium text-black rounded-md hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                School Dashboard
              </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;