"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Grid,
  LayoutGrid,
  Heart,
  ChevronDown,
  Check,
  Wallet,
  Tag,
  Clock,
  ArrowUpRight,
  User,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function MyNFTs() {
  // États pour gérer les filtres et l'affichage
  const [viewMode, setViewMode] = useState("grid");
  const [collectionFilter, setCollectionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("owned");
  const [sortBy, setSortBy] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");

  // Collections fictives pour les filtres
  const collections = [
    "Toutes les collections",
    "Bored Ape Yacht Club",
    "CryptoPunks",
    "Azuki",
    "Doodles",
    "Art Blocks",
    "World of Women",
    "Cool Cats",
    "CloneX",
  ];

  // Données fictives pour les NFTs possédés
  const myNFTs = [
    {
      id: 101,
      title: "Neon Dreams #423",
      collection: "Neon Dreams",
      price: "1.25 ETH",
      priceUSD: "$2,150",
      purchaseDate: "15 Jan 2025",
      likes: 124,
      image: "/images/nft1.jpg",
      status: "owned",
    },
    {
      id: 102,
      title: "Quantum Realm #89",
      collection: "Quantum Collection",
      price: "0.78 ETH",
      priceUSD: "$1,340",
      purchaseDate: "2 Feb 2025",
      likes: 87,
      image: "/images/nft2.jpg",
      status: "owned",
    },
    {
      id: 103,
      title: "Abstract Future #12",
      collection: "Abstract Series",
      price: "2.15 ETH",
      priceUSD: "$3,698",
      purchaseDate: "22 Dec 2024",
      likes: 209,
      image: "/images/nft3.jpg",
      status: "owned",
    },
    {
      id: 104,
      title: "Cosmic Voyage #72",
      collection: "Cosmic Series",
      price: "1.85 ETH",
      priceUSD: "$3,182",
      purchaseDate: "5 Mar 2025",
      likes: 176,
      image: "/images/nft5.jpg",
      status: "owned",
    },
    {
      id: 105,
      title: "Retro Pixel #345",
      collection: "Pixel Art",
      price: "0.45 ETH",
      priceUSD: "$774",
      purchaseDate: "18 Feb 2025",
      likes: 65,
      image: "/images/nft4.jpg",
      status: "on_sale",
      listedPrice: "0.55 ETH",
      listedPriceUSD: "$946",
    },
    {
      id: 106,
      title: "Digital Soul #221",
      collection: "Digital Souls",
      price: "3.20 ETH",
      priceUSD: "$5,504",
      purchaseDate: "29 Jan 2025",
      likes: 312,
      image: "/images/nft6.jpg",
      status: "on_sale",
      listedPrice: "4.25 ETH",
      listedPriceUSD: "$7,310",
    },
    {
      id: 107,
      title: "Cyberwave #77",
      collection: "Cyberwave Collection",
      price: "1.12 ETH",
      priceUSD: "$1,926",
      purchaseDate: "10 Feb 2025",
      likes: 145,
      image: "/images/nft7.jpg",
      status: "on_sale",
      listedPrice: "1.45 ETH",
      listedPriceUSD: "$2,494",
    },
    {
      id: 108,
      title: "Virtual Dimension #34",
      collection: "Virtual Dimensions",
      price: "0.95 ETH",
      priceUSD: "$1,634",
      purchaseDate: "3 Jan 2025",
      likes: 102,
      image: "/images/nft9.jpg",
      status: "owned",
    },
  ];

  // Statistiques utilisateur
  const userStats = {
    totalValue: "12.75 ETH",
    totalValueUSD: "$21,930",
    nftsOwned: 8,
    collectionsOwned: 5,
    walletAddress: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    username: "CryptoCollector",
    profileImage: "/images/avatar.jpg",
    joinDate: "Nov 2024",
  };

  // Filtrage des NFTs selon les critères
  const filteredNFTs = myNFTs
    .filter((nft) => {
      // Filtre par recherche
      const matchesSearch =
        nft.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        nft.collection.toLowerCase().includes(searchQuery.toLowerCase());

      // Filtre par collection
      const matchesCollection =
        collectionFilter === "all" || nft.collection === collectionFilter;

      // Filtre par statut
      const matchesStatus =
        statusFilter === "all" || nft.status === statusFilter;

      return matchesSearch && matchesCollection && matchesStatus;
    })
    .sort((a, b) => {
      // Tri des NFTs
      const dateA = new Date(a.purchaseDate).getTime() || 0;
      const dateB = new Date(b.purchaseDate).getTime() || 0;
      if (sortBy === "recent") {
        return dateB - dateA;
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
        {/* En-tête du profil */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
            <div className="h-20 w-20 md:h-24 md:w-24 rounded-full overflow-hidden border-2 border-white/20">
              <img
                src={userStats.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-1">
                    {userStats.username}
                  </h1>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Wallet className="h-4 w-4" />
                    <span className="text-sm truncate">
                      {userStats.walletAddress.slice(0, 6)}...
                      {userStats.walletAddress.slice(-4)}
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-sm"
                >
                  Modifier le profil
                </Button>
              </div>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/5 backdrop-blur-md rounded-sm border border-white/10 p-4">
                  <p className="text-gray-400 text-sm mb-1">Valeur totale</p>
                  <p className="text-white font-bold text-lg">
                    {userStats.totalValue}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {userStats.totalValueUSD}
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-md rounded-sm border border-white/10 p-4">
                  <p className="text-gray-400 text-sm mb-1">NFTs possédés</p>
                  <p className="text-white font-bold text-lg">
                    {userStats.nftsOwned}
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-md rounded-sm border border-white/10 p-4">
                  <p className="text-gray-400 text-sm mb-1">Collections</p>
                  <p className="text-white font-bold text-lg">
                    {userStats.collectionsOwned}
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-md rounded-sm border border-white/10 p-4">
                  <p className="text-gray-400 text-sm mb-1">Membre depuis</p>
                  <p className="text-white font-bold text-lg">
                    {userStats.joinDate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Onglets principaux */}
        <Tabs defaultValue="mynfts" className="mb-8">
          <TabsList className="bg-white/5 border-b border-white/10 p-0 mb-6">
            <TabsTrigger
              value="mynfts"
              className="text-white py-4 px-6 border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:bg-transparent focus:ring-0 rounded-none data-[state=active]:text-white cursor-pointer"
            >
              Mes NFTs
            </TabsTrigger>
            <TabsTrigger
              value="collected"
              className="text-white py-4 px-6 border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:bg-transparent focus:ring-0 rounded-none data-[state=active]:text-white cursor-pointer"
            >
              Collections
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              className="text-white py-4 px-6 border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:bg-transparent focus:ring-0 rounded-none data-[state=active]:text-white cursor-pointer"
            >
              Favoris
            </TabsTrigger>
            <TabsTrigger
              value="activity"
              className="text-white py-4 px-6 border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:bg-transparent focus:ring-0 rounded-none data-[state=active]:text-white cursor-pointer"
            >
              Activité
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mynfts" className="mt-0">
            {/* Barre de recherche et filtres */}
            <div className="relative mb-10">
              <Input
                type="text"
                placeholder="Rechercher dans mes NFTs..."
                className="bg-white/5 border border-white/10 rounded-sm text-white pl-12 pr-4 py-6 w-full focus:outline-none focus:ring-1 focus:ring-white/20 focus:bg-white/10 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
            </div>

            {/* Filtres et options d'affichage */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              {/* Filtres */}
              <div className="flex flex-wrap gap-4">
                {/* Filtre par statut */}
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-sm w-[150px] cursor-pointer">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/95 backdrop-blur-md border border-white/10 rounded-sm text-white">
                    <SelectItem value="all" className="hover:bg-white/10">
                      Tous
                    </SelectItem>
                    <SelectItem value="owned" className="hover:bg-white/10">
                      Possédés
                    </SelectItem>
                    <SelectItem value="on_sale" className="hover:bg-white/10">
                      En vente
                    </SelectItem>
                  </SelectContent>
                </Select>

                {/* Filtre par collection */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-sm hover:text-white cursor-pointer"
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Collection
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-black/95 backdrop-blur-md border border-white/10 rounded-sm text-white">
                    <DropdownMenuLabel>Collections</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/10" />
                    {collections.map((collection, index) => (
                      <DropdownMenuItem
                        key={index}
                        className="flex items-center justify-between hover:bg-white/10 cursor-pointer"
                        onClick={() =>
                          setCollectionFilter(index === 0 ? "all" : collection)
                        }
                      >
                        {collection}
                        {(collectionFilter === collection ||
                          (collectionFilter === "all" && index === 0)) && (
                          <Check className="h-4 w-4" />
                        )}
                      </DropdownMenuItem>
                    ))}
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
                    <SelectItem
                      value="popularity"
                      className="hover:bg-white/10"
                    >
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

            {/* Affichage des NFTs */}
            <div className="mb-4">
              <p className="text-gray-400">
                {filteredNFTs.length} {filteredNFTs.length > 1 ? "NFTs" : "NFT"}{" "}
                trouvés
              </p>
            </div>

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

                    {nft.status === "on_sale" && (
                      <div className="absolute top-3 left-3 bg-emerald-500/80 backdrop-blur-md rounded-sm px-3 py-1.5 flex items-center gap-1.5">
                        <Tag className="h-3.5 w-3.5 text-white" />
                        <span className="text-xs text-white font-medium">
                          En vente
                        </span>
                      </div>
                    )}

                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-white">
                          {nft.title}
                        </h3>
                        <div className="flex items-center gap-1.5">
                          <Heart className="h-4 w-4 text-gray-400" />
                          <span className="text-xs text-gray-400">
                            {nft.likes}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-400 mb-4">
                        {nft.collection}
                      </p>

                      <div className="flex items-center justify-between">
                        <div>
                          {nft.status === "on_sale" ? (
                            <>
                              <div className="bg-white/10 rounded-sm px-3 py-1">
                                <span className="text-white font-medium">
                                  {nft.listedPrice}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                {nft.listedPriceUSD}
                              </p>
                            </>
                          ) : (
                            <>
                              <div className="bg-white/10 rounded-sm px-3 py-1">
                                <span className="text-white font-medium">
                                  {nft.price}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                {nft.priceUSD}
                              </p>
                            </>
                          )}
                        </div>

                        {nft.status === "on_sale" ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-sm border-white/10 text-white hover:bg-white/10"
                          >
                            Annuler
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-sm border-white/20 text-white bg-transparent cursor-pointer"
                          >
                            Vendre
                          </Button>
                        )}
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
                      <div className="w-full md:w-48 h-48 overflow-hidden relative">
                        <img
                          src={nft.image}
                          alt={nft.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale contrast-125"
                        />

                        {nft.status === "on_sale" && (
                          <div className="absolute top-3 left-3 bg-emerald-500/80 backdrop-blur-md rounded-sm px-3 py-1.5 flex items-center gap-1.5">
                            <Tag className="h-3.5 w-3.5 text-white" />
                            <span className="text-xs text-white font-medium">
                              En vente
                            </span>
                          </div>
                        )}
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
                            </div>
                          </div>

                          <p className="text-sm text-gray-400 mb-2">
                            Collection: {nft.collection}
                          </p>
                          <p className="text-xs text-gray-500 mb-2">
                            Acquis le: {nft.purchaseDate}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            {nft.status === "on_sale" ? (
                              <>
                                <div className="bg-white/10 rounded-sm px-3 py-1">
                                  <span className="text-white font-medium">
                                    {nft.listedPrice}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                  {nft.listedPriceUSD}
                                </p>
                              </>
                            ) : (
                              <>
                                <div className="bg-white/10 rounded-sm px-3 py-1">
                                  <span className="text-white font-medium">
                                    {nft.price}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                  {nft.priceUSD}
                                </p>
                              </>
                            )}
                          </div>

                          <div className="flex items-center gap-3">
                            <Button
                              asChild
                              variant="default"
                              size="sm"
                              className="px-4 py-2 rounded-sm bg-white text-black hover:bg-gray-200"
                            >
                              <Link href={`/nft/${nft.id}`}>Voir détails</Link>
                            </Button>

                            {nft.status === "on_sale" ? (
                              <Button
                                variant="outline"
                                size="sm"
                                className="rounded-sm border-white/10 text-white hover:bg-white/10"
                              >
                                Annuler la vente
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                className="px-4 py-2 rounded-sm border-white/20 text-white bg-transparent cursor-pointer"
                              >
                                Mettre en vente
                              </Button>
                            )}
                          </div>
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
                    setCollectionFilter("all");
                    setStatusFilter("all");
                  }}
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-sm"
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="collected" className="mt-0">
            <div className="py-20 text-center">
              <p className="text-gray-400 text-lg mb-4">
                Contenu des collections à venir
              </p>
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="mt-0">
            <div className="py-20 text-center">
              <p className="text-gray-400 text-lg mb-4">
                Contenu des favoris à venir
              </p>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="mt-0">
            <div className="py-20 text-center">
              <p className="text-gray-400 text-lg mb-4">
                Historique d'activité à venir
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
