// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import('snowpack').SnowpackUserConfig } */
module.exports = {
    optimize: {
        bundle: true,
        minify: true,
        target: 'es2018',
    },
    mount: {
        public: {
            url: '/',
            static: true
        },
        src: {
            url: '/dist'
        },
    },
    plugins: [
        '@snowpack/plugin-optimize',
        "@snowpack/plugin-sass",
        "@snowpack/plugin-postcss",
    ],
    packageOptions: {
        /* ... */
    },
    devOptions: {
        port: 3000,
        open: 'none',
        hmr: true
    },
    buildOptions: {
        clean: true,
        out: 'build',
        sourcemap: true
    }
}
