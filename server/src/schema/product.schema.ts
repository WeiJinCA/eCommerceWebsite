// 接口参数校验 主要使用zod，具体使用可查看文档

import { object, string, TypeOf } from 'zod'

// 创建接口
export const createProductSchema = object({
  body: object({
    // company: string({ required_error: '缺少公司名称' }).nonempty(),
    // product: string({ required_error: '缺少产品名称' }).nonempty(),
    // available: string({ required_error: '缺少是否有货' }).nonempty(),
   
  })
})

export type CreateProductInput = Omit<TypeOf<typeof createProductSchema>, 'body.passwordConfirmation'>
