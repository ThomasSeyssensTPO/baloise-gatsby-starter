import "./src/styles/index.scss";

import React from "react";
import { RecoilRoot } from "recoil";
import { TrackingLoader } from "@lg-cfa/components";
import { withPrefix } from "gatsby";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import browserLang from "browser-lang";

// Resets CSS for all browser
import "./src/styles/index.scss";

import { BalApp } from "@baloise/design-system-components-react";

const I18nextContext = React.createContext({
    language: "nl-BE",
    languages: ["nl-BE", "fr-BE"],
    routed: false,
    defaultLanguage: "nl-BE",
    generateDefaultLanguagePage: true,
    originalPath: "/",
    path: "/",
});

const withI18next = (i18n, context) =>
    function test(children) {
        return (
            <I18nextProvider i18n={i18n}>
                <I18nextContext.Provider value={context}>
                    {children}
                </I18nextContext.Provider>
            </I18nextProvider>
        );
    };

const removePathPrefix = (pathname, stripTrailingSlash) => {
    const pathPrefix = withPrefix("/");
    let result = pathname;

    if (pathname.startsWith(pathPrefix)) {
        result = pathname.replace(pathPrefix, "/");
    }

    if (stripTrailingSlash && result.endsWith("/")) {
        return result.slice(0, -1);
    }

    return result;
};

export const wrapPageElement = (
    { element, props },
    {
        i18nextOptions = {},
        redirect = true,
        generateDefaultLanguagePage = false,
        siteUrl,
        localeJsonNodeName = "locales",
        fallbackLanguage,
        trailingSlash,
    },
) => {
    if (!props) return;
    const { data, pageContext, location } = props;

    if (Object.keys(pageContext).length === 0) return;

    const { routed, language, languages, originalPath, defaultLanguage, path } =
        pageContext.i18n;
    const isRedirect = redirect && !routed;

    if (isRedirect) {
        const { search } = location;

        if (typeof window !== "undefined") {
            let detected =
                global.window.localStorage.getItem("language-key") ||
                browserLang({
                    languages,
                    fallback: fallbackLanguage || language,
                });

            if (!languages.includes(detected)) {
                detected = language;
            }

            global.window.localStorage.setItem("language-key", detected);

            if (detected !== defaultLanguage) {
                const queryParams = search || "";
                const stripTrailingSlash = trailingSlash === "never";
                const newUrl = withPrefix(
                    `/${detected}${removePathPrefix(
                        location.pathname,
                        stripTrailingSlash,
                    )}${queryParams}${location.hash}`,
                );
                // @ts-ignore
                global.window.___replace(newUrl);
                return null;
            }
        }
    } else {
        global.window.localStorage.setItem("language-key", language);
    }

    const localeNodes = data?.[localeJsonNodeName]?.edges || [];

    if (
        languages.length > 1 &&
        localeNodes.length === 0 &&
        process.env.NODE_ENV === "development"
    ) {
        console.log("error");
    }

    const namespaces = localeNodes.map(({ node }) => node.ns);

    // We want to set default namespace to a page namespace if it exists
    // and use other namespaces as fallback
    // this way you dont need to specify namespaces in pages
    let defaultNS = i18nextOptions.defaultNS || "translation";
    defaultNS = namespaces.find((ns) => ns !== defaultNS) || defaultNS;
    const fallbackNS = namespaces.filter((ns) => ns !== defaultNS);

    const resources = localeNodes.reduce((res, { node }) => {
        const parsedData =
            typeof node.data === "object" ? node.data : JSON.parse(node.data);

        if (!(node.language in res)) res[node.language] = {};

        res[node.language][node.ns || defaultNS] = parsedData;

        return res;
    }, {});

    const i18n = i18next.createInstance();

    i18n.init({
        ...i18nextOptions,
        resources,
        lng: language,
        fallbackLng: defaultLanguage,
        defaultNS,
        fallbackNS,
        react: {
            ...i18nextOptions.react,
            useSuspense: false,
        },
    });

    if (i18n.language !== language) {
        i18n.changeLanguage(language);
    }

    i18n.languages = ["nl-BE", "fr-BE"];

    const context = {
        routed,
        language,
        languages,
        originalPath,
        defaultLanguage,
        generateDefaultLanguagePage,
        siteUrl,
        path,
    };

    return withI18next(i18n, context)(element);
};

export const wrapRootElement = ({ element }) => {
    return (
        <RecoilRoot>
            <TrackingLoader />
            <BalApp>{element}</BalApp>
        </RecoilRoot>
    );
};
