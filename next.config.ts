import type {NextConfig} from 'next';
import {PHASE_DEVELOPMENT_SERVER} from 'next/constants';
import fs from 'fs';
import path from 'path';

const configFunction = (phase: string): NextConfig => {
  // If starting dev server but a production build artifacts exist, clean .next
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    const buildIdPath = path.join(process.cwd(), '.next', 'BUILD_ID');
    if (fs.existsSync(buildIdPath)) {
      try {
        fs.rmSync(path.join(process.cwd(), '.next'), {recursive: true, force: true});
      } catch {
        // ignore
      }
    }
  }

  const nextConfig: NextConfig = {
    reactStrictMode: true,
    devIndicators: false,
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: false,
    },
    // Allow access to remote image placeholder.
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'picsum.photos',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
          port: '',
          pathname: '/**',
        },
      ],
    },
    output: 'standalone',
    transpilePackages: ['motion'],
    webpack: (config, {dev}) => {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      if (dev && process.env.DISABLE_HMR === 'true') {
        config.watchOptions = {
          ignored: /.*/,
        };
      }
      return config;
    },
  };

  return nextConfig;
};

export default configFunction;

