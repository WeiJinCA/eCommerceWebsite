import mongoose from 'mongoose'
import config from 'config'
import { number } from 'zod'

// 模板接口
export interface ProductDocument extends mongoose.Document {
  company: string
  product: string
  colour: string
  variant: string
  processor: string
  os: string
  battery: string
  display: string
  camera: string
  available: string
  range: number
}

// 模板校验规则
const productSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    brand: { type: String, required: true },
    product: { type: String, required: true },
    color: { type: String, required: true },
    storage: { type: String, required: true },
    price: { type: Number, required: true },
  }
)

// 唯一
productSchema.index({ id: 1, product: 1, brand: 1 }, { unique: true })

// 创建模板 执行之后会自动在mongodb中创建相应的模板
const ProductModel = mongoose.model<ProductDocument>('Product', productSchema)

export default ProductModel
