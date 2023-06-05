import BP from "bluebird";
const ownPageObjects = require("../../src/utils/sources/pages/index.json");

export const onCreatePage = async ({ page, actions }, pluginOptions) => {
    const searchParam = page.path;

    const { createPage, deletePage } = actions;

    let foundPage = ownPageObjects.find(
        (p) =>
            p.startUrl === searchParam.replace(`/${page.context.language}`, ""),
    );

    console.log(
        "🚀 ~ file: OnCreatePage.js:14 ~ onCreatePage ~ foundPage:",
        foundPage,
    );

    if (!foundPage) {
        ownPageObjects.find((p) => {
            if (p.tabs) {
                let foundAPage = p.tabs.find(
                    (t) =>
                        t.startUrl ===
                        searchParam.replace(`/${page.context.language}`, ""),
                );

                if (foundAPage) {
                    foundPage = foundAPage;
                }
            }
        });
    }

    if (foundPage || page.path === "/") {
        if (typeof page.context?.i18n === "object") {
            return;
        }
        // const { createPage, deletePage } = actions;

        const {
            defaultLanguage = "nl-BE",
            generateDefaultLanguagePage = true,
            languages = ["nl-BE", "fr-BE"],
            pages = [],
        } = pluginOptions;

        const generatePage = async ({
            language,
            path = page.path,
            originalPath = page.path,
            routed = false,
            matchPath = page.matchPath,
            // pageOptions,
        }) => {
            return {
                ...page,
                matchPath,
                path,
                context: {
                    ...page.context,
                    foundPage,
                    ownPageObjects,
                    language,
                    name: foundPage.name,
                    i18n: {
                        language,
                        languages: ["nl-BE", "fr-BE"],
                        defaultLanguage,
                        generateDefaultLanguagePage,
                        routed,
                        originalPath,
                        path,
                    },
                },
            };
        };

        const pageOptions = pages.find((opt) => opt.matchPath(page.path));

        let alternativeLanguages = generateDefaultLanguagePage
            ? languages
            : languages.filter((lng) => lng !== defaultLanguage);

        if (pageOptions?.excludeLanguages) {
            alternativeLanguages = alternativeLanguages.filter(
                (lng) => !pageOptions?.excludeLanguages?.includes(lng),
            );
        }

        if (pageOptions?.languages) {
            alternativeLanguages = generateDefaultLanguagePage
                ? pageOptions.languages
                : pageOptions.languages.filter(
                      (lng) => lng !== defaultLanguage,
                  );
        }

        if (pageOptions?.getLanguageFromPath) {
            const result = pageOptions.matchPath(page.path);
            if (!result) return;
            const language =
                languages.find((lng) => lng === result.params.lang) ||
                defaultLanguage;
            const originalPath = page.path.replace(`/${language}`, "");
            const routed = Boolean(result.params.lang);
            await generatePage({
                language,
                originalPath,
                routed,
                pageOptions,
            });
            if (routed || !pageOptions.excludeLanguages) {
                alternativeLanguages = [];
            }
        } else {
            await generatePage({
                language: defaultLanguage,
                pageOptions,
            });
        }

        try {
            deletePage(page);
        } catch (error) {
            console.log(error);
        }
        // createPage(newPage);
        await BP.map(alternativeLanguages, async (lng) => {
            const translatedUrl = foundPage.paths[lng];

            const translatedUrlIsFound =
                translatedUrl !== undefined && translatedUrl !== null;

            let matchPath = page.matchPath
                ? translatedUrlIsFound
                    ? `${translatedUrl.replace(`/${lng}`, "")}`
                    : `${page.matchPath}`
                : undefined;

            const regexp = new RegExp("/404/?$");
            if (regexp.test(page.path)) {
                matchPath = `/${lng}/*`;
            }
            if (page.matchPath !== undefined) {
                matchPath = `/${lng}${page.matchPath}`;
            }

            const localePage = await generatePage({
                language: lng,
                path: translatedUrl
                    ? `${lng}${translatedUrl.replace(`/${lng}`, "")}`
                    : `${lng}${page.path}`,
                matchPath: matchPath,
                routed: true,
            });
            createPage(localePage);
        });
    } else {
        deletePage(page);
    }
};
