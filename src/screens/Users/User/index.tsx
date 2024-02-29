import { useParams } from "react-router-dom"

export default function UserScreen() {
    const params = useParams<{ userId: string }>()

    return (
        <div>
            <h1>User { params.userId }</h1>
        </div>
    )
}