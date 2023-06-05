import React from "react";
import { BalApp } from "@baloise/design-system-components-react";

export const wrapRootElement = ({ element }) => {
    return (
        <BalApp>{element}</BalApp>
    )
}