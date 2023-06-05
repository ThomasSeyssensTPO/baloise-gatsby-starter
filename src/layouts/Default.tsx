import {
    balIconArrowsRoundLeft,
    balIconCheckCircle,
    balIconAlertTriangle,
    balIconContact,
    balIconCaretRight,
    balIconCaretLeft,
    balIconCall,
    balIconBack,
    balIconRefresh,
} from "@baloise/design-system-icons";
import {
    useBaloiseDesignSystem,
} from "@baloise/design-system-components-react";
import React from "react";

type DefaultLayoutProps = {
    children: any;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({
    children
}) => {
    useBaloiseDesignSystem({
        defaults: {
            icons: {
                balIconArrowsRoundLeft,
                balIconCheckCircle,
                balIconAlertTriangle,
                balIconContact,
                balIconCaretRight,
                balIconCaretLeft,
                balIconCall,
                balIconBack,
                balIconRefresh,
            },
            region: "BE",
            language: "nl",
        },
    });

    return (
        <>{children}</>
    )
}

export default DefaultLayout;