import { Router } from 'express'
import { createProductHandler, getAllProductsHandler, getProductByIdArrayHandler } from '../controller/product.controller'
import validate from '../middleware/validate'
import { createProductSchema } from '../schema/product.schema'

const router = Router()

// 需要校验接口参数的，加上校验中间件
router.post('/create', validate(createProductSchema), createProductHandler)

router.get('/getAll', validate(createProductSchema), getAllProductsHandler)

//router.get('/:id', validate(createProductSchema), getProductByIdHandler)

router.get('/get', getProductByIdArrayHandler)

export default router
