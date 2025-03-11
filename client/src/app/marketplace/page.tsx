"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Grid,
  LayoutGrid,
  ChevronDown,
  Check,
} from "lucide-react";
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
import NFTDisplay from "@/components/nft-display/NFTDisplay";
import { categories, allNFTs } from "@/constants";
import { NFT } from "@/types/nft";

export default function NFTMarketplace() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceFilter, setPriceFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNFTs: NFT[] = allNFTs
    .filter((nft) => {
      // Filter by search query
      const matchesSearch =
        nft.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        nft.artist.toLowerCase().includes(searchQuery.toLowerCase());

      // Filter by category
      const matchesCategory =
        categoryFilter === "all" || nft.category === categoryFilter;

      // Filter by price
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
      // Sort of NFTs
      if (sortBy === "recent") {
        return a.id - b.id;
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
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">
            Explore the{" "}
            <span className="relative">
              NFTs
              <span className="absolute -bottom-1 left-0 h-1 w-16 bg-white rounded-sm"></span>
            </span>
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Discover our complete collection of unique digital works. Use the
            filters to quickly find the NFTs that interest you.
          </p>
        </div>

        <div className="relative mb-10">
          <Input
            type="text"
            placeholder="Search by name, artist, collection..."
            className="bg-white/5 border border-white/10 rounded-sm text-white pl-12 pr-4 py-6 w-full focus:outline-none focus:ring-1 focus:ring-white/20 focus:bg-white/10 transition-all text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-sm hover:text-white cursor-pointer"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Category
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/95 backdrop-blur-md border border-white/10 rounded-sm text-white">
                <DropdownMenuLabel>Categories</DropdownMenuLabel>
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-sm hover:text-white cursor-pointer"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Price
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/95 backdrop-blur-md border border-white/10 rounded-sm text-white">
                <DropdownMenuLabel>Price range</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem
                  className="flex items-center justify-between hover:bg-white/10 cursor-pointer"
                  onClick={() => setPriceFilter("all")}
                >
                  All prices
                  {priceFilter === "all" && <Check className="h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center justify-between hover:bg-white/10 cursor-pointer"
                  onClick={() => setPriceFilter("under1")}
                >
                  Less than 1 ETH
                  {priceFilter === "under1" && <Check className="h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center justify-between hover:bg-white/10 cursor-pointer"
                  onClick={() => setPriceFilter("1to2")}
                >
                  1 to 2 ETH
                  {priceFilter === "1to2" && <Check className="h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center justify-between hover:bg-white/10 cursor-pointer"
                  onClick={() => setPriceFilter("over2")}
                >
                  More than 2 ETH
                  {priceFilter === "over2" && <Check className="h-4 w-4" />}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-sm w-[180px] cursor-pointer">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent className="bg-black/95 backdrop-blur-md border border-white/10 rounded-sm text-white">
                <SelectItem value="recent" className="hover:bg-white/10">
                  Most recent
                </SelectItem>
                <SelectItem value="priceAsc" className="hover:bg-white/10">
                  Increasing price
                </SelectItem>
                <SelectItem value="priceDesc" className="hover:bg-white/10">
                  Descending price
                </SelectItem>
                <SelectItem value="popularity" className="hover:bg-white/10">
                  Popularity
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

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

        <div className="mb-4">
          <p className="text-gray-400">
            {filteredNFTs.length}{" "}
            {filteredNFTs.length > 1 ? "résultats" : "résultat"} found
          </p>
        </div>

        {/* Display NFTs */}
        <NFTDisplay
          nfts={filteredNFTs}
          displayMode={viewMode}
          isProfile={false}
        />

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
              No NFTs match your search criteria.
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
              Reset filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
