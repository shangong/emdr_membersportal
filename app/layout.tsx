import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EMDR Singapore Membership Portal",
  description: "Secure membership, training and certification operations for EMDR Singapore.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-SG">
      <body className="antialiased">{children}</body>
    </html>
  );
}
