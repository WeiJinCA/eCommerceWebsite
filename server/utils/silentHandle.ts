// 静态错误捕捉
//如果执行过程有错误，则捕捉并赋值给返回数组的第一个元素
async function silentHandle<T, U = Error>(fn: Function, ...args: Array<unknown>): Promise<[U, null] | [null, T]> {
  let result: [U, null] | [null, T]

  //await作用： 暂定程序，等待fn函数执行完返回，将返回值赋给result，只有在async函数中可用
  try {
    result = [null, await fn(...args)]
  } catch (e: any) {
    result = [e, null]
  }

  return result
}

export default silentHandle
