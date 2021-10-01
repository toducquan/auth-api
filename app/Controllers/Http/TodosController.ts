import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { TodoService } from 'App/Service/TodoService'


export default class TodosController {

    private todoService = new TodoService()

    public async index() {
        return this.todoService.getAll()
    }
 
    public async store({request,response}: HttpContextContract){

        console.log(request.all())
        const item = this.todoService.addNewTodo(request.input('title'))
        return response.status(201).json({"mess": "created"})
    }

    public async show({params}: HttpContextContract){
        const item = this.todoService.getTodoById(params.id)
        return item
    }

    public async update({params, request, response}: HttpContextContract) {
        const item = this.todoService.changeTodoById(params.id, request.input('is_completed'))
        return response.status(202).send(item)
    }

    public async destroy({params, response}: HttpContextContract) {
        const item = this.todoService.deleteTodoById(params.id)
        return response.json({"mess": "deleted successfully"})
    }
}