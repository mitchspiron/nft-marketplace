import { RefObject, ChangeEvent, DragEvent, FormEvent } from "react";

export interface NFTFormData {
  title: string;
  description: string;
  price: string;
  royalties: string;
  collection: string;
  duration: string;
}

export interface Collection {
  id: string;
  name: string;
}

export interface AuctionDuration {
  value: string;
  label: string;
}

export interface FormProps {
  formData: NFTFormData;
  collections: Collection[];
  auctionDurations: AuctionDuration[];
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: FormEvent) => void;
  handleSelectChange: (name: string, value: string) => void;
}

export interface UploaderProps {
  previewImage: string | null;
  isUploading: boolean;
  uploadProgress: number;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDragOver: (e: DragEvent) => void;
  handleDrop: (e: DragEvent) => void;
  clearImage: () => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
  formData: NFTFormData;
  collections: Collection[];
  auctionDurations: AuctionDuration[];
}
