import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    phone: String,
    profile:String,
    roleId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Role",
        required:true
    }
})

const User = mongoose.model("User", UserSchema);

export default User;