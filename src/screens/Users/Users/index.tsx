import { useEffect } from "react"

import ScreenBox from "../../../components/ScreenBox"

export default function UsersScreen() {
    useEffect(() => { document.title = "CuiCode Systems - Usuários" }, [])

    return (
        <ScreenBox>
            <div>Users</div>
        </ScreenBox>
    )
}