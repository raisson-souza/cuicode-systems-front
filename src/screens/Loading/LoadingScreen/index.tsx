import { CircularProgress } from "@mui/material"
import ScreenBox from "../../../components/base/ScreenBox"

export default function LoadingScreen() {
    return (
        <ScreenBox>
            <CircularProgress />
        </ScreenBox>
    )
}