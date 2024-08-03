import { CircularProgress } from "@mui/material"
import ScreenBox from "../../../components/ScreenBox"

export default function LoadingScreen() {
    return (
        <ScreenBox>
            <CircularProgress />
        </ScreenBox>
    )
}