import { createBrowserRouter } from "react-router-dom"

import AccountRecoveryScreen from "./screens/Auth/AccountRecovery"
import DefaultError from "./screens/Error/DefaultError"
import ExternalHome from "./screens/Home/ExternalHome"
import InitialFetch from "./components/InitialFetch"
import InternalHome from "./screens/Home/InternalHome"
import LoginScreen from "./screens/Auth/Login"
import NotFoundScreen from "./screens/Error/NotFound"
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
        element: <NotFoundScreen />,
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
        path: "/user/:userId",
        element: <User />
    }),
    CreateRoute({
        path: "/group_registry",
        element: (<>Rota não desenvolvida</>)
    }),
    CreateRoute({
        path: "/group/:groupId",
        element: (<>Rota não desenvolvida</>)
    }),
    CreateRoute({
        path: "/groups",
        element: (<>Rota não desenvolvida</>)
    }),
    CreateRoute({
        path: "/board_registry",
        element: (<>Rota não desenvolvida</>)
    }),
    CreateRoute({
        path: "/board/:boardId",
        element: (<>Rota não desenvolvida</>)
    }),
    CreateRoute({
        path: "/boards",
        element: (<>Rota não desenvolvida</>)
    }),
])

export default router