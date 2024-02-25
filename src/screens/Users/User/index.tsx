import { useParams } from "react-router-dom"

export default function UserScreen() {
    const params = useParams<{ userId: string }>()

    return (
        <div>User { params.userId }</div>
    )
}