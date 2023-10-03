import { Express, Request, Response, Router } from 'express'
import commonRes from '../../utils/commonRes'
import silentHandle from '../../utils/silentHandle'
import User from './user.routes'
import Product from './product.routes'
import { log } from 'console'

interface RouterConf {
  path: string,
  router: Router,
  meta?: any
}

// 路由配置
const routerConf: Array<RouterConf> = [
  { path: '/user', router: User },
  { path: '/product', router: Product }
]


//Test code
function routes(app: Express) {
    // 根目录
    app.get('/', (req: Request, res: Response) => res.status(200).send('Hello Shinp!!!'))

    app.get('/hi', (req: Request, res: Response) => {
      commonRes(res, { word: 'Hello Shinp!!!' }, { type: 'success', message: '请求成功' }) //成功
      // commonRes.denied(res, null) //无权限
      // commonRes.error(res, null) //错误
      // commonRes(res, { word: 'Hello Shinp!!!' }) // 成功
    })

    const getInfo = function () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          Math.random() > .5 ? resolve('info...') : reject('error...')
        }, 500)
      })
    }

    app.get('/staticErrorGet', async (req: Request, res: Response) => {
        const [e, result] = await silentHandle(getInfo)
        e ? commonRes.error(res, null) : commonRes(res, { result })
    })

    routerConf.forEach((conf) => app.use(conf.path, conf.router))
}

export default routes
