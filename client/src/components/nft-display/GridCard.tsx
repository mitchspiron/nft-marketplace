import { NFT } from "@/types/nft";
import { ArrowUpRight, Clock, Heart } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

interface GridCardProps {
  nft: NFT;
  isProfile: boolean;
  onClick?: (nft: NFT) => void;
}

export default function GridCard({ nft, isProfile }: GridCardProps) {
  return (
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
          <h3 className="text-lg font-bold text-white">{nft.title}</h3>
          <div className="flex items-center gap-1.5">
            <Heart className="h-4 w-4 text-gray-400" />
            <span className="text-xs text-gray-400">{nft.likes}</span>
          </div>
        </div>

        <p className="text-sm text-gray-400 mb-4">by {nft.artist}</p>

        <div className="flex items-center justify-between">
          <div>
            <div className="bg-white/10 rounded-sm px-3 py-1">
              <span className="text-white font-medium">{nft.price}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">{nft.priceUSD}</p>
          </div>

          {isProfile ? (
            nft.status === "on_sale" ? (
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
            )
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}
