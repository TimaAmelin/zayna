/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['web'], // Add the "web" domain to the allowed list
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: [
                {
                    loader: '@svgr/webpack',
                },
            ],
        });

        return config;
    },
};

export default nextConfig;
