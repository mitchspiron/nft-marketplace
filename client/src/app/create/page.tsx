"use client";
import React, { useState, useRef } from "react";

import { Card, CardContent } from "@/components/ui/card";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, CheckCircle } from "lucide-react";
import Form from "@/components/sell/Form";
import NFTUploader from "@/components/sell/NFTUploader";

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
    console.log("Image", file);
    console.log("File", fileInputRef.current);
    
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
    // Here, you would connect to a blockchain and mint the NFT
    console.log("DATA", formData);
    
    alert("NFT creation in progress...");
  };

  const collections = [
    { id: "default", name: "Default Collection" },
    { id: "cyber", name: "CyberPunk" },
    { id: "abstract", name: "Abstract Future" },
    { id: "neon", name: "Neon Dreams" },
    { id: "retro", name: "Retro Pixel" },
  ];

  const auctionDurations = [
    { value: "24", label: "24 hours" },
    { value: "48", label: "48 hours" },
    { value: "72", label: "3 days" },
    { value: "168", label: "7 days" },
    { value: "720", label: "30 days" },
  ];

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
      ></div>

      <div className="absolute top-1/4 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

      <div className="container relative max-w-7xl mx-auto px-6">
        <div className="flex flex-col mb-12 z-10">
          <Badge
            variant="outline"
            className="bg-white/10 backdrop-blur-md text-gray-300 px-4 py-2 rounded-sm mb-4 w-fit border-white/10"
          >
            <span className="font-medium">Create your digital artwork</span>
            <ChevronRight className="h-4 w-4 ml-2" />
          </Badge>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Create an NFT <br />
            <span className="relative">
              unique
              <span className="absolute -bottom-2 left-0 h-1 w-24 bg-white rounded-sm"></span>
            </span>
          </h1>

          <p className="text-lg text-gray-400 max-w-xl mt-4 leading-relaxed">
            Transform your art into digital assets. Create, sell, and share your unique creations with our community of art enthusiasts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-10 relative z-10">
          {/* Preview */}
          <div className="lg:col-span-2 flex flex-col">
            <NFTUploader
              previewImage={previewImage}
              isUploading={isUploading}
              uploadProgress={uploadProgress}
              handleImageChange={handleImageChange}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
              clearImage={clearImage}
              fileInputRef={fileInputRef}
              formData={formData}
              collections={collections}
              auctionDurations={auctionDurations}
            />

            {/* Checklist */}
            <Card className="mt-6 bg-white/5 backdrop-blur-md border-white/10">
              <CardContent className="">
                <h3 className="text-lg font-medium text-white mb-2">
                  Checklist
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-gray-400">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Supported image format</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-400">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Creation fee: 0.01 ETH</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-400">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Royalties set to {formData.royalties}%</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Alert className="mt-4 bg-white/5 border-white/10">
              <AlertDescription className="text-gray-400">
                Your NFTs will be visible in your profile after confirmation on the blockchain.
              </AlertDescription>
            </Alert>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <Form
              formData={formData}
              collections={collections}
              auctionDurations={auctionDurations}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleSelectChange={handleSelectChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
}