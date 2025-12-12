import {Home, Register, Login, Dashboard, Profile} from "./lazyRoutes";

export const routesConfig = [
    {
        path:"/",
        element:<Home/>
    },
    {
        path:"/register",
        element:<Register/>,
        guestOnly:true
    },
    {
        path:"/login",
        element:<Login/>,
        guestOnly:true
    },
    {
        path:"/dashboard",
        element:<Dashboard/>,
        protected:true,
        roles:["Admin"]
    },
    {
        path:"/profile",
        element:<Profile/>,
        protected:true,
        roles:["Admin", "Driver"]
    },
]