import * as React from "react";
import { useBaloiseDesignSystem } from "@baloise/design-system-components-react";
import {
    balIconContact,
    balIconCaretRight,
} from "@baloise/design-system-icons";

type DefaultLayoutProps = {
    title: string;
};

// markup
const DefaultLayout: React.FC<DefaultLayoutProps> = ({ title, children }) => {
    useBaloiseDesignSystem({
        defaults: {
            icons: {
                balIconContact,
                balIconCaretRight,
            },
        },
    });

    return (
        <div>
            <main>
                <title>{title}</title>
                {children}
            </main>
        </div>
    );
};

export default DefaultLayout;
