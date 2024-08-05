import SystemStyle from "../../../../data/classes/SystemStyle"

import IsNil from "../../../../functions/IsNil"

export default function GenerateGlobalStyle(systemStyle? : SystemStyle | null) : JSX.Element | null {
    if (IsNil(systemStyle))
        return null

    return (
        <>
            <style
                dangerouslySetInnerHTML={{ __html: `
                    * {
                        color: ${ systemStyle!.TextColor };
                    };
                    input {
                        background-color: ${ systemStyle!.OppositeTextColor };
                        border-radius: 5px
                    };
                    button {
                        background-color: ${ systemStyle!.OppositeTextColor }
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