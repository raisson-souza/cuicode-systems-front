import { createBrowserRouter } from "react-router-dom"

import AccountRecoveryScreen from "./screens/Auth/AccountRecovery"
import DefaultError from "./screens/Error/DefaultError"
import ExternalHome from "./screens/Home/ExternalHome"
import InitialFetch from "./components/InitialFetch"
import InternalHome from "./screens/Home/InternalHome"
import LoginScreen from "./screens/Auth/Login"
import NotReadyRoute from "./components/NotReadyRoute"
import ProtectedRoute from "./components/ProtectedRoute"
import User from "./screens/Users/User"
import UserRegistryScreen from "./screens/Users/UserRegistry"
import Users from "./screens/Users/Users"

type CreateRouteProp = {
    path : string,
    element : JSX.Element,
    protectedRoute? : boolean
}

function CreateRoute({ path, element, protectedRoute = true } : CreateRouteProp) {
    element = (
        <InitialFetch>
            { element }
        </InitialFetch>
    )

    return {
        "path": path,
        "element": protectedRoute
            ? (<ProtectedRoute>{ element }</ProtectedRoute>)
            : element,
        "errorElement": <DefaultError />
    }
}

const router = createBrowserRouter([
    CreateRoute({
        path: "*",
        element: <NotReadyRoute />,
        protectedRoute: false
    }),
    CreateRoute({
        path: "/",
        element: <ExternalHome />,
        protectedRoute: false
    }),
    CreateRoute({
        path: "/user_registry",
        element: <UserRegistryScreen />,
        protectedRoute: false
    }),
    CreateRoute({
        path: "/login",
        element: <LoginScreen />,
        protectedRoute: false
    }),
    CreateRoute({
        path: "/home",
        element: <InternalHome />
    }),
    CreateRoute({
        path: "/account_recovery",
        element: <AccountRecoveryScreen />,
        protectedRoute: false
    }),
    CreateRoute({
        path: "/users",
        element: <Users />
    }),
    CreateRoute({
        path: "/user/:userIdHash",
        element: <User />
    }),
    CreateRoute({
        path: "/group_registry",
        element: (<NotReadyRoute />)
    }),
    CreateRoute({
        path: "/group/:groupIdHash",
        element: (<NotReadyRoute />)
    }),
    CreateRoute({
        path: "/groups",
        element: (<NotReadyRoute />)
    }),
    CreateRoute({
        path: "/board_registry",
        element: (<NotReadyRoute />)
    }),
    CreateRoute({
        path: "/board/:boardIdHash",
        element: (<NotReadyRoute />)
    }),
    CreateRoute({
        path: "/boards",
        element: (<NotReadyRoute />)
    }),
])

export default router