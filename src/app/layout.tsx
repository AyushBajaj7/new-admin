import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/layout/SidebarContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NEO Admin Dashboard",
  description: "NEO Entertainment admin panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ margin: 0, padding: 0, background: "#f5f5f7" }}>
        <SidebarProvider>
          <div style={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden" }}>
            <Sidebar />
            <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, overflow: "hidden" }}>
              <Header />
              <main style={{ flex: 1, overflowY: "auto", background: "#f5f5f7", padding: "24px" }}>
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
