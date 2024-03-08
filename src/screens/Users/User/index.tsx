import { useParams } from "react-router-dom"
import ScreenBox from "../../../components/ScreenBox"

export default function UserScreen() {
    const params = useParams<{ userId: string }>()

    return (
        <ScreenBox>
            <h1>User { params.userId }</h1>
        </ScreenBox>
    )
}