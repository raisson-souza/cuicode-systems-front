import { Link } from "react-router-dom"

import ScreenBox from "../../../components/base/ScreenBox"

import IsNil from "../../../functions/IsNil"

type NotFoundScreeenProps = {
    msg? : string
}

export default function NotFoundScreen({
    msg
} : NotFoundScreeenProps) {
    return (
        <ScreenBox>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px'
            }}>
                {
                    IsNil(msg)
                        ? <>
                            <h1>Página não encontrada!</h1>
                            <h3><Link to={'/home'}>Volte ao começo.</Link></h3>
                        </>
                        : <h2>{ msg }</h2>
                }
            </div>
        </ScreenBox>
    )
}