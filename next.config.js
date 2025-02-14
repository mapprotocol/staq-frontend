/** @type {import('next').NextConfig} */
const nextConfig = {

  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  transpilePackages: [
    'rc-util',
    'rc-table',
    '@ant-design',
    'kitchen-flow-editor',
    '@ant-design/pro-editor',
    'zustand', 'leva', 'antd',
    'rc-pagination',
    'rc-picker'
  ],
 
};

module.exports = nextConfig;
