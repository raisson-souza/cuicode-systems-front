export const Base64 = {
    ToString : (base64? : string) => {
        return atob(base64 ?? "MA==")
    },
    ToBase64 : (str? : string) => {
        return btoa(str ?? "MA==")
    }
}