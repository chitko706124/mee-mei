import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "@/lib/providers";
import { Quicksand, Playfair_Display } from "next/font/google";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Mee Mei - Premium Game Accounts",
  description:
    "Buy premium Mobile Legend accounts with instant delivery and secure transactions.",
  manifest: "/manifest.json", // Add manifest for PWA support
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Mee Mei",
  },
  applicationName: "Mee Mei",
  formatDetection: {
    telephone: false,
  },
};

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${quicksand.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Additional meta tags for iOS */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Mee Mei" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="font-sans antialiased text-foreground min-h-screen selection:bg-primary selection:text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
