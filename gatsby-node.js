require("@babel/register");
import { onCreateNode } from "./lib/gatsby-node/OnCreateNode";
import { onCreatePage } from "./lib/gatsby-node/OnCreatePage";

const crypto = require("crypto-js");
const axios = require("axios");
const path = require("path");
const fse = require("fs-extra");

exports.onCreateNode = onCreateNode;
exports.onCreatePage = onCreatePage;

module.exports.onPostBuild = async () => {
    fse.copySync(
        path.join(__dirname, "public"),
        `../../output${process.env.GATSBY_PATH_PREFIX_FORD}`,
        { overwrite: true },
    );
};

exports.sourceNodes = async ({ actions }) => {
    const { createNode } = actions;

    const fetchBusinessRules = () =>
        axios.get(
            `https://dev-contact.baloise.be/api/mob/businessrules?flavor=ford`,
            {
                headers: {
                    Cookie: "AutomatedTest=qtUEcWcETYhw8CeY",
                },
            },
        );
    const res = await fetchBusinessRules();

    const businessRulesNode = {
        id: `businessrules`,
        parent: `__SOURCE__`,
        internal: {
            type: `BusinessRules`,
        },
        children: [],
        rules: res.data,
    };

    const contentDigest = crypto
        .MD5(JSON.stringify(businessRulesNode))
        .toString(crypto.enc.Hex);
    businessRulesNode.internal.contentDigest = contentDigest;

    createNode(businessRulesNode);

    return;
};
