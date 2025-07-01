"use client"; // Ensure it's a client component
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react"; // Icons for mobile menu

const menuList = [
  { id: "1", name: "Home", href: "/" },
  { id: "2", name: "About", href: "/about" },
  { id: "3", name: "Mission", href: "/mission" },
  { id: "4", name: "Blog", href: "/blog" },
  { id: "5", name: "Contact", href: "/contact" },
  { id: "6", name: "Prospectus", href: "/prospectus" },
  { id: "7", name: "FAQs", href: "/faq" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image src="/logo.png" width={50} height={50} alt="Logo" className="cursor-pointer" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {menuList.map((menu) => (
            <Link
              key={menu.id}
              href={menu.href}
              className="text-gray-700 font-medium hover:text-blue-500 transition duration-300"
            >
              {menu.name}
            </Link>
          ))}
        </div>

        {/* Login Button */}
        <Link
          href="/sign-in"
          className="hidden md:block bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold 
                    hover:bg-blue-600 active:bg-blue-800 transition duration-300"
        >
          Login
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          {menuList.map((menu) => (
            <Link
              key={menu.id}
              href={menu.href}
              className="block px-6 py-3 text-gray-700 font-medium hover:bg-gray-100 transition duration-300"
              onClick={() => setIsOpen(false)} // Close menu on click
            >
              {menu.name}
            </Link>
          ))}
          <Link
            href="/sign-in"
            className="block m-4 text-center bg-blue-700 text-white py-2 rounded-lg font-semibold hover:bg-blue-600"
            onClick={() => setIsOpen(false)} // Close menu on click
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
