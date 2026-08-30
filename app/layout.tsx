import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/app/data/resume";

const sans = Plus_Jakarta_Sans({
  variable: "--font-app-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const mono = JetBrains_Mono({
  variable: "--font-app-mono",
  subsets: ["latin"],
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "BhargavLal KrishnaReddy Pulluru | Senior Frontend Developer",
  description: profile?.title,
  icons: [
    { rel: "icon", url: `${basePath}/favicon/favicon-96x96.png`, type: "image/png", sizes: "96x96" },
    { rel: "icon", url: `${basePath}/favicon/favicon.svg`, type: "image/svg+xml" },
    { rel: "shortcut icon", url: `${basePath}/favicon/favicon.ico` },
    { rel: "apple-touch-icon", url: `${basePath}/favicon/apple-touch-icon.png`, sizes: "180x180" },
    { rel: "manifest", url: `${basePath}/favicon/site.webmanifest` },
  ],
  appleWebApp: {
    title: "BhargavLal KrishnaReddy Pulluru | Senior Frontend Developer",
  },
};

const themeInitScript = `
(function () {
  try {
    var stored = window.localStorage.getItem("theme");
    var theme = stored === "light" || stored === "dark" ? stored : "light";
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "light");
  }
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Sets data-theme before hydration to avoid a flash of the wrong theme (light is the default). */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-space text-ink">{children}</body>
    </html>
  );
}
