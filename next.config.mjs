/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  async redirects() {
    return [{ source: "/resume", destination: "/Resume.pdf", permanent: true }];
  },
};

export default nextConfig;
