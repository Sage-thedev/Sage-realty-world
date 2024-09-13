import { Inter } from "next/font/google";
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "@components/header/Header"; // Import client component
import Footer from "@components/Footer";
import Sidebar from "@components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Real Estate | We are the future of good homes",
  description: "Explore our collection of premium real estate properties and services.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>
          {/* <NProgress color="#2196F3" />y */}
          <Header />
          <Sidebar/>
          {children}
          <Footer />
        </ChakraProvider>
      </body>
    </html>
  );
}
