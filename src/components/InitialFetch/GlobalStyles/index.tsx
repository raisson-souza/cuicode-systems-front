import SystemStyle from "../../../data/classes/SystemStyle"

type GenerateGlobalStyleProps = {
    systemStyle: SystemStyle
}

export default function GenerateGlobalStyle({ systemStyle } : GenerateGlobalStyleProps) : JSX.Element {
    const globalStyleAll = (
        <style
            dangerouslySetInnerHTML={{ __html: `
                * {
                    color: ${ systemStyle.TextColor };
                };
            `}}
        />
    )
    const globalStyleInput = (
        <style
            dangerouslySetInnerHTML={{ __html: `
                input {
                    background-color: ${
                        systemStyle.TextColor === 'black'
                            ? 'white'
                            : 'black'
                    }
                }
            `}}
        />
    )
    const globalStyleButton = (
        <style
            dangerouslySetInnerHTML={{ __html: `
                button {
                    background-color: ${
                        systemStyle.TextColor === 'black'
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