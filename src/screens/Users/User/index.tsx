import { useParams } from "react-router-dom"

import NotFoundScreen from "../../Error/NotFound"
import ScreenBox from "../../../components/ScreenBox"

import { Base64 } from "../../../functions/Formatting/Base64"
import IsNil from "../../../functions/IsNil"

export default function UserScreen() {
    const userId = Number.parseInt(
        Base64.ToString(
            useParams<{ userIdHash: string }>().userIdHash
        )
    )

    if (IsNil(userId) || Number.isNaN(userId))
        return <NotFoundScreen msg="Usuário não encontrado!" />

    return (
        <ScreenBox>
            <h1>User { userId }</h1>
        </ScreenBox>
    )
}