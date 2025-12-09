import {AuthService} from "../Services/user.services.js";
import {GenericController} from "./generic/generic.controller.js";
import {userService} from "../Services/user.services.js";



export const register = async (req, res) => {
    try{
      await AuthService.register(req.body);
      return res.status(200).json({
          status: "user registered successfully",
      });
    }catch(err){
        return res.status(500).json({error: err});
    }
}

export const login  = async (req, res) => {
    try {
        const result = await AuthService.login(req.body);

        return res.status(200).json({
            status: "user login successfully",
            refreshToken: result.refreshToken,
            accessToken: result.token,
            data: result.user,
        });
    }catch(err){
        return res.status(500).json({error: err.message});
    }
}

export const changePassword = async (req, res) => {
    try{
        const result = await AuthService.changePassword(req.params.id,req.body);
        return res.status(200).json({
            status: "password changed successfully",
        })
    }catch(err){
        return res.status(500).json({error: err.message});
    }
}

export const userController = GenericController(userService);