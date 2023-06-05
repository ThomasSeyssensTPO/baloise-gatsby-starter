import * as React from "react"
import DefaultLayout from "../layouts/Default"
import { BalButton } from "@baloise/design-system-components-react"


const IndexPage = () => {
  return (
    <DefaultLayout>
      <BalButton>This is a test button</BalButton>
    </DefaultLayout>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
