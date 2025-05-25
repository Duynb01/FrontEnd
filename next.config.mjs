/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/login",
        destination: "/auth/login",
      },
      {
        source: "/register",
        destination: "/auth/register",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "theme.hstatic.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "product.hstatic.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
