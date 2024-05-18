type envProps = {
    BackendBaseUrl: () => string,
    SystemKey: () => string,
    Environment: () => string,
    UserEmail: () => string,
    UserPassword: () => string,
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
        if (_ === '' || _ === 'undefined') {
            console.error("REACT_APP_ENV não encontrado no ENV.")
            throw new Error("REACT_APP_ENV não encontrado no ENV.")
        }
        return _
    },
    UserEmail: () => {
        const _ = String(process.env["REACT_APP_USER_EMAIL"])
        if (_ === '' || _ === 'undefined') {
            console.error("REACT_APP_USER_EMAIL não encontrado no ENV.")
            throw new Error("REACT_APP_USER_EMAIL não encontrado no ENV.")
        }
        return _
    },
    UserPassword: () => {
        const _ = String(process.env["REACT_APP_USER_PASSWORD"])
        if (_ === '' || _ === 'undefined') {
            console.error("REACT_APP_USER_PASSWORD não encontrado no ENV.")
            throw new Error("REACT_APP_USER_PASSWORD não encontrado no ENV.")
        }
        return _
    },
}

export default env