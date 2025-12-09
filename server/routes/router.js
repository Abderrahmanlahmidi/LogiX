import userRouter from "./user.router.js";
import roleRouter from "./role.router.js";

const path = "/api"

export const routers = [
    {path:`${path}`, route:userRouter},
    {path:`${path}`, route:roleRouter}
]


export default routers;

