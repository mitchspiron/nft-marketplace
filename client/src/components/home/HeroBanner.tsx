import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight, Star, Clock, Zap } from "lucide-react";
import AnimatedGrid from "./AnimatedGrid";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-black py-20 md:py-32 mx-0">
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 800"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle cx="400" cy="400" r="300" fill="rgba(255,255,255,0.03)" />
        <circle cx="200" cy="200" r="150" fill="rgba(255,255,255,0.05)" />
        <circle cx="600" cy="600" r="200" fill="rgba(255,255,255,0.04)" />
      </svg>

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
      >
        {/*  <AnimatedGrid /> */}
      </div>

      <div className="absolute top-1/4 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

      <div className="container relative grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 items-center max-w-7xl mx-auto px-6">
        <div className="flex flex-col space-y-8 z-10">
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md w-fit px-4 py-2 rounded-sm mb-4">
            <span className="text-gray-300 text-sm font-medium">
              Découvrez l'univers NFT
            </span>
            <ChevronRight className="h-4 w-4 text-gray-300" />
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
            Brada NFTs <br />
            <span className="relative">
              Marketplace
              <span className="absolute -bottom-2 left-0 h-1 w-24 bg-white rounded-sm"></span>
            </span>
          </h1>

          <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
            Explorez l'art digital le plus exclusif sur la marketplace NFTVerse.
            Achetez, vendez et découvrez des items digitaux uniques créés par
            des artistes talentueux.
          </p>

          <div className="flex flex-wrap gap-6 pt-4">
            <Button
              asChild
              size="lg"
              className="rounded-sm px-8 py-6 text-lg font-medium bg-white text-black hover:bg-gray-200 transition-all duration-300 shadow-lg shadow-white/10"
            >
              <Link href="/explore" className="flex items-center gap-2">
                Explore Collection
                <ChevronRight className="h-5 w-5" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-sm px-8 py-6 text-lg font-medium border-2 border-white/20 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
            >
              <Link href="/sell">Create NFT</Link>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-8">
            <div className="p-4 bg-white/5 backdrop-blur-md rounded-sm border border-white/10 transition-all hover:bg-white/10 hover:scale-105 duration-300">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-gray-400" />
                <div className="text-sm text-gray-500">Collections</div>
              </div>
              <div className="text-3xl font-bold text-white">200K+</div>
            </div>

            <div className="p-4 bg-white/5 backdrop-blur-md rounded-sm border border-white/10 transition-all hover:bg-white/10 hover:scale-105 duration-300">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 text-gray-400" />
                <div className="text-sm text-gray-500">Artistes</div>
              </div>
              <div className="text-3xl font-bold text-white">10K+</div>
            </div>

            <div className="p-4 bg-white/5 backdrop-blur-md rounded-sm border border-white/10 transition-all hover:bg-white/10 hover:scale-105 duration-300">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-gray-400" />
                <div className="text-sm text-gray-500">Communauté</div>
              </div>
              <div className="text-3xl font-bold text-white">423K+</div>
            </div>
          </div>
        </div>

        <div className="relative group z-10">
          <div className="absolute -inset-0.5 bg-white/30 rounded-sm blur-xl opacity-50 group-hover:opacity-70 transition duration-1000"></div>

          <div className="relative p-1 bg-black bg-opacity-80 backdrop-blur-xl rounded-sm overflow-hidden border border-white/20">
            <div className="aspect-square w-full overflow-hidden rounded-sm">
              <div className="relative h-full w-full group-hover:scale-105 transition-all duration-700">
                <img
                  src={`/images/nft9.jpg`}
                  alt="NFT Premium Collection"
                  className="object-cover h-full w-full rounded-sm grayscale contrast-125"
                />

                {/* Badge sur l'image */}
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/70 backdrop-blur-md rounded-sm border border-white/10">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-400">
                        Collection Premium
                      </p>
                      <h3 className="text-lg font-bold text-white">
                        CyberPunk #2077
                      </h3>
                    </div>
                    <div className="bg-white rounded-sm px-3 py-1">
                      <span className="text-black font-medium">2.5 ETH</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
