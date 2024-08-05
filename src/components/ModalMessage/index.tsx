import { Modal } from "@mui/material"

import { GetSystemStyle } from "../base/InitialFetch"

type ModalMessageProps = {
    children : JSX.Element
    open : boolean
    setOpen : React.Dispatch<React.SetStateAction<boolean>>
    canBackdropExit? : boolean
}

export default function ModalMessage({
    children,
    open,
    setOpen,
    canBackdropExit = true
} : ModalMessageProps) {
    const systemStyle = GetSystemStyle()

    return (
        <Modal
            open={ open }
            aria-labelledby="modal-message-title"
            aria-describedby="modal-message-description"
            onClose={ (_, reason) => {
                if (reason === "backdropClick" && !canBackdropExit) return
                setOpen(false)
            }}
        >
            <main style={{
                position: "absolute",
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                backgroundColor: systemStyle.TerciaryColor,
                color: systemStyle.TextColor,
                border: `2px solid ${ systemStyle.HeaderColor }`,
                boxShadow: systemStyle.DefineBasicShadow(),
                padding: 10
            }}>
                { children }
            </main>
        </Modal>
    )
}