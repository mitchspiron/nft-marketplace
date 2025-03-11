"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Clock, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import GridCard from "../nft-display/GridCard";

export default function RecentNFTs() {
  const recentNFTs = [
    {
      id: 1,
      title: "Neon Dreams #423",
      artist: "CyberArtist",
      price: "1.25 ETH",
      priceUSD: "$2,150",
      timeLeft: "6h 23m",
      likes: 124,
      image: "/images/nft1.jpg",
      category: "Art Digital",
      description: "A vibrant digital artwork exploring neon aesthetics",
      owner: "0x1234567890123456789012345678901234567890",
      creator: "0x9876543210987654321098765432109876543210",
    },
    {
      id: 2,
      title: "Quantum Realm #89",
      artist: "DigitalEther",
      price: "0.78 ETH",
      priceUSD: "$1,340",
      timeLeft: "2h 05m",
      likes: 87,
      image: "/images/nft2.jpg",
      category: "Collectibles",
    },
    {
      id: 3,
      title: "Abstract Future #12",
      artist: "NeoBrush",
      price: "2.15 ETH",
      priceUSD: "$3,698",
      timeLeft: "12h 40m",
      likes: 209,
      image: "/images/nft3.jpg",
      category: "Art Digital",
    },
    {
      id: 4,
      title: "Retro Pixel #345",
      artist: "Pixel8",
      price: "0.45 ETH",
      priceUSD: "$774",
      timeLeft: "3h 12m",
      likes: 65,
      image: "/images/nft4.jpg",
      category: "Gaming",
    },
    {
      id: 5,
      title: "Cosmic Voyage #72",
      artist: "StarDust",
      price: "1.85 ETH",
      priceUSD: "$3,182",
      timeLeft: "9h 18m",
      likes: 176,
      image: "/images/nft5.jpg",
      category: "Art Digital",
    },
    {
      id: 6,
      title: "Digital Soul #221",
      artist: "ByteCreator",
      price: "3.20 ETH",
      priceUSD: "$5,504",
      timeLeft: "4h 55m",
      likes: 312,
      image: "/images/nft6.jpg",
      category: "Musique",
    },
  ];

  return (
    <section className="relative bg-black py-24">
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>

      {/* Effet de grille en arrière-plan */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0",
        }}
      ></div>

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Latest{" "}
              <span className="relative">
                NFTs
                <span className="absolute -bottom-1 left-0 h-1 w-12 bg-white rounded-sm"></span>
              </span>
            </h2>
            <p className="text-gray-400 mt-3 max-w-xl">
              Discover the latest unique works added to our marketplace by
              artists from around the world.
            </p>
          </div>

          <Button
            asChild
            variant="ghost"
            className="hidden md:flex items-center gap-2 text-white hover:bg-white/10 border border-white/10 rounded-sm"
          >
            <Link href="/marketplace">
              See all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentNFTs.map((nft) => (
            <GridCard key={nft.id} nft={nft} />
          ))}
        </div>

        <div className="mt-10 flex justify-center md:hidden">
          <Button
            asChild
            variant="ghost"
            className="flex items-center gap-2 text-white hover:bg-white/10 border border-white/10 rounded-sm px-6"
          >
            <Link href="/marketplace">
              See the entire collection
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
