/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    
    eslint: {
        ignoreDuringBuilds: true, // Disables ESLint during the build process
      },
    typescript: {
        ignoreBuildErrors: true, // Disables TypeScript type checking during build
        },
        // other configurations
};

export default config;
