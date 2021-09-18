import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class UsersController {
            /**
  * @swagger
  * /register:
  *   post:
  *     tags:
  *       - Auth
  *     summary: Add new account
  *     parameters:
  *       - name: Auth
  *         in: body
  *         required: true
  *         schema:
  *             properties:
  *                 email:
  *                     type: string
  *                     example: toducquan5@gmail.com
  *                     require: true
  *                 password:
  *                     type: string
  *                     example: 25092000
  *                     require: true
  *                 password_confirmation:
  *                     type: string
  *                     example: 25092000
  *                     require: true
  *     responses:
  *       201:
  *         description: Created
  */
    public async register({request, response}:HttpContextContract){
        const validation = schema.create({
            email: schema.string({}, [
                rules.email(), 
                rules.unique({table: 'users', column: 'email'})
            ]),
            password: schema.string({}, [
                rules.confirmed()
            ])
        })
        const data = await request.validate({schema: validation})
        await User.create({email: data.email, password: data.password})
        return response.status(201).json({"mess": "created successfully"})
    }

               /**
  * @swagger
  * /login:
  *   post:
  *     tags:
  *       - Auth
  *     summary: login to website
  *     parameters:
  *       - name: Auth
  *         in: body
  *         required: true
  *         schema:
  *             properties:
  *                 email:
  *                     type: string
  *                     example: toducquan5@gmail.com
  *                     require: true
  *                 password:
  *                     type: string
  *                     example: 25092000
  *                     require: true
  *     responses:
  *       200:
  *         description: Ok
  */
    public async login({request, auth}: HttpContextContract){
        const email = request.input('email')
        const password = request.input('password')              
        const token = await auth.use('api').attempt(email, password, {
            expiresIn: "30mins"
        })
        return token
    }
}