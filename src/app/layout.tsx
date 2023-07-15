// app/layout.tsx
import { Providers } from "./providers";
import "./global.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Guide",
  description:
    "Travel Guide is your Personalized Trip Planner in Domestic and International",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
