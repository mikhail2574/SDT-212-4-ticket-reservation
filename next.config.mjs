// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 's1.ticketm.net' },
      { protocol: 'https', hostname: 'ticketm.net' },
      { protocol: 'https', hostname: '**.ticketm.net' },
    ],
  },
};

export default nextConfig;
