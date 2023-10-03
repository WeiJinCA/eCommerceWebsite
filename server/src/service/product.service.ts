// mongodb操作

import { BaseCrudProvider } from '../../utils/crudProvider'
import ProductModel, { ProductDocument } from '../models/product.model'

const CRUD = BaseCrudProvider<ProductDocument, Omit<ProductDocument, 'createdAt'>>(ProductModel)

export default CRUD
