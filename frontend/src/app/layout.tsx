import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import ThemeRegistry from "@/src/theme/ThemeRegistry";


import "./globals.css";
import { AuthProvider } from "@/src/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Artistry Online",
  description: "Premium modern art marketplace",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
    
     <body className="min-h-full flex flex-col">
  <AuthProvider>
    <ThemeRegistry>{children}</ThemeRegistry>
  </AuthProvider>
</body>

    </html>
  );
}
