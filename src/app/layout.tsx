import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";

export const metadata: Metadata = {
  title: "Tweeter",
  description: "Twitter clone built with nextjs",
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Tweeter",
    description: "Twitter clone built with nextjs",
  },
};

const font = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} dark`}>{children}</body>
    </html>
  );
}
