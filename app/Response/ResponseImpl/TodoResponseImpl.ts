import Todo from "App/Models/Todo";
import { TodoResponse } from "../TodoResponse";
export class TodoResponseImpl implements TodoResponse{
    public  getTodos() {
        return Todo.all()
    }
    public addTodo(title: string) {
        const item = Todo.create({title: title, is_completed: false})
        return item
    }
    public getTodoById(id: string) {
        const item = Todo.findOrFail(id)
        return item
    }
    public async updateToDoById(id: string, value: boolean) {
        const item = await Todo.findOrFail(id)
        item.is_completed = value
        item.save()
        return item
    }
    public async deleteToDoById(id: string) {
        const item = await Todo.findOrFail(id)
        item.delete()
    }

}