import SystemStyle from "../../../data/classes/SystemStyle"
import IsNil from "../../../functions/IsNil"
import InvertedTextColor from "../../../functions/style/InvertedTextColor"

export default function GenerateGlobalStyle(systemStyle? : SystemStyle) : JSX.Element | null {
    if (IsNil(systemStyle))
        return null

    const invertedTextColor = InvertedTextColor(systemStyle!.TextColor)

    return (
        <>
            <style
                dangerouslySetInnerHTML={{ __html: `
                    * {
                        color: ${ systemStyle!.TextColor };
                    };
                    input {
                        background-color: ${ invertedTextColor };
                        border-radius: 5px
                    };
                    button {
                        background-color: ${ invertedTextColor }
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
        </>
    )
}