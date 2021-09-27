import { TodoResponseImpl } from "App/Response/ResponseImpl/TodoResponseImpl";

export class TodoService{
    private todoResponse = new TodoResponseImpl()

    public getAll(){
        return this.todoResponse.getTodos()
    }

    public addNewTodo(title: string){
        return this.todoResponse.addTodo(title)
    }

    public getTodoById(id: string){
        return this.todoResponse.getTodoById(id)
    }

    public changeTodoById(id: string, value: boolean){
        return this.todoResponse.updateToDoById(id, value)
    }

    public deleteTodoById(id: string){
        return this.todoResponse.deleteToDoById(id)
    }

}