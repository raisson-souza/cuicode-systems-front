import SystemStyle from "../../../data/classes/SystemStyle"
import IsNil from "../../../functions/IsNil"
import InvertedTextColor from "../../../functions/style/InvertedTextColor"

export default function GenerateGlobalStyle(systemStyle? : SystemStyle) : JSX.Element | null {
    if (IsNil(systemStyle))
        return null

    const invertedTextColor = InvertedTextColor(systemStyle!.TextColor)

    const globalStyleAll = (
        <style
            dangerouslySetInnerHTML={{ __html: `
                * {
                    color: ${ systemStyle!.TextColor };
                };
            `}}
        />
    )
    const globalStyleInput = (
        <style
            dangerouslySetInnerHTML={{ __html: `
                input {
                    background-color: ${ invertedTextColor };
                    border-radius: 5px
                }
            `}}
        />
    )
    const globalStyleButton = (
        <style
            dangerouslySetInnerHTML={{ __html: `
                button {
                    background-color: ${ invertedTextColor }
                }
            `}}
        />
    )
    const globalStyleMuiMenu = (
        <style
            dangerouslySetInnerHTML={{ __html: `
                li.MuiButtonBase-root {
                    color: black !important;
                }
            `}}
        />
    )
    const globalStyleMuiDateCalendar = (
        <style
            dangerouslySetInnerHTML={{ __html: `
                .MuiPickersCalendarHeader-label,
                .MuiPickersArrowSwitcher-root > .MuiIconButton-root > .MuiSvgIcon-root > path,
                .MuiPickersCalendarHeader-switchViewButton > .MuiSvgIcon-root > path,
                .MuiYearCalendar-root > .MuiPickersYear-root > button
                {
                    color: black !important;
                }
            `}}
        />
    )

    return (
        <>
            { globalStyleAll }
            { globalStyleInput }
            { globalStyleButton }
            { globalStyleMuiMenu }
            { globalStyleMuiDateCalendar }
        </>
    )
}