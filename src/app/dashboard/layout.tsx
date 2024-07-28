import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Sidebar from "@/app/components/Sidebar/Sidebar";
import Navbar from "@/app/components/Navbar/Navbar";
import { AppProvider } from "../context/AppContext";
import SessionWrapper from "./Wrappers/SessionWrapper";
import ProtectedRoute from "./Wrappers/ProtectedRoute";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Byte Basha Dashboard",
  description: "Manage all your website content from one place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionWrapper>
        <AppProvider>
          <body className={inter.className}>
            <ProtectedRoute>
              <section className="flex min-h-screen">
                <Sidebar />
                <main className="flex flex-col w-full">
                  <Navbar />
                  {children}
                </main>
              </section>
            </ProtectedRoute>
          </body>
        </AppProvider>
      </SessionWrapper>
    </html>
  );
}
