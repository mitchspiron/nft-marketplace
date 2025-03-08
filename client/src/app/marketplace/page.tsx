"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  ArrowDown,
  ArrowUp,
  Grid,
  LayoutGrid,
  Heart,
  Clock,
  ArrowUpRight,
  ChevronDown,
  Check,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function NFTMarketplace() {
  // États pour gérer les filtres et l'affichage
  const [viewMode, setViewMode] = useState("grid"); // grid ou list
  const [priceFilter, setPriceFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");

  // Catégories fictives pour les filtres
  const categories = [
    "Tous",
    "Art Digital",
    "Collectibles",
    "Musique",
    "Sport",
    "Photographie",
    "Gaming",
    "Domaines",
    "Mèmes",
  ];

  // Données fictives pour les NFTs
  const allNFTs = [
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
    {
      id: 7,
      title: "Cyberwave #77",
      artist: "NeonWave",
      price: "1.12 ETH",
      priceUSD: "$1,926",
      timeLeft: "8h 10m",
      likes: 145,
      image: "/images/nft7.jpg",
      category: "Art Digital",
    },
    {
      id: 8,
      title: "Stellar Odyssey #419",
      artist: "GalacticMind",
      price: "2.70 ETH",
      priceUSD: "$4,644",
      timeLeft: "5h 30m",
      likes: 231,
      image: "/images/nft8.jpg",
      category: "Collectibles",
    },
    {
      id: 9,
      title: "Virtual Dimension #34",
      artist: "DigitalDreamer",
      price: "0.95 ETH",
      priceUSD: "$1,634",
      timeLeft: "7h 45m",
      likes: 102,
      image: "/images/nft9.jpg",
      category: "Gaming",
    },
    {
      id: 10,
      title: "Ethereal Soundscape #56",
      artist: "AudioVisual",
      price: "1.68 ETH",
      priceUSD: "$2,890",
      timeLeft: "10h 20m",
      likes: 185,
      image: "/images/nft10.jpg",
      category: "Musique",
    },
    {
      id: 11,
      title: "Digital Genesis #128",
      artist: "CryptoCreator",
      price: "4.35 ETH",
      priceUSD: "$7,482",
      timeLeft: "1h 15m",
      likes: 340,
      image: "/images/nft11.jpg",
      category: "Art Digital",
    },
    {
      id: 12,
      title: "Techno Illusion #99",
      artist: "VirtualVision",
      price: "2.25 ETH",
      priceUSD: "$3,870",
      timeLeft: "6h 50m",
      likes: 197,
      image: "/images/nft12.jpg",
      category: "Art Digital",
    },
  ];

  // Filtrage des NFTs selon les critères
  const filteredNFTs = allNFTs
    .filter((nft) => {
      // Filtre par recherche
      const matchesSearch =
        nft.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        nft.artist.toLowerCase().includes(searchQuery.toLowerCase());

      // Filtre par catégorie
      const matchesCategory =
        categoryFilter === "all" || nft.category === categoryFilter;

      // Filtre par prix
      let matchesPrice = true;
      if (priceFilter === "under1") {
        matchesPrice = parseFloat(nft.price) < 1;
      } else if (priceFilter === "1to2") {
        matchesPrice = parseFloat(nft.price) >= 1 && parseFloat(nft.price) <= 2;
      } else if (priceFilter === "over2") {
        matchesPrice = parseFloat(nft.price) > 2;
      }

      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      // Tri des NFTs
      if (sortBy === "recent") {
        return a.id - b.id; // Simplifié pour l'exemple
      } else if (sortBy === "priceAsc") {
        return parseFloat(a.price) - parseFloat(b.price);
      } else if (sortBy === "priceDesc") {
        return parseFloat(b.price) - parseFloat(a.price);
      } else if (sortBy === "popularity") {
        return b.likes - a.likes;
      }
      return 0;
    });

  return (
    <section className="bg-black min-h-screen pt-28 pb-20">
      <div className="container max-w-7xl mx-auto px-6">
        {/* En-tête de la section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">
            Explorer les{" "}
            <span className="relative">
              NFTs
              <span className="absolute -bottom-1 left-0 h-1 w-16 bg-white rounded-sm"></span>
            </span>
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Découvrez notre collection complète d'œuvres numériques uniques.
            Utilisez les filtres pour trouver rapidement les NFTs qui vous
            intéressent.
          </p>
        </div>

        {/* Barre de recherche principale */}
        <div className="relative mb-10">
          <Input
            type="text"
            placeholder="Rechercher par nom, artiste, collection..."
            className="bg-white/5 border border-white/10 rounded-sm text-white pl-12 pr-4 py-6 w-full focus:outline-none focus:ring-1 focus:ring-white/20 focus:bg-white/10 transition-all text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
        </div>

        {/* Filtres et options d'affichage */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          {/* Filtres */}
          <div className="flex flex-wrap gap-4">
            {/* Filtre par catégorie */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-sm hover:text-white cursor-pointer"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Catégorie
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/95 backdrop-blur-md border border-white/10 rounded-sm text-white">
                <DropdownMenuLabel>Catégories</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                {categories.map((category, index) => (
                  <DropdownMenuItem
                    key={index}
                    className="flex items-center justify-between hover:bg-white/10 cursor-pointer"
                    onClick={() =>
                      setCategoryFilter(index === 0 ? "all" : category)
                    }
                  >
                    {category}
                    {(categoryFilter === category ||
                      (categoryFilter === "all" && index === 0)) && (
                      <Check className="h-4 w-4" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Filtre par prix */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-sm hover:text-white cursor-pointer"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Prix
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/95 backdrop-blur-md border border-white/10 rounded-sm text-white">
                <DropdownMenuLabel>Fourchette de prix</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem
                  className="flex items-center justify-between hover:bg-white/10 cursor-pointer"
                  onClick={() => setPriceFilter("all")}
                >
                  Tous les prix
                  {priceFilter === "all" && <Check className="h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center justify-between hover:bg-white/10 cursor-pointer"
                  onClick={() => setPriceFilter("under1")}
                >
                  Moins de 1 ETH
                  {priceFilter === "under1" && <Check className="h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center justify-between hover:bg-white/10 cursor-pointer"
                  onClick={() => setPriceFilter("1to2")}
                >
                  1 à 2 ETH
                  {priceFilter === "1to2" && <Check className="h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center justify-between hover:bg-white/10 cursor-pointer"
                  onClick={() => setPriceFilter("over2")}
                >
                  Plus de 2 ETH
                  {priceFilter === "over2" && <Check className="h-4 w-4" />}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Tri */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-sm w-[180px] cursor-pointer">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent className="bg-black/95 backdrop-blur-md border border-white/10 rounded-sm text-white">
                <SelectItem value="recent" className="hover:bg-white/10">
                  Plus récents
                </SelectItem>
                <SelectItem value="priceAsc" className="hover:bg-white/10">
                  Prix croissant
                </SelectItem>
                <SelectItem value="priceDesc" className="hover:bg-white/10">
                  Prix décroissant
                </SelectItem>
                <SelectItem value="popularity" className="hover:bg-white/10">
                  Popularité
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Contrôles d'affichage */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className={`rounded-sm ${
                viewMode === "grid" ? "bg-white/20" : "bg-white/5"
              } border-white/10 text-white hover:bg-white/10 hover:text-white cursor-pointer`}
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={`rounded-sm ${
                viewMode === "list" ? "bg-white/20" : "bg-white/5"
              } border-white/10 text-white hover:bg-white/10 hover:text-white cursor-pointer`}
              onClick={() => setViewMode("list")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Résultats de recherche */}
        <div className="mb-4">
          <p className="text-gray-400">
            {filteredNFTs.length}{" "}
            {filteredNFTs.length > 1 ? "résultats" : "résultat"} trouvés
          </p>
        </div>

        {/* Affichage des NFTs */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredNFTs.map((nft) => (
              <div
                key={nft.id}
                className="group relative bg-white/5 backdrop-blur-md rounded-sm border border-white/10 overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-white/20"
              >
                <div className="aspect-square w-full overflow-hidden">
                  <img
                    src={nft.image}
                    alt={nft.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale contrast-125"
                  />
                </div>

                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md rounded-sm px-3 py-1.5 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-gray-300" />
                  <span className="text-xs text-gray-300">{nft.timeLeft}</span>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-white">
                      {nft.title}
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <Heart className="h-4 w-4 text-gray-400" />
                      <span className="text-xs text-gray-400">{nft.likes}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 mb-4">par {nft.artist}</p>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="bg-white/10 rounded-sm px-3 py-1">
                        <span className="text-white font-medium">
                          {nft.price}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {nft.priceUSD}
                      </p>
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
        ) : (
          <div className="space-y-4">
            {filteredNFTs.map((nft) => (
              <div
                key={nft.id}
                className="group relative bg-white/5 backdrop-blur-md rounded-sm border border-white/10 overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-white/20"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-48 h-48 overflow-hidden">
                    <img
                      src={nft.image}
                      alt={nft.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale contrast-125"
                    />
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-white">
                          {nft.title}
                        </h3>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1.5">
                            <Heart className="h-4 w-4 text-gray-400" />
                            <span className="text-xs text-gray-400">
                              {nft.likes}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md rounded-sm px-3 py-1.5">
                            <Clock className="h-3.5 w-3.5 text-gray-300" />
                            <span className="text-xs text-gray-300">
                              {nft.timeLeft}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-gray-400 mb-2">
                        par {nft.artist}
                      </p>
                      <p className="text-xs text-gray-500 mb-4">
                        Catégorie: {nft.category}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="bg-white/10 rounded-sm px-3 py-1">
                          <span className="text-white font-medium">
                            {nft.price}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {nft.priceUSD}
                        </p>
                      </div>

                      <Button
                        asChild
                        variant="default"
                        size="sm"
                        className="px-4 py-2 rounded-sm bg-white text-black hover:bg-gray-200"
                      >
                        <Link href={`/nft/${nft.id}`}>Voir détails</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {filteredNFTs.length > 0 && (
          <div className="mt-12">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    className="bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-sm"
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    className="bg-white/20 border-white/10 text-white hover:bg-white/30 rounded-sm"
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    className="bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-sm"
                  >
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    className="bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-sm"
                  >
                    3
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis className="text-gray-400" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    className="bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-sm"
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        {/* Message si aucun résultat */}
        {filteredNFTs.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-gray-400 text-lg mb-4">
              Aucun NFT ne correspond à vos critères de recherche.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setCategoryFilter("all");
                setPriceFilter("all");
              }}
              className="bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-sm"
            >
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
