// https://www.youtube.com/watch?v=oTIJunBa6MA&t=107s
// https://reactrouter.com/en/main/routers/create-browser-router

import { createBrowserRouter } from "react-router-dom"
import ExternalHome from "./screens/Home/ExternalHome"
import DefaultError from "./screens/Error/DefaultError"
import User from "./screens/Users/User"
import Users from "./screens/Users/Users"
import InternalHome from "./screens/Home/InternalHome"
import UserRegistryScreen from "./screens/Users/UserRegistry"
import LoginScreen from "./screens/Auth/Login"
import AccountRecoveryScreen from "./screens/Auth/AccountRecovery"
import ProtectedRoute from "./components/ProtectedRoute"
import NotFoundScreen from "./screens/Error/NotFound"

type CreateRouteProp = {
    path : string,
    element : JSX.Element,
    protectedRoute? : boolean
}

function CreateRoute({ path, element, protectedRoute = true } : CreateRouteProp) {
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
        element: <AccountRecoveryScreen />
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