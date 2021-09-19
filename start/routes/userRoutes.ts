import Route from '@ioc:Adonis/Core/Route'


Route.group(() =>{
  Route.post('/register', 'UsersController.index'), 
  Route.post('/login', 'UsersController.store')
})