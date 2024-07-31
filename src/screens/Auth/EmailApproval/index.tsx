import { useEffect } from "react"

import ScreenBox from "../../../components/ScreenBox"

export default function EmailApprovalScreen() {
    useEffect(() => { document.title = "CuiCode Systems - Aprovação de Email" }, [])

    return (
        <ScreenBox
            hasHeaderUserInterationBox={ false }
        >
            <h1>EmailApprovalScreen</h1>
        </ScreenBox>
    )
}