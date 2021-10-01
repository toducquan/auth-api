import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { validation } from 'App/Validation/userValidation'
import { USerService } from 'App/Service/UserService'

export default class UsersController {

    private userService = new USerService()

    public async index({request, response}:HttpContextContract){
        const data = await request.validate({schema: validation})
        await this.userService.register(data.email, data.password)
        return response.status(201).json({"mess": "created successfully"})
    }


    public async store({request, auth}: HttpContextContract){
        const email = request.input('email')
        const password = request.input('password')              
        const token =  await auth.use('api').attempt(email, password, {
            expiresIn: "30mins"
        })
        return token
    }
}