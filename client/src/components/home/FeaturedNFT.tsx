"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Clock, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function RecentNFTs() {
  // Données factices pour les NFTs récents
  const recentNFTs = [
    {
      id: 1,
      title: "Neon Dreams #423",
      artist: "CyberArtist",
      price: "1.25 ETH",
      timeLeft: "6h 23m",
      likes: 124,
      image: "/images/nft1.jpg",
    },
    {
      id: 2,
      title: "Quantum Realm #89",
      artist: "DigitalEther",
      price: "0.78 ETH",
      timeLeft: "2h 05m",
      likes: 87,
      image: "/images/nft2.jpg",
    },
    {
      id: 3,
      title: "Abstract Future #12",
      artist: "NeoBrush",
      price: "2.15 ETH",
      timeLeft: "12h 40m",
      likes: 209,
      image: "/images/nft3.jpg",
    },
    {
      id: 4,
      title: "Retro Pixel #345",
      artist: "Pixel8",
      price: "0.45 ETH",
      timeLeft: "3h 12m",
      likes: 65,
      image: "/images/nft4.jpg",
    },
    {
      id: 5,
      title: "Cosmic Voyage #72",
      artist: "StarDust",
      price: "1.85 ETH",
      timeLeft: "9h 18m",
      likes: 176,
      image: "/images/nft5.jpg",
    },
    {
      id: 6,
      title: "Digital Soul #221",
      artist: "ByteCreator",
      price: "3.20 ETH",
      timeLeft: "4h 55m",
      likes: 312,
      image: "/images/nft6.jpg",
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
              Derniers{" "}
              <span className="relative">
                NFTs
                <span className="absolute -bottom-1 left-0 h-1 w-12 bg-white rounded-sm"></span>
              </span>
            </h2>
            <p className="text-gray-400 mt-3 max-w-xl">
              Découvrez les dernières œuvres uniques ajoutées à notre
              marketplace par des artistes du monde entier.
            </p>
          </div>

          <Button
            asChild
            variant="ghost"
            className="hidden md:flex items-center gap-2 text-white hover:bg-white/10 border border-white/10 rounded-sm"
          >
            <Link href="/explore">
              Voir tout
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentNFTs.map((nft) => (
            <div
              key={nft.id}
              className="group relative bg-white/5 backdrop-blur-md rounded-sm border border-white/10 overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-white/20"
            >
              <div className="aspect-square w-full overflow-hidden">
                <img
                  src={nft.image}
                  alt={nft.title}
                  className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md rounded-sm px-3 py-1.5 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-gray-300" />
                <span className="text-xs text-gray-300">{nft.timeLeft}</span>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-white">{nft.title}</h3>
                  <div className="flex items-center gap-1.5">
                    <Heart className="h-4 w-4 text-gray-400" />
                    <span className="text-xs text-gray-400">{nft.likes}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-400 mb-4">par {nft.artist}</p>

                <div className="flex items-center justify-between">
                  <div className="bg-white/10 rounded-sm px-3 py-1">
                    <span className="text-white font-medium">{nft.price}</span>
                  </div>

                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="p-2 rounded-sm hover:bg-white/10"
                  >
                    <Link href={`/nft/${nft.id}`}>
                      <ArrowUpRight className="h-4 w-4 text-white" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center md:hidden">
          <Button
            asChild
            variant="ghost"
            className="flex items-center gap-2 text-white hover:bg-white/10 border border-white/10 rounded-sm px-6"
          >
            <Link href="/explore">
              Voir toute la collection
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
