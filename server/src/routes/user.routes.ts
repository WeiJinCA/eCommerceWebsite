import { Router } from 'express'
import { registerUserHandler, loginUserHandler, getFavoritesHandler, favoritesHandler } from '../controller/user.controller'
import validate from '../middleware/validate'
import { createUserSchema } from '../schema/user.schema'

const router = Router()

// 需要校验接口参数的，加上校验中间件
//router.post('/create', validate(createUserSchema), createUserHandler)

router.post('/register', registerUserHandler)

router.post('/login', loginUserHandler)

//router.post('/changePassword', changePasswordHandler)

router.put('/favorites', favoritesHandler)

router.get('/get/:email', getFavoritesHandler)
export default router
