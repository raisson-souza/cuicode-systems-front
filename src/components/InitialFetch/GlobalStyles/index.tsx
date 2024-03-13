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
    const globalStyleLi = (
        <style
            dangerouslySetInnerHTML={{ __html: `
                li {
                    color: ${ invertedTextColor }
                }
            `}}
        />
    )

    return (
        <>
            { globalStyleAll }
            { globalStyleInput }
            { globalStyleButton }
            { globalStyleLi }
        </>
    )
}