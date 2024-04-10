import type { Metadata } from "next";
import { Providers } from "./providers";

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "PiWallet",
	description: "The next gen credentials management app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>
					<Navbar />
					<div className="flex justify-center item-center h-screen">
						{children}
					</div>
				</Providers>
			</body>
		</html>
	);
}
