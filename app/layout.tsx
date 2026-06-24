import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VizeDraw — A workspace for technical drawings",
  description:
    "VizeDraw is a workspace for technical drawings by Zenitude. Organize drawing sets, mark up sheets, track revisions, run takeoffs, and collaborate — built for drawings, not generic PDFs.",
  metadataBase: new URL("https://www.vizedraw.com"),
  openGraph: {
    title: "VizeDraw — A workspace for technical drawings",
    description:
      "Organize drawing sets, mark up sheets, track revisions, run takeoffs, and collaborate — built for drawings, not generic PDFs.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={mono.variable}>
      <body className="bg-ink font-sans text-vellum antialiased selection:bg-blueprint/30 selection:text-vellum">
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
