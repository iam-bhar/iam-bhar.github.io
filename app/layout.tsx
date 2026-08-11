import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/app/data/resume";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Bhargav Lal Krishna",
  description: profile?.title,
  icons: [
    { rel: "icon", url: `${basePath}/favicon/favicon-96x96.png`, type: "image/png", sizes: "96x96" },
    { rel: "icon", url: `${basePath}/favicon/favicon.svg`, type: "image/svg+xml" },
    { rel: "shortcut icon", url: `${basePath}/favicon/favicon.ico` },
    { rel: "apple-touch-icon", url: `${basePath}/favicon/apple-touch-icon.png`, sizes: "180x180" },
    { rel: "manifest", url: `${basePath}/favicon/site.webmanifest` },
  ],
  appleWebApp: {
    title: "Bhargav lal Krishna",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-space text-ink">{children}</body>
    </html>
  );
}
