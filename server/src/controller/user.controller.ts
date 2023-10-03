// user.controller.ts

import { Request, Response } from 'express'
import commonRes from '../../utils/commonRes'
import silentHandle from '../../utils/silentHandle'

import { CreateUserInput } from '../schema/user.schema'
import USER_CRUD from '../service/user.service'

// export async function createUserHandler(req: Request<{}, {}, CreateUserInput['body']>, res: Response) {
//   const [e, user] = await silentHandle(USER_CRUD.create, req.body)

//   return e ? commonRes.error(res, null, e.message) : commonRes(res, user)

// }

export async function registerUserHandler(
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response) {

  const [e, user] = await silentHandle(USER_CRUD.create, req.body)

  return e ? commonRes.error(res, null, e.message) : commonRes(res, user)
}

export async function loginUserHandler(
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response) {

  const query = { email: { $eq: req.body.email }, password: { $eq: req.body.password } };

  const [e, user] = await silentHandle(USER_CRUD.find, query)

  return e ? commonRes.error(res, null, e.message) : commonRes(res, user)
}

// export async function changePasswordHandler(req: Request<{}, {}, CreateUserInput['body']>,
//   res: Response) {

//   const query = { email: { $eq: req.body.email }, password: { $eq: req.body.Old } };
//   const update = { $set: { password: req.body.password } };

//   const options = { new: true };
//   const [e, user] = await silentHandle(USER_CRUD.update, query, update, options)

//   return e ? commonRes.error(res, null, e.message) : commonRes(res, user)
// }

export async function favoritesHandler(req: Request<{}, {}, CreateUserInput['body']>,
  res: Response) {
  let data = req.body;

  const query = { email: { $eq: data.email } };
  let update = {};
  if (data.status) {
    update = { $addToSet: { favorites: data.productId } };
  } else {
    update = { $pull: { favorites: data.productId } };
  }
  const [e, user] = await silentHandle(USER_CRUD.update, query, update)

  return e ? commonRes.error(res, null, e.message) : commonRes(res, user)

}

export async function getFavoritesHandler(req: Request<{}, {}, CreateUserInput['body']>,
  res: Response) {


  const query = { email: { $eq: req.params.email } };

  const [e, user] = await silentHandle(USER_CRUD.find, query)

  return e ? commonRes.error(res, null, e.message) : commonRes(res, user)

}