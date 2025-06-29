import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Tweeter",
	description: "Twitter/X clone built with Nextjs",
	openGraph: {
		title: "Tweeter",
		description: "Twitter clone built with nextjs",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
