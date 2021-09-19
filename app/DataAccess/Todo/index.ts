import Todo from "App/Models/Todo";

export function getAllTodoList(){
    return Todo.all()
}

export function addNewTodo(title){
    const item = Todo.create({title: title, is_completed: false})
    return item
}

export function getTodoByID(id){
    const item = Todo.findOrFail(id)
    return item
}

export async function changeTodoByID(id, value){
    const item = await Todo.findOrFail(id)
    item.is_completed = value
    item.save()
    return item
}

export async function deleteTodoByID(id){
    const item = await Todo.findOrFail(id)
    item.delete()
}