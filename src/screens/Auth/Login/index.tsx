import { Link, useNavigate } from "react-router-dom"
import ScreenBox from "../../../components/ScreenBox"
import { GetSystemStyle } from "../../../components/InitialFetch"
import { useEffect, useState } from "react"
import FormBuilder, { FormFieldsValues } from "../../../data/classes/FormBuilder"
import SystemEndpoints from "../../../services/SystemEndpoints"
import IsNil from "../../../functions/IsNil"
import FindValue from "../../../functions/FindValue"
import AuthEndpoints, { LoginResponse } from "../../../services/AuthEndpoints"
import LocalStorage from "../../../data/classes/LocalStorage"
import User from "../../../data/classes/User"

export default function LoginScreen() {
    const systemStyle = GetSystemStyle()
    const [ loginForm, setLoginForm ] = useState<FormBuilder | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchLoginForm = async () => {
            const response = await SystemEndpoints.GetForm('login')

            if (!response.Success) {
                window.alert('Ocorreu um erro ao carregar o formulário de login.')
                return
            }

            const form = new FormBuilder({
                data: FindValue(response.Data, ["Fields"]),
                formId: "login_form",
                formSubmitButtonMsg: "Enviar"
            })
            setLoginForm(form)
        }

        fetchLoginForm()
    }, [navigate])

    const loginFetch = async (formFieldsValues : FormFieldsValues[]) => {
        let email : string = ""
        let password : string = ""

        formFieldsValues.map(formFieldValue => {
            if (formFieldValue.Id === "Email") email = formFieldValue.Value
            if (formFieldValue.Id === "Password") password = formFieldValue.Value
            return null
        })

        const loginResponse = await AuthEndpoints.Login(email, password)

        if (loginResponse.Success) {
            const login = {
                token: loginResponse.Data["token"],
                user: new User(loginResponse.Data["user"])
            } as LoginResponse

            LocalStorage.SetToken(login.token)
            LocalStorage.SetCredentials(email, password)
            navigate('/home')
            return
        }

        window.alert(loginResponse.Data)
    }

    const loginFormNode = IsNil(loginForm)
        ? <></>
        : loginForm!.BuildForm(loginFetch)

    return (
        <ScreenBox systemStyle={ systemStyle }>
            <h1>LoginScreen</h1>
            <Link to={'/'}>ExternalHome</Link>
            <Link to={'/account_recovery'}>AccountRecovery</Link>
            <Link to={'/home'}>InternalHome</Link>
            <Link to={'/user_registry'}>UserRegistry</Link>
            { loginFormNode }
        </ScreenBox>
    )
}