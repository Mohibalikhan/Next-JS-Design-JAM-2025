"use client";
import { useState, useEffect, useRef } from "react";
import { useCart } from "../app/Context/CartContext";
import { AiOutlineSearch, AiOutlineHeart, AiOutlineShoppingCart, } from "react-icons/ai";
import Link from "next/link";
import Image from 'next/image';
import { signOut, useSession } from "next-auth/react";
import Vector from '../../public/Vector.png';
import NikeLogo from '../../public/NIKE.png';

// Mock API to fetch categories
const fetchCategories = async () => {
  return ["unicollection", "Kids", "Sale", "Snkrs"];
};

const Header = () => {
  const { getTotalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();
  
  // Search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadCategories = async () => {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    };
    loadCategories();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredCategories([]);
    } else {
      const filtered = categories.filter(category =>
        category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  }, [searchTerm, categories]);

  // Close search dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchTerm("");
        setFilteredCategories([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getCategoryUrl = (category: string) => {
    const categoryName = category.toLowerCase().replace(" ", "-");
    return `/${categoryName}`;
  };

  return (
    <div>
      {/* First Header (Top Links) */}
      <header className="text-gray-600 body-font bg-gray-200 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 md:px-8">
          <h1 className="sm:text-2xl text-xl mt-2 font-bold text-gray-900 mb-4 md:mb-0">
            <Image src={Vector} alt="Logo" className="h-6 w-auto" />
          </h1>

          <div className='flex items-center justify-end gap-4 text-[#0c0303] '>
            <nav className="text-sm md:text-base ">
              <Link href={'./store'}>Locate a Store  | </Link>
              <Link href={'./help'}>Help | </Link>
              <Link href={'./join'}>Join Us </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Header (Logo and Navigation) */}
      <header className="text-black text-sm body-font bg-white shadow-md">
        <div className="container mx-auto flex p-3 justify-between items-center px-4 sm:px-6 md:px-8">
          <h1 className="sm:text-2xl text-xl mt-2 font-bold text-gray-900 mb-4 md:mb-0">
            <Image src={NikeLogo} alt="Logo" className="h-7 w-auto" />
          </h1>

          {/* Desktop Navigation Links */}
          <nav className="md:ml-auto md:mr-auto flex-wrap items-center text-base justify-center space-x-6 hidden md:flex font-bold">
            <Link href={'/'} className="mr-2 hover:text-gray-900">New & Featured</Link>
            <Link href={'./unicollection'} className="mr-5 hover:text-gray-900">Men</Link>
            <Link href={'/unicollection'} className="mr-5 hover:text-gray-900">Women</Link>
            <Link href={'/kids'} className="mr-5 hover:text-gray-900">Kids</Link>
            <Link href={'/sale'} className="mr-5 hover:text-gray-900">Sale</Link>
            <Link href={'./snkrs'} className="mr-5 hover:text-gray-900">SNKRS</Link>
          </nav>

          {/* Search Bar, Wishlist Icon, Cart Icon, Hamburger Menu for Mobile, User Profile */}
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative hidden md:block" ref={searchRef}>
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-100 rounded-lg px-4 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <AiOutlineSearch
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                size={20}
              />
              {/* Dropdown of Categories */}
              {searchTerm && (
                <div className="absolute top-full left-0 right-0 bg-white shadow-lg max-h-60 overflow-y-auto z-10">
                  {filteredCategories.map((category, index) => (
                    <Link key={index} href={getCategoryUrl(category)}>
                      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        {category}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Wishlist Icon */}
            <Link href={'/wishlist'}>
              <AiOutlineHeart className="text-gray-600 hover:text-gray-900 cursor-pointer" size={24} />
            </Link>

            {/* Cart Icon */}
            <div className="relative">
              <Link href={'/cart'}>
                <AiOutlineShoppingCart className="text-gray-600 hover:text-gray-900 cursor-pointer" size={24} />
              </Link>
              {getTotalItems() > 0 && (
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                  {getTotalItems()}
                </div>
              )}
            </div>

            {/* User Profile */}
            {session ? (
              <div className="relative flex items-center gap-2">
                <img
                  src={session.user?.image??"default-profile.png"}
                  alt="User Profile"
                  className="w-10 h-10 rounded-full border-2 border-gray-200 cursor-pointer"
                />
                <button onClick={() => signOut()} className="text-red-500">Sign Out</button>
              </div>
            ) : (
              <Link href="/login">
                <button className="text-blue-500">Sign In</button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="text-gray-600 md:hidden flex items-center"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Links */}
        {menuOpen && (
          <nav className="md:hidden flex flex-col items-center bg-gray-50 p-4 space-y-4">
            <Link href={"/"} className="hover:text-gray-900">New & Featured</Link>
            <Link href={"/unicollection"} className="hover:text-gray-900">Men</Link>
            <Link href={"/unicollection"} className="hover:text-gray-900">Women</Link>
            <Link href={"/kids"} className="hover:text-gray-900">Kids</Link>
            <Link href={'/sale'} className="hover:text-gray-900">Sale</Link>
            <Link href={'./snkrs'} className="hover:text-gray-900">SNKRS</Link>

            {/* Close Menu Icon */}
            <button 
            className="mt-4 text-gray-600" 
            onClick={() => setMenuOpen(false)}
            >

            </button>
          </nav>
        )}
      </header>
    </div>
  );
};

export default Header;
