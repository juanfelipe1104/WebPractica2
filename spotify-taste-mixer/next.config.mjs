/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["i.scdn.co", "mosaic.scdn.co", "seed-mix-image.spotifycdn.com", "image-cdn-fa.spotifycdn.com"] // Spotify Images
	},
};

export default nextConfig;
