/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		dangerouslyAllowSVG: true,
		contentDispositionType: 'attachment',
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'tailwindui.com',
			},
			{
				protocol: 'https',
				hostname: 'flowbite.s3.amazonaws.com',
			},
			{
				protocol: 'https',
				hostname: 'dummyimage.com',
			},
			{
				protocol: 'https',
				hostname: 'i.imgur.com',
			},
		],
	},
};

export default nextConfig;
