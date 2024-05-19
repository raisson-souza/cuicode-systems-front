type envProps = {
    BackendBaseUrl: () => string,
    SystemKey: () => string,
    Environment: () => string,
    UserEmail: () => string | null,
    UserPassword: () => string | null,
}

const env : envProps = {
    BackendBaseUrl: () => {
        const _ = String(process.env["REACT_APP_BACKEND_BASE_URL"])
        if (_ === '' || _ === 'undefined') {
            console.error("REACT_APP_BACKEND_BASE_URL não encontrado no ENV.")
            throw new Error("REACT_APP_BACKEND_BASE_URL não encontrado no ENV.")
        }
        return _
    },
    SystemKey: () => {
        const _ = String(process.env["REACT_APP_SYSTEM_KEY"])
        if (_ === '' || _ === 'undefined') {
            console.error("REACT_APP_SYSTEM_KEY não encontrado no ENV.")
            throw new Error("REACT_APP_SYSTEM_KEY não encontrado no ENV.")
        }
        return _
    },
    Environment: () => {
        const _ = String(process.env["REACT_APP_ENV"])
        return _ === '' || _ === 'undefined' ? 'testing' : _
    },
    UserEmail: () => {
        const _ = String(process.env["REACT_APP_USER_EMAIL"])
        return _ === '' || _ === 'undefined' ? null : _
    },
    UserPassword: () => {
        const _ = String(process.env["REACT_APP_USER_PASSWORD"])
        return _ === '' || _ === 'undefined' ? null : _
    },
}

export default env