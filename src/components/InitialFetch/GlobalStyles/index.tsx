import { GetSystemStyle } from ".."

type GenerateGlobalStyleProps = { }

export default function GenerateGlobalStyle({ } : GenerateGlobalStyleProps) : JSX.Element {
    const systemStyle = GetSystemStyle()

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