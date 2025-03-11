import React from "react";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Clock, X } from "lucide-react";
import { UploaderProps } from "@/types/nft.type";
import { Progress } from "../ui/progress";

const NFTUploader: React.FC<UploaderProps> = ({
  previewImage,
  isUploading,
  uploadProgress,
  handleImageChange,
  handleDragOver,
  handleDrop,
  clearImage,
  fileInputRef,
  formData,
  collections,
  auctionDurations,
}) => {
  return (
    <div>
      <div className="relative group flex-grow rounded-md">
        {/* Shiny frame around the preview */}
        <div className="absolute -inset-0.5 bg-white/30 rounded-sm blur-xl opacity-50 group-hover:opacity-70 transition duration-1000"></div>

        <div className="h-full border-white/20 bg-black bg-opacity-80 backdrop-blur-xl">
          <div
            className="aspect-square w-full overflow-hidden relative"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {previewImage ? (
              <>
                <img
                  src={previewImage}
                  alt="NFT Preview"
                  className="object-cover h-full w-full rounded-sm grayscale contrast-125"
                />
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                    <div className="w-32">
                      <Progress
                        value={uploadProgress}
                        className="h-2 bg-white/20"
                      />
                    </div>
                  </div>
                )}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={clearImage}
                  className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/70 border-white/20 text-white hover:bg-white/20 transition-all"
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <div
                className="h-full w-full flex flex-col items-center justify-center bg-black/40 border-2 border-dashed border-white/20 p-8 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-white text-center mb-2">
                  Drop your image here
                </h3>
                <p className="text-sm text-gray-400 text-center mb-4">
                  PNG, JPG, GIF, WEBP or MP4. Max 100MB.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-sm border-white/20 text-white hover:bg-white/10 hidden"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Browse files
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*,video/mp4"
                  className="hidden"
                />
              </div>
            )}
          </div>

          {/* Badge on the image */}
          <CardContent className="border-t border-white/10 p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-400">
                  {formData.collection !== "default"
                    ? collections.find((c) => c.id === formData.collection)
                        ?.name
                    : "Collection"}
                </p>
                <h3 className="text-lg font-bold text-white">
                  {formData.title || "Title of your NFT"}
                </h3>
              </div>
              {formData.price && (
                <Badge
                  variant="outline"
                  className="bg-white text-black border-white px-3 py-1 rounded-sm"
                >
                  <span className="font-medium">{formData.price} ETH</span>
                </Badge>
              )}
            </div>

            {formData.duration && (
              <div className="flex items-center gap-2 mt-3 text-gray-400">
                <Clock className="h-3.5 w-3.5" />
                <span className="text-xs">
                  Duration:{" "}
                  {
                    auctionDurations.find((d) => d.value === formData.duration)
                      ?.label
                  }
                </span>
              </div>
            )}
          </CardContent>
        </div>
      </div>
    </div>
  );
};

export default NFTUploader;
