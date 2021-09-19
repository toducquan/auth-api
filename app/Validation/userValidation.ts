import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const validation = schema.create({
    email: schema.string({}, [
        rules.email(), 
        rules.unique({table: 'users', column: 'email'})
    ]),
    password: schema.string({}, [
        rules.confirmed()
    ])
})