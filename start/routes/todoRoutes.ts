import Route from '@ioc:Adonis/Core/Route'

Route.group(() =>{
  Route.resource('todo', 'TodosController').apiOnly()

}).prefix('/api').middleware('auth')