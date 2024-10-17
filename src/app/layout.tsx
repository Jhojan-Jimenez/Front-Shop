import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import NavBar from './ui/navigation/NavBar';
import Footer from './ui/navigation/Footer';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { LoadingProvider } from './context/LoadingContext';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

export const metadata: Metadata = {
	title: 'TailShop',
	description: 'E-commerce with NextJS and Django',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<div className='min-h-screen flex flex-col justify-between'>
					<LoadingProvider>
						<AuthProvider>
							<header className='sticky top-0'>
								<NavBar />
							</header>
							<Toaster />
							<main className='min-h-screen'>{children}</main>
							<Footer />
						</AuthProvider>
					</LoadingProvider>
				</div>
			</body>
		</html>
	);
}
