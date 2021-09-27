import { UserResponseImpl } from "App/Response/ResponseImpl/UserResponseImpl";

export class USerService{
    private userResponseImpl = new UserResponseImpl()

    public register(email: string, password: string){
        return this.userResponseImpl.addNewUser(email, password)
    }
}