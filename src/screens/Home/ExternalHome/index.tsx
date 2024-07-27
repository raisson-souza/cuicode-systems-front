import FooterContacts from "../../../components/FooterContacts"
import ScreenBox from "../../../components/ScreenBox"

import "./styles.css"

export default function ExternalHomeScreen() {
    return (
        <ScreenBox
            hasFooter
            footerComponent={ <FooterContacts /> }
        >
            <main id="external-home">
                <p>Teste</p>
            </main>
        </ScreenBox>
    )
}