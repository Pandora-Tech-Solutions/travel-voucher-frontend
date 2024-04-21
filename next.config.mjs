/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'static.tursites.com.br',
      'laiketurismo.com.br',
    ],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
