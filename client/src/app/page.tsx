import HeroBanner from "@/components/home/HeroBanner";
import FeaturedNFT from "@/components/home/FeaturedNFT";

export default function HomePage() {
  return (
    <main className="flex-1">
      <HeroBanner />
      <FeaturedNFT />
    </main>
  );
}
