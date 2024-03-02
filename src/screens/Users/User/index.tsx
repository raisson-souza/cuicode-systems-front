import { useParams } from "react-router-dom"
import ScreenBox from "../../../components/ScreenBox"
import { GetSystemStyle } from "../../../components/InitialFetch"

export default function UserScreen() {
    const params = useParams<{ userId: string }>()
    const systemStyle = GetSystemStyle()

    return (
        <ScreenBox systemStyle={ systemStyle }>
            <h1>User { params.userId }</h1>
        </ScreenBox>
    )
}