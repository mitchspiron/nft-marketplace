"use client";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, Upload, Clock, X, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function CreateNFT() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    royalties: "10",
    collection: "default",
    duration: "24",
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    simulateUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    simulateUpload(file);
  };

  const simulateUpload = (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);

    const reader = new FileReader();
    reader.onloadend = () => {
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous connecteriez à une blockchain et minteriez le NFT
    alert("NFT création en cours de traitement...");
  };

  const collections = [
    { id: "default", name: "Collection par défaut" },
    { id: "cyber", name: "CyberPunk" },
    { id: "abstract", name: "Abstract Future" },
    { id: "neon", name: "Neon Dreams" },
    { id: "retro", name: "Retro Pixel" },
  ];

  const auctionDurations = [
    { value: "24", label: "24 heures" },
    { value: "48", label: "48 heures" },
    { value: "72", label: "3 jours" },
    { value: "168", label: "7 jours" },
    { value: "720", label: "30 jours" },
  ];

  return (
    <section className="relative overflow-hidden bg-black py-20 md:py-32 mx-0">
      {/* Background elements from HeroBanner */}
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
      ></div>

      <div className="absolute top-1/4 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

      <div className="container relative max-w-7xl mx-auto px-6">
        <div className="flex flex-col mb-12 z-10">
          <Badge
            variant="outline"
            className="bg-white/10 backdrop-blur-md text-gray-300 px-4 py-2 rounded-sm mb-4 w-fit border-white/10"
          >
            <span className="font-medium">Créez votre œuvre digitale</span>
            <ChevronRight className="h-4 w-4 ml-2" />
          </Badge>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Créer un NFT <br />
            <span className="relative">
              unique
              <span className="absolute -bottom-2 left-0 h-1 w-24 bg-white rounded-sm"></span>
            </span>
          </h1>

          <p className="text-lg text-gray-400 max-w-xl mt-4 leading-relaxed">
            Transformez votre art en actifs numériques. Créez, vendez et
            partagez vos créations uniques avec notre communauté d'amateurs
            d'art.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-10 relative z-10">
          {/* Prévisualisation - 2 colonnes */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="relative group flex-grow rounded-md">
              {/* Cadre brillant autour de l'aperçu */}
              <div className="absolute -inset-0.5 bg-white/30 rounded-sm blur-xl opacity-50 group-hover:opacity-70 transition duration-1000"></div>

              <div className="h-full border-white/20 bg-black bg-opacity-80 backdrop-blur-xl">
                {/* Zone d'upload ou prévisualisation */}
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
                        Déposez votre image ici
                      </h3>
                      <p className="text-sm text-gray-400 text-center mb-4">
                        PNG, JPG, GIF, WEBP ou MP4. Max 100MB.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-sm border-white/20 text-white hover:bg-white/10 hidden"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Parcourir les fichiers
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

                {/* Badge sur l'image */}
                <CardContent className="border-t border-white/10 p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-400">
                        {formData.collection !== "default"
                          ? collections.find(
                              (c) => c.id === formData.collection
                            )?.name
                          : "Collection"}
                      </p>
                      <h3 className="text-lg font-bold text-white">
                        {formData.title || "Titre de votre NFT"}
                      </h3>
                    </div>
                    {formData.price && (
                      <Badge
                        variant="outline"
                        className="bg-white text-black border-white px-3 py-1 rounded-sm"
                      >
                        <span className="font-medium">
                          {formData.price} ETH
                        </span>
                      </Badge>
                    )}
                  </div>

                  {formData.duration && (
                    <div className="flex items-center gap-2 mt-3 text-gray-400">
                      <Clock className="h-3.5 w-3.5" />
                      <span className="text-xs">
                        Durée:{" "}
                        {
                          auctionDurations.find(
                            (d) => d.value === formData.duration
                          )?.label
                        }
                      </span>
                    </div>
                  )}
                </CardContent>
              </div>
            </div>

            {/* Liste de vérification */}
            <Card className="mt-6 bg-white/5 backdrop-blur-md border-white/10">
              <CardContent className="">
                <h3 className="text-lg font-medium text-white mb-2">
                  Vérifications
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-gray-400">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Format d'image supporté</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-400">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Frais de création: 0.01 ETH</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-400">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Royalties configurées à {formData.royalties}%</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Alert className="mt-4 bg-white/5 border-white/10">
              <AlertDescription className="text-gray-400">
                Vos NFT seront visibles dans votre profil après confirmation sur
                la blockchain.
              </AlertDescription>
            </Alert>
          </div>

          {/* Formulaire - 3 colonnes */}
          <div className="lg:col-span-3">
            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white">
                  Détails de votre NFT
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-gray-400">
                      Titre *
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      placeholder="Donnez un nom à votre création"
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
                      placeholder="Décrivez votre œuvre, son histoire et ce qui la rend spéciale"
                      className="bg-black/40 border-white/20 text-white placeholder-gray-500 focus-visible:ring-white/30"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="price" className="text-gray-400">
                        Prix (ETH) *
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
                          <SelectValue placeholder="Sélectionner une collection" />
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
                        Durée de la vente
                      </Label>
                      <Select
                        value={formData.duration}
                        onValueChange={(value) =>
                          handleSelectChange("duration", value)
                        }
                      >
                        <SelectTrigger className="w-full bg-black/40 border-white/20 text-white focus:ring-white/30">
                          <SelectValue placeholder="Sélectionner une durée" />
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
                      Créer le NFT
                    </Button>

                    <p className="text-xs text-gray-500 mt-3 text-center">
                      En créant ce NFT, vous acceptez les conditions et frais de
                      transaction de la plateforme.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
