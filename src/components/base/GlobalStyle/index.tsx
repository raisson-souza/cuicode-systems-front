import { GetSystemStyle } from "../InitialFetch"

type GlobalStyleProps = {
    children : React.ReactNode
}

export default function GlobalStyle(props : GlobalStyleProps) {
    const systemStyle = GetSystemStyle()

    const globalStyle = (
        <style
            dangerouslySetInnerHTML={{ __html: `
                * {
                    color: ${ systemStyle.TextColor };
                    font-family: "Montserrat", sans-serif !important
                };
                input {
                    background-color: ${ systemStyle.OppositeTextColor };
                    border-radius: 5px
                };
                button {
                    background-color: ${ systemStyle.OppositeTextColor }
                };
                li.MuiButtonBase-root {
                    color: black !important;
                };
                .MuiPickersCalendarHeader-label,
                .MuiPickersArrowSwitcher-root > .MuiIconButton-root > .MuiSvgIcon-root > path,
                .MuiPickersCalendarHeader-switchViewButton > .MuiSvgIcon-root > path,
                .MuiYearCalendar-root > .MuiPickersYear-root > button
                {
                    color: black !important;
                };
            `}}
        />
    )

    return (
        <>
            { globalStyle }
            { props.children }
        </>
    )
}