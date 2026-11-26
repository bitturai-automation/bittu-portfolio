/** @type {import('next').NextConfig} */
const longCache = [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }];
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Vercel serves /public files with "max-age=0, must-revalidate" by default, so images/videos were re-checked on every visit.
  async headers() {
    return [
      { source: "/img/:path*", headers: longCache },
      { source: "/video/:path*", headers: longCache },
      { source: "/resume/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=86400" }] },
    ];
  },
};
export default nextConfig;
