import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Todo from "App/Models/Todo";

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
        return Todo.all()
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
        Todo.create({title: request.input('title'), is_completed: false})
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
        const item = Todo.findOrFail(params.id)
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
        const item = await Todo.findOrFail(params.id)
        item.is_completed = request.input('is_completed')
        item.save()
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
        const item = await Todo.findOrFail(params.id)
        item.delete()
        return response.json({"mess": "deleted successfully"})
    }
}