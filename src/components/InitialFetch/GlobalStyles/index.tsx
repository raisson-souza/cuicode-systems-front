import SystemStyle from "../../../data/classes/SystemStyle"
import IsNil from "../../../functions/IsNil"

export default function GenerateGlobalStyle(systemStyle? : SystemStyle) : JSX.Element | null {
    if (IsNil(systemStyle))
        return null

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
                    background-color: ${
                        systemStyle!.TextColor === 'black'
                            ? 'white'
                            : 'black'
                    };
                    border-radius: 5px
                }
            `}}
        />
    )
    const globalStyleButton = (
        <style
            dangerouslySetInnerHTML={{ __html: `
                button {
                    background-color: ${
                        systemStyle!.TextColor === 'black'
                            ? 'white'
                            : 'black'
                    }
                }
            `}}
        />
    )

    return (
        <>
            { globalStyleAll }
            { globalStyleInput }
            { globalStyleButton }
        </>
    )
}