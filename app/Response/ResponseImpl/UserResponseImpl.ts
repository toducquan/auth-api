import User from "App/Models/User";
import { UserResponse } from "../UserResponse";

export class UserResponseImpl implements UserResponse{
    public addNewUser(email: string, password: string){
        const user = User.create({email: email, password: password})
        return user
    }
}