"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface UploadContextValue {
  imageFile: File | null;
  setImageFile: (file: File | null) => void;
  imageUrl: string | null;
  setImageUrl: (url: string | null) => void;
}

const UploadContext = createContext<UploadContextValue | null>(null);

export function UploadProvider({ children }: { children: React.ReactNode }) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const setFile = useCallback((file: File | null) => {
    setImageFile(file);
    if (!file) {
      setImageUrl(null);
    }
  }, []);

  const setUrl = useCallback((url: string | null) => {
    setImageUrl(url);
  }, []);

  return (
    <UploadContext.Provider
      value={{
        imageFile,
        setImageFile: setFile,
        imageUrl,
        setImageUrl: setUrl,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
}

export function useUploadContext() {
  const ctx = useContext(UploadContext);
  if (!ctx) {
    throw new Error("useUploadContext must be used within UploadProvider");
  }
  return ctx;
}
