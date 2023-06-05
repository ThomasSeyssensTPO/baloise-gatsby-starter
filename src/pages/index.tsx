import * as React from "react";
import {
    BalStage,
    BalStageBody,
    BalHeading,
    BalCard,
    BalCardContent,
    BalStack,
    BalContent,
    BalText,
    BalButton,
    BalTag,
    BalButtonGroup,
} from "@baloise/design-system-components-react";
import DefaultLayout from "../layouts/Default";
import { useTranslation } from "react-i18next";
import { graphql } from "gatsby";

// markup
const IndexPage = () => {
    const { t } = useTranslation();

    return (
        <DefaultLayout title="Ford Insurance">
            <div className="container">
                <BalStage color="red" shape size="small">
                    <BalStageBody>
                        <BalHeading className="mb-x-small" space="none">
                            Temporary landing page for Ford Insurance
                        </BalHeading>
                    </BalStageBody>
                </BalStage>
            </div>
            <div className="container mt-xxx-large">
                <div className="columns">
                    <div className="column is-one-third">
                        <BalCard color="purple-light" fullheight>
                            <BalCardContent>
                                <BalStack
                                    direction="column"
                                    alignment="center"
                                    space="large"
                                >
                                    <BalContent alignment="center">
                                        <BalHeading level="x-large">
                                            Simulator
                                        </BalHeading>
                                        <BalTag color="yellow" light>
                                            In progress
                                        </BalTag>
                                        <BalText>
                                            Lead creator application, so a Ford
                                            customer can make a lead for Amazon.
                                        </BalText>
                                    </BalContent>
                                    <BalButtonGroup>
                                        <BalButton
                                            href={`${process.env.GATSBY_PATH_PREFIX_FORD}/nl-BE/simulator/voor-we-starten`}
                                        >
                                            NL
                                        </BalButton>
                                        <BalButton
                                            href={`${process.env.GATSBY_PATH_PREFIX_FORD}/fr-BE/simulateur/avant-commencez/`}
                                            color="info"
                                        >
                                            FR
                                        </BalButton>
                                    </BalButtonGroup>
                                </BalStack>
                            </BalCardContent>
                        </BalCard>
                    </div>
                    <div className="column is-one-third">
                        <BalCard color="yellow-light" fullheight>
                            <BalCardContent>
                                <BalStack
                                    direction="column"
                                    alignment="center"
                                    space="large"
                                >
                                    <BalContent alignment="center">
                                        <BalHeading level="x-large">
                                            Dealer application
                                        </BalHeading>
                                        <BalTag color="yellow" light>
                                            In progress
                                        </BalTag>
                                        <BalText>
                                            Lead creator application, so a Ford
                                            salesman can make a lead for Amazon.
                                        </BalText>
                                    </BalContent>
                                    <BalButtonGroup>
                                        <BalButton
                                            href={`${process.env.GATSBY_PATH_PREFIX_FORD}/nl-BE/handelaar/voor-we-starten`}
                                        >
                                            NL
                                        </BalButton>
                                        <BalButton
                                            href={`${process.env.GATSBY_PATH_PREFIX_FORD}/fr-BE/marchand/avant-commencez/`}
                                            color="info"
                                        >
                                            FR
                                        </BalButton>
                                    </BalButtonGroup>
                                </BalStack>
                            </BalCardContent>
                        </BalCard>
                    </div>
                </div>
            </div>
            <div className="container my-xx-large">
                <BalHeading className="mb-x-small" space="none">
                    Testing translation fetched on build:
                </BalHeading>
                <table className="table is-fullwidth is-striped is-hoverable p-none">
                    <thead>
                        <th>Key</th>
                        <th>Translation</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>app.title</td>
                            <td>{t("app.title")}</td>
                        </tr>
                        <tr>
                            <td>app.subtitle</td>
                            <td>{t("app.subtitle")}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </DefaultLayout>
    );
};

export default IndexPage;

export const pageQuery = graphql`
    query ($language: String!) {
        locales: allLocale(filter: { language: { eq: $language } }) {
            edges {
                node {
                    ns
                    data
                    language
                }
            }
        }
    }
`;
