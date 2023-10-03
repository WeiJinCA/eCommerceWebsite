// user.controller.ts

import { Request, Response } from 'express'
import  commonRes from '../../utils/commonRes'
import  silentHandle from '../../utils/silentHandle'

import { CreateProductInput } from '../schema/product.schema'
import Product_CRUD from '../service/product.service'

export async function createProductHandler(req: Request<{}, {}, CreateProductInput['body']>, res: Response) {
  const [e, product] = await silentHandle(Product_CRUD.create, req.body)
  console.log(e  );
  console.log(product );
  
  return e ? commonRes.error(res, null, e.message) : commonRes(res, product)

}

export async function getAllProductsHandler(req: Request<{}, {}, CreateProductInput['body']>, res: Response) {

  const query = {  };

  const [e, product] = await silentHandle(Product_CRUD.find,query)
  console.log(e?.message + " getall"  );
  console.log(product );
  
  return e ? commonRes.error(res, null, e.message) : commonRes(res, product)
}

export async function getProductByIdArrayHandler(req: Request<{}, {}, CreateProductInput['body']>, res: Response) {

  const arr = req.query.arr;

  const query = { id: { "$in": arr } };
  
  const [e, product] = await silentHandle(Product_CRUD.find, query)
  console.log(e?.message + " get");
  console.log(product);

  return e ? commonRes.error(res, null, e.message) : commonRes(res, product)
}

// export async function changePasswordHandler(req: Request<{}, {},CreateUserInput['body']>, 
//             res: Response){

//   const query = { email: { $eq:req.body.email},password: { $eq:req.body.Old} };
//   const update = { $set: { password:req.body.Password} };

//   const options = { new: true };
//   const [e, user] = await silentHandle(USER_CRUD.update, query,update,options)
              
//   return e ? commonRes.error(res, null, e.message) : commonRes(res, user)
// }
