import User from 'App/Models/User'

export function register(email, password) {
    const user =  User.create({email: email, password: password})
    return user
}