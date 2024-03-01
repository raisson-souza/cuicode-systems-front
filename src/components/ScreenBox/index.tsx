import { Header } from "../StyledComponents"
import "./styles.css"

type ScreenBoxProps = {
    children : JSX.Element
    backgroundColor : string
}

export default function ScreenBox({
    children,
    backgroundColor
    } : ScreenBoxProps) 
    {
        return (
            <div
                className="screen-box"
                style={{
                    backgroundColor: backgroundColor
                }}
            >
                <Header backgroundColor="royalblue" textColor="black" hasShadow>CuiCode Systems SGPISG</Header>
                { children }
            </div>
    )
}