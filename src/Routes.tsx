// https://www.youtube.com/watch?v=oTIJunBa6MA&t=107s
// https://reactrouter.com/en/main/routers/create-browser-router

import {
    createBrowserRouter
} from "react-router-dom"
import ExternalHome from "./screens/Home/ExternalHome"
import DefaultError from "./screens/Error/DefaultError"
import User from "./screens/Users/User"
import Users from "./screens/Users/Users"
import InternalHome from "./screens/Home/InternalHome"
import UserRegistryScreen from "./screens/Users/UserRegistry"
import LoginScreen from "./screens/Auth/Login"
import AccountRecoveryScreen from "./screens/Auth/AccountRecovery"
import ProtectedRoute from "./components/ProtectedRoute"

function CreateRoute
(
    path : string,
    element : JSX.Element,
    protectedRoute : boolean = true,
    errorElement : JSX.Element = <DefaultError />
) {
    return {
        "path": path,
        "element": protectedRoute
            ? (<ProtectedRoute>{ element }</ProtectedRoute>)
            : element,
        "errorElement": errorElement
    }
}

const router = createBrowserRouter([
    CreateRoute("*", <>404</>, false),
    { ...CreateRoute("/", <ExternalHome />, false), index: true },
    CreateRoute("/user_registry", <UserRegistryScreen />, false),
    CreateRoute("/login", <LoginScreen />, false),
    CreateRoute("/home", <InternalHome />),
    CreateRoute("/account_recovery", <AccountRecoveryScreen />),
    CreateRoute("/users", <Users />),
    CreateRoute("/user/:userId", <User />),
    CreateRoute("/group_registry", (<ProtectedRoute><>Rota não desenvolvida</></ProtectedRoute>)),
    CreateRoute("/group/:groupId", <>Rota não desenvolvida</>),
    CreateRoute("/groups", <>Rota não desenvolvida</>),
    CreateRoute("/board_registry", <>Rota não desenvolvida</>),
    CreateRoute("/board/:boardId", <>Rota não desenvolvida</>),
    CreateRoute("/boards", <>Rota não desenvolvida</>),
])

export default router