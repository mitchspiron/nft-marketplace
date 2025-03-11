import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormProps } from "@/types/nft.type";

const Form: React.FC<FormProps> = ({
  formData,
  collections,
  auctionDurations,
  handleChange,
  handleSubmit,
  handleSelectChange,
}) => {
  return (
    <div>
      <Card className="bg-white/5 backdrop-blur-md border-white/10">
        <CardHeader>
          <CardTitle className="text-white">NFT Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-400">
                Title *
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Give a name to your creation"
                className="bg-black/40 border-white/20 text-white placeholder-gray-500 focus-visible:ring-white/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-400">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe your artwork, its story, and what makes it special"
                className="bg-black/40 border-white/20 text-white placeholder-gray-500 focus-visible:ring-white/30"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-gray-400">
                  Price (ETH) *
                </Label>
                <Input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0.001"
                  step="0.001"
                  placeholder="0.00"
                  className="bg-black/40 border-white/20 text-white placeholder-gray-500 focus-visible:ring-white/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="royalties" className="text-gray-400">
                  Royalties (%)
                </Label>
                <Input
                  type="number"
                  id="royalties"
                  name="royalties"
                  value={formData.royalties}
                  onChange={handleChange}
                  min="0"
                  max="20"
                  className="bg-black/40 border-white/20 text-white placeholder-gray-500 focus-visible:ring-white/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="collection" className="text-gray-400">
                  Collection
                </Label>
                <Select
                  value={formData.collection}
                  onValueChange={(value) =>
                    handleSelectChange("collection", value)
                  }
                >
                  <SelectTrigger className="w-full bg-black/40 border-white/20 text-white focus:ring-white/30">
                    <SelectValue placeholder="Select a collection" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-white/20">
                    {collections.map((collection) => (
                      <SelectItem
                        key={collection.id}
                        value={collection.id}
                        className="text-white"
                      >
                        {collection.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration" className="text-gray-400">
                  Sale Duration
                </Label>
                <Select
                  value={formData.duration}
                  onValueChange={(value) =>
                    handleSelectChange("duration", value)
                  }
                >
                  <SelectTrigger className="w-full bg-black/40 border-white/20 text-white focus:ring-white/30">
                    <SelectValue placeholder="Select a duration" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-white/20">
                    {auctionDurations.map((duration) => (
                      <SelectItem
                        key={duration.value}
                        value={duration.value}
                        className="text-white"
                      >
                        {duration.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator className="bg-white/10 my-6" />

            <div>
              <Button
                type="submit"
                size="lg"
                className="cursor-pointer w-full rounded-sm py-6 text-lg font-medium bg-white text-black hover:bg-gray-200 transition-all duration-300 shadow-lg shadow-white/10"
              >
                Create NFT
              </Button>

              <p className="text-xs text-gray-500 mt-3 text-center">
                By creating this NFT, you agree to the platform's terms and transaction fees.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Form;