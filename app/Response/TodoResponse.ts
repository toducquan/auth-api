export interface TodoResponse {
    getTodos(): any

    addTodo(title: string): any

    getTodoById(id: string): any

    updateToDoById(id: string, value: boolean): any

    deleteToDoById(id: string): any
}