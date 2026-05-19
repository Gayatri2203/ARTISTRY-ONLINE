"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface UploadContextValue {
  imageFile: File | null;
  setImageFile: (file: File | null) => void;
}

const UploadContext = createContext<UploadContextValue | null>(null);

export function UploadProvider({ children }: { children: React.ReactNode }) {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const setFile = useCallback((file: File | null) => {
    setImageFile(file);
  }, []);

  return (
    <UploadContext.Provider value={{ imageFile, setImageFile: setFile }}>
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
