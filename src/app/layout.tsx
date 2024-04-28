import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// core styles are required for all packages
import '@mantine/core/styles.css';
import { ColorSchemeScript } from "@mantine/core";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bloom",
  description: "Bloom Alternance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head className={inter.className}>
        <meta name="description" content={metadata.description?.toString()} />
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />

        <ColorSchemeScript />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
