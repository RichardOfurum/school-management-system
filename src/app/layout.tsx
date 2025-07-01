import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/components/landingpages/v1.0/Header";


// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ridges International School",
  description: "A place where education meets innovation, and students are prepared not just for exams, but for life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
        <html lang="en">
          <body>
                {/* <Header/> */}
                {children}
                <ToastContainer position="bottom-right" theme="dark"/>
            </body>
        </html>
    </ClerkProvider>
  );
}
