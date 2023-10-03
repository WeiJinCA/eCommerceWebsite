// user.model.ts

import mongoose from 'mongoose'
import config from 'config'

// 模板接口
export interface UserDocument extends mongoose.Document {
  name: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  agree: string
  favorites: number[]
}

// 模板校验规则
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    favorites: { type: Array, "default": [] },
  }
)

// 唯一
userSchema.index({ email: 1, phone: 1 }, { unique: true })

// 创建模板 执行之后会自动在mongodb中创建相应的模板
const UserModel = mongoose.model<UserDocument>('User', userSchema)

export default UserModel
