import { NFT } from "@/types/nft";
import GridCard from "./GridCard";
import ListCard from "./ListCard";

interface NFTDisplayProps {
  nfts: NFT[];
  displayMode: "grid" | "list";
  isProfile: boolean;
}

export default function NFTDisplay({
  nfts,
  displayMode,
  isProfile,
}: NFTDisplayProps) {
  return (
    <div
      className={`
      ${
        displayMode === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          : "space-y-4"
      }
    `}
    >
      {nfts.map((nft) =>
        displayMode === "grid" ? (
          <GridCard key={nft.id} nft={nft} isProfile={isProfile} />
        ) : (
          <ListCard key={nft.id} nft={nft} isProfile={isProfile} />
        )
      )}
    </div>
  );
}
