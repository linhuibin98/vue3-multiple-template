import { isArray, isFunction } from './util'

export function compose(middlewares) {
  if (!isArray(middlewares))
    throw new TypeError('Middlewares stack must be an array!')

  for (const fn of middlewares) {
    if (!isFunction(fn))
      throw new TypeError('Middleware must be composed of functions!')
  }

  return (context, next) => {
    let index = -1

    const dispatch = (i) => {
      if (i <= index)
        return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middlewares[i]
      if (i === middlewares.length)
        fn = next
      if (!fn)
        return Promise.resolve()

      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
      }
      catch (err) {
        return Promise.reject(err)
      }
    }

    return dispatch(0)
  }
}
