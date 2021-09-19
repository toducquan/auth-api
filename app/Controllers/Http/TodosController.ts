import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import * as TodoDb from "../../DataAccess/Todo/index";

export default class TodosController {
    /**
  * @swagger
  * /api/todo:
  *   get:
  *     tags:
  *       - Todo
  *     summary: Get todolist
  *     responses:
  *       200:
  *         description: Ok
  */
    public async index() {
        const todolist = TodoDb.getAllTodoList()
        return todolist
    }
    /**
  * @swagger
  * /api/todo:
  *   post:
  *     tags:
  *       - Todo
  *     summary: Add new item
  *     parameters:
  *       - name: Todo
  *         in: body
  *         required: true
  *         schema:
  *             properties:
  *                 title:
  *                     type: string
  *                     example: di choi
  *                     require: true
  *     responses:
  *       201:
  *         description: Created
  */
    public async store({request,response}: HttpContextContract){
        TodoDb.addNewTodo(request.input('title'))
        return response.status(201).json({"mess": "created"})
    }
    /**
 * @swagger
 * /api/todo/{id}:
 *   get:
 *     summary: Get the item by id
 *     tags: [Todo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The item description by id
 */
    public async show({params}: HttpContextContract){
        const item = TodoDb.getTodoByID(params.id)
        return item
    }
/**
 * @swagger
 * /api/todo/{id}:
 *  put:
 *    summary: Update the item by the id
 *    tags: [Todo]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The item id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *              is_completed:
 *                  required: true
 *                  example: true
 *    responses:
 *      200:
 *        description: The item was updated
 */
    public async update({params, request, response}: HttpContextContract) {
        const item = await TodoDb.changeTodoByID(params.id, request.input('is_completed'))
        return response.status(202).send(item)
    }
    /**
 * @swagger
 * /api/todo/{id}:
 *   delete:
 *     summary: Remove the item by id
 *     tags: [Todo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The item id
 * 
 *     responses:
 *       200:
 *         description: The book was deleted
 */
    public async destroy({params, response}: HttpContextContract) {
        await TodoDb.deleteTodoByID(params.id)
        return response.json({"mess": "deleted successfully"})
    }
}