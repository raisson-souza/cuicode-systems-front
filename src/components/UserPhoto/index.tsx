import { Avatar } from "@mui/material"

import IsNil from "../../functions/IsNil"

type UserPhotoProps = {
    userName? : string
    userPhoto? : string | null
}

export default function UserPhoto({
    userName = "",
    userPhoto,
} : UserPhotoProps) {
    if (IsNil(userPhoto)) {
        return (
            <Avatar
                alt={ userName }
                {...stringAvatar(userName) }
            >
                { userName[0] }
            </Avatar>
        )
    }

    return (
        <Avatar
            alt={ userName }
            src={ `data:image/png;base64, ${ userPhoto! }` }
        />
    )
}

function stringToColor(str : string) {
    let hash = 0
    let i

    for (i = 0; i < str.length; i += 1) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = '#'

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff
        color += `00${value.toString(16)}`.slice(-2)
    }

    return color
}

function stringAvatar(name: string) {
    return {
        "sx": { bgcolor: stringToColor(name) },
    }
}
