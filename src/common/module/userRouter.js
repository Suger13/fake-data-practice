const { Router } = require('express')
const userController = require('./controller/user.controller.js')

 const userRouter = Router()

 userRouter.get('/', userController.getUser);
 userRouter.get('/:id', userController.getuserById)
 userRouter.post('/register', userController.register);
 userRouter.put('/:id', userController.updateUser);
 userRouter.delete('/:id', userController.deleteUser);

 module.exports = userRouter;