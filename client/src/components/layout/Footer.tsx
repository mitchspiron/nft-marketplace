"use client";
import React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Twitter, Instagram, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/10">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      <div className="container max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="relative h-8 w-8 bg-white rounded-sm">
                <div className="absolute inset-1 bg-black rounded-sm"></div>
              </div>
              <span className="text-white font-bold text-xl tracking-tight">
                Brada NFTs
              </span>
            </Link>

            <p className="text-gray-400 mb-6 leading-relaxed">
              Brada NFTs est la marketplace de référence pour découvrir,
              collectionner et échanger des NFTs exclusifs créés par des
              artistes du monde entier.
            </p>

            <div className="flex space-x-4">
              <Link
                href="/twitter"
                className="p-2 bg-white/5 rounded-sm hover:bg-white/10 transition-colors"
              >
                <Twitter className="h-5 w-5 text-gray-400 hover:text-white" />
              </Link>
              <Link
                href="/instagram"
                className="p-2 bg-white/5 rounded-sm hover:bg-white/10 transition-colors"
              >
                <Instagram className="h-5 w-5 text-gray-400 hover:text-white" />
              </Link>
              <Link
                href="/linkedin"
                className="p-2 bg-white/5 rounded-sm hover:bg-white/10 transition-colors"
              >
                <Linkedin className="h-5 w-5 text-gray-400 hover:text-white" />
              </Link>
              <Link
                href="/github"
                className="p-2 bg-white/5 rounded-sm hover:bg-white/10 transition-colors"
              >
                <Github className="h-5 w-5 text-gray-400 hover:text-white" />
              </Link>
            </div>
          </div>

          <div className="md:col-span-2 md:col-start-6">
            <h3 className="text-white font-semibold text-lg mb-4">
              Marketplace
            </h3>
            <ul className="space-y-3">
              {[
                "Explorer",
                "Collections",
                "Top NFTs",
                "Catégories",
                "Vendre",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors relative group"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-white font-semibold text-lg mb-4">
              Newsletter
            </h3>
            <p className="text-gray-400 mb-4">
              Abonnez-vous pour rester informé des nouveautés et actualités.
            </p>

            <div className="space-y-3">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Votre email"
                  className="bg-white/5 border border-white/10 rounded-sm text-white pl-4 pr-10 py-2 focus:outline-none focus:ring-1 focus:ring-white/20 focus:bg-white/10 transition-all"
                />
                <Button
                  size="sm"
                  className="absolute right-1 top-1 rounded-sm bg-white/10 hover:bg-white/20 text-white p-1"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-gray-500 text-xs">
                En vous abonnant, vous acceptez notre politique de
                confidentialité.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Brada NFTs. Tous droits réservés.
          </p>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link
              href="/privacy"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Confidentialité
            </Link>
            <Link
              href="/terms"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Conditions d'utilisation
            </Link>
            <Link
              href="/cookies"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
