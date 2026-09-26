/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  async rewrites() {
    return [{ source: "/resume", destination: "/Resume.pdf" }];
  },
};

export default nextConfig;
