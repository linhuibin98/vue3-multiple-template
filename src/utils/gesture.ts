export type ContextType = 'tap' | 'pan' | 'press' | 'flick'  // 事件 判断的类型

export interface Move {
  dx: number,     // 水平 移动距离
  dy: number,     // 垂直 移动距离
  t: number,      // 事件戳
}

export interface Context {
  startX: number,             // 水平 初始点坐标
  startY: number,             // 垂直 初始点坐标
  type: ContextType,        // 事件 判断的类型
  timeoutHandler: NodeJS.Timeout,  // 用于保存定时器 id
  moves: Move[]                   // 保存 move事件时，移动距离，和时间，最后用于判断是否为 flick事件
}

export interface GestureEvent extends Event {
  startX: number,
  startY: number,
  clientX: number,
  clientY: number,
  gestureType: string,
}

interface GestureEventMap extends HTMLElementEventMap {
  "tapstart": GestureEvent;
  "tapend": GestureEvent;
  "panstart": GestureEvent;
  "panmove": GestureEvent;
  "panend": GestureEvent;
  "pressstart": GestureEvent;
  "pressend": GestureEvent;
  "presscancel": GestureEvent;
  "cancel": GestureEvent;
}

export type EventName = keyof GestureEventMap

export interface GestureElement extends HTMLElement {
  addEventListener<K extends keyof HTMLElementEventMap | EventName>(type: K, listener: (this: HTMLElement, ev: GestureEventMap[K] ) => any, options?: boolean | AddEventListenerOptions): void;
  removeEventListener<K extends keyof HTMLElementEventMap | EventName>(type: K, listener: (this: HTMLElement, ev: GestureEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
}

/*
*
* isTap() => boolean,         // 点击事件
  isPan() => boolean,         // 滑动事件
  isPress() => boolean,       // 长按事件
  isFlick() => boolean        // 快速滑动事件
  * */
const isTap = (context: Context) => context?.type === 'tap'
const isPan = (context: Context) => context?.type === 'pan'
const isPress = (context: Context) => context?.type === 'press'
const isFlick = (speed: number) => speed > 2.5

/*清除 用来判断是否是 press的定时器*/
const clearContextTimeout = (context: Context) => context?.timeoutHandler && clearTimeout(context.timeoutHandler)

export function enableGesture(element: HTMLElement = document.body) {
  const MOUSE_SYMBOL = Symbol('mouse')
  /*
  *  用于储存当前实践 过程状态
  * */
  const contexts: Map<symbol | number, Context> = new Map()
  /* 自定义事件派发 */
  const dispatchEvent = ({ name, context, point }: {name: EventName, context: Context, point: MouseEvent | Touch }) => {
    const event = new CustomEvent(name)

    element.dispatchEvent(Object.assign(event, {
      startX: context.startX,
      startY: context.startY,
      clientX: point.clientX,
      clientY: point.clientY,
      gestureType: context.type,
    }) as GestureEvent)
  }
  /*
  *  禁用一些默认事件
  * */
  window.addEventListener('contextmenu', (e: MouseEvent) => {
    e.preventDefault()
  })

  document.addEventListener('selectstart', (e: Event) => {
    e.preventDefault()
  })

  document.addEventListener('dblclick', (e: Event) => {
    e.stopPropagation()
    e.preventDefault()
  })

  document.addEventListener('touchmove', (e: TouchEvent) => {
    e.preventDefault()
  }, {passive: false})

  /*
  *  PC：mousedown、mousemove、mouseup事件处理
  * */

  /*
  *  document.ontouchstart： PC端默认为 undefined，移动端默认为: null
  *
  * 在移动端禁用 鼠标事件
  * */
  if (document.ontouchstart !== null) {
    element.addEventListener('mousedown', (e: MouseEvent) => {
      e.preventDefault()
      contexts.set(MOUSE_SYMBOL, Object.create(null) as Context)
      start(e, contexts.get(MOUSE_SYMBOL)!)
      const mousemove = (e: MouseEvent) => {
        move(e, contexts.get(MOUSE_SYMBOL)!)
      }
      const mouseup = (e: MouseEvent) => {
        end(e, contexts.get(MOUSE_SYMBOL)!)
        document.removeEventListener('mousemove', mousemove)
        document.removeEventListener('mouseup', mouseup)
        contexts.delete(MOUSE_SYMBOL)
      }

      document.addEventListener('mousemove', mousemove)
      document.addEventListener('mouseup', mouseup)

      /*
      *  处理 mouseup 失效问题，原因可能是触发了 mouseleave 或者 drag 事件，
      * */
      function cancel(e: MouseEvent) {
        e.stopPropagation()
        e.preventDefault()
        mouseup(e)
        document.removeEventListener('mouseleave', cancel)
        document.removeEventListener('drag', cancel)
      }

      document.addEventListener('drag', cancel)
      document.addEventListener('mouseleave', cancel)
    })
  }

  /*
  *  移动端 touche 事件：touchstart、touchmove、touchend、touchcancel
  * */
  document.addEventListener('touchstart', (e: TouchEvent) => {

    for (const touch of e.changedTouches) {
      contexts.set(touch.identifier, Object.create(null) as Context)
      start(touch, contexts.get(touch.identifier)!)
    }
  })

  document.addEventListener('touchmove', (e: TouchEvent) => {
    for (const touch of e.changedTouches) {
      move(touch, contexts.get(touch.identifier)!)
    }
  })

  document.addEventListener('touchend', (e: TouchEvent) => {
    for (const touch of e.changedTouches) {
      end(touch, contexts.get(touch.identifier)!)
      contexts.delete(touch.identifier)
    }
  })

  document.addEventListener('touchcancel', (e: TouchEvent) => {
    for (const touch of e.changedTouches) {
      cancel(touch, contexts.get(touch.identifier)!)
      contexts.delete(touch.identifier)
    }
  })

  /*
*  统一处理 PC 和 移动端， start, move, end 事件
* */
  const start = (point: MouseEvent | Touch, context: Context) => {
    // 保存初始坐标
    context.startX = point.clientX
    context.startY = point.clientY
    // 开始处理判断 isTap,isPan,isPress
    context.type = 'tap'
    // moves 清空
    context.moves = []
    /*
    *  如果时间大于 0.5s 且 不是 滑动isPan状态，就判定为 press长按
    * */
    context.timeoutHandler = setTimeout(() => {
      clearContextTimeout(context)
      if (isPan(context)) {
        return
      }
      context.type = 'press'
      dispatchEvent({
        name: 'pressstart',
        context,
        point
      })
    }, 500)

    // 派发事件
    dispatchEvent({
      name: 'tapstart',
      context,
      point
    })
  }

  const move = (point: MouseEvent | Touch, context: Context) => {
    const dx = point.clientX - context.startX,
        dy = point.clientY - context.startY

    /*
    *  当移动的直线距离大于 10 px是， 判定为 pan 滑动类型
    * */
    if (dx ** 2 + dy ** 2 > 100 && !isPan(context)) {
      if (isPress(context)) {
        dispatchEvent({
          name: 'presscancel',
          context,
          point
        })
      }
      context.type = 'pan'
      clearContextTimeout(context)

      dispatchEvent({
        name: 'panstart',
        context,
        point
      })
    }
    if (!isPan(context)) {
      return
    }
    dispatchEvent({
      name: 'panmove',
      context,
      point
    })
    /*
    *  保存move事件触发
    * */
    const t = Date.now()
    context.moves.push({dx, dy, t})
    // 只保存 事件触发时间 小于300ms内的
    context.moves = context.moves.filter(move => t - move.t < 300)
  }

  const end = (point: MouseEvent | Touch, context: Context) => {
    clearContextTimeout(context)

    // 点击
    if (isTap(context)) {
      dispatchEvent({
        name: 'tapend',
        context,
        point
      })
    }

    // 滑动：普通滑动、快速滑动
    if (isPan(context)) {
      const moveRecord = context.moves[0]
      if (moveRecord) {
        const dx = point.clientX - context.startX,
            dy = point.clientY - context.startY
        // 计算速度
        const speed = Math.sqrt((dx - moveRecord.dx) ** 2 + (dy - moveRecord.dy) ** 2) / (Date.now() - moveRecord.t)
        if (isFlick(speed)) { // 快速滑动
          context.type = 'flick'
        }
      }
      dispatchEvent({
        name: 'panend',
        context,
        point
      })
    }

    // 常按
    if (isPress(context)) {
      dispatchEvent({
        name: 'pressend',
        context,
        point
      })
    }

  }

  const cancel = (point: MouseEvent | Touch, context: Context) => {
    dispatchEvent({
      name: 'cancel',
      context,
      point
    })
    clearContextTimeout(context)
  }

  return element as GestureElement
}


