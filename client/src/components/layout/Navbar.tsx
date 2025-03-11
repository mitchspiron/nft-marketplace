"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Menu, X, Bell, User } from "lucide-react";
import { MenuItems } from "@/constants";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-md z-50 border-b border-white/10">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-8 w-8 bg-white rounded-sm">
              <div className="absolute inset-1 bg-black rounded-sm"></div>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              Brada NFTs
            </span>
          </Link>

          {/* Navigation principale - Desktop */}
          <nav className="hidden md:flex space-x-8">
            {MenuItems.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className="text-gray-300 hover:text-white transition-colors relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Contrôles principaux - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-white/5 border border-white/10 rounded-sm text-white pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-1 focus:ring-white/20 focus:bg-white/10 transition-all"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            <button className="text-gray-300 hover:text-white">
              <Bell className="h-5 w-5" />
            </button>

            <button className="p-0.5 bg-white/10 rounded-sm hover:bg-white/20 transition-colors">
              <User className="h-5 w-5 text-white" />
            </button>

            <Button className="rounded-sm px-4 py-2 bg-white text-black hover:bg-gray-200 transition-all">
              Connect Wallet
            </Button>
          </div>

          {/* Menu mobile */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Menu mobile déroulant */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-white/10">
          <div className="container max-w-7xl mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {MenuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.link}
                  className="text-gray-300 hover:text-white py-2 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="mt-6 space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-white/5 border border-white/10 rounded-sm text-white pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-white/20 focus:bg-white/10 transition-all"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex space-x-4">
                  <button className="text-gray-300 hover:text-white">
                    <Bell className="h-5 w-5" />
                  </button>
                  <button className="p-0.5 bg-white/10 rounded-sm hover:bg-white/20 transition-colors">
                    <User className="h-5 w-5 text-white" />
                  </button>
                </div>

                <Button className="rounded-sm px-4 py-2 bg-white text-black hover:bg-gray-200 transition-all">
                  Connect Wallet
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
