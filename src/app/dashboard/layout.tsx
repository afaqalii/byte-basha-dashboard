import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { AppProvider } from "../context/AppContext";
import SessionWrapper from "./Wrappers/SessionWrapper";
import ProtectedRoute from "./Wrappers/ProtectedRoute";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";
import { Provider } from "react-redux";
import store from "@/redux/store";


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
      <Provider store={store}>
        <SessionWrapper>
          <AppProvider>
            <body className={inter.className}>
              <ProtectedRoute>
                <section className="flex min-h-screen">
                  <Sidebar />
                  <main className="flex flex-col w-full">
                    <Navbar />
                    <div className="container p-5">
                      {children}
                    </div>
                  </main>
                </section>
              </ProtectedRoute>
            </body>
          </AppProvider>
        </SessionWrapper>
      </Provider> 
    </html>
  );
}
