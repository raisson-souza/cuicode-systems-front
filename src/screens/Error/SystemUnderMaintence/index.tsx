import { GetSystemStyle } from "../../../components/InitialFetch";
import ScreenBox from "../../../components/ScreenBox";

export default function SystemUnderMaintenceScreen() {
    const systemStyle = GetSystemStyle()

    return (
        <ScreenBox systemStyle={ systemStyle }>
            <h1>Sistema em Manutenção</h1>
        </ScreenBox>
    )
}