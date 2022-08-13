/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  experimental: {
    // runtime: "nodejs",
    // serverComponents: true,
  },
  images: {
    domains: ["imagedelivery.net", "videodelivery.net"],
  },
};
