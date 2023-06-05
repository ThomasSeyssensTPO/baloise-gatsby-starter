require("@babel/register");
const { developMiddleware } = require("./lib/gatsby-config/proxy");

module.exports = {
    pathPrefix: process.env.GATSBY_PATH_PREFIX_FORD,
    siteMetadata: {
        // TODO: Change site URL
        siteUrl: `https://example.com`,
        title: "Ford Insurance",
    },
    flags: {
        DEV_SSR: true,
    },
    plugins: [
        "gatsby-plugin-image",
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        // {
        //     resolve: "gatsby-source-filesystem",
        //     options: {
        //         name: "images",
        //         path: "./src/images/",
        //     },

        //     __key: "images",
        // },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                path: `./locales`,
                name: "locale",
            },
        },
        // Sass support
        {
            resolve: "gatsby-plugin-sass",
            options: {
                additionalData: `$font-path: /fonts;`,
            },
        },
        // Eslinting
        "gatsby-plugin-eslint",

        // Style linting
        {
            resolve: "@danbruegge/gatsby-plugin-stylelint",
            options: { files: ["src/**/*.{css,scss}"] },
        },
        {
            resolve: `gatsby-plugin-typescript`,
            options: {
                isTSX: true,
                jsxPragma: `jsx`,
                allExtensions: true,
            },
        },
        {
            resolve: `gatsby-plugin-alias-imports`,
            options: {
                alias: {
                    "@assets": "src/assets",
                    "@components": "src/components",
                    "@containers": "src/containers",
                    // "@hooks": "src/hooks", // Doesn't work, don't know why
                    // "@images": "src/images", // Not used for now, maybe in the future
                    "@interfaces": "src/interfaces",
                    // "@pages": "src/pages", // Not used for now, maybe in the future
                    "@states": "src/states",
                    // "@styles": "src/styles", // Doesn't work, don't know why
                    // "@templates": "src/templates", // Not used for now, maybe in the future
                    "@utils": "src/utils",
                },
                extensions: ["js", "tsx", "sass", "css", "png", "scss"],
            },
        },
        {
            resolve: "gatsby-plugin-axe-core-react",
        },
    ],
    developMiddleware,
};
