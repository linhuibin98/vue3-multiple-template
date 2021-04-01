/*
*  实现目标:
*     const animation = new Animation(element, property, start, end, duration, timingFunction)
*     const timeline = new Timeline()
*     timeline.add(animation)
*
*     timeline.start()
*     timeline.pause()
*     timeline.resume()
*     timeline.stop()
*
*   requestAnimationFrame
* */
import {linear} from './cubicBezier'
import { isUndef } from "./utils"

export type StatusType = 'pending' | 'playing' | 'paused'

export class Timeline {
  animations: Array<Animation | ColorAnimation>         // 动画队列
  startTime: number = 0             // start开始执行时间
  requestId: null | number = null   // requestAnimationFrame返回的 ID
  pauseTime: number = 0             // 暂停时的时间
  status: StatusType = 'pending'                   // 动画执行状态
  /*
  *  动画执行帧 requestAnimationFrame
  * */
  tick: () => void

  constructor() {
    this.animations = []
    this.tick = () => {
      const t = Date.now() - this.startTime
      const animations = this.animations.filter(ani => !ani.finished)
      for (const animation of animations) {
        const { object, property, delay, timingFunction, template, duration, addTime } = animation
        if (t < delay) { // delay 之后再执行 动画
          continue
        }
        // progression, 0~1之间的数，由timingFunction得到当前动画的进度
        let progression = timingFunction((t - delay - addTime!) / duration)
        if (t > duration + delay + addTime!) {
          progression = 1   // progression最大值为1
          animation.finished = true
        }
        // 计算当前帧，计算value
        const value = animation.valueFromProgression(progression)
        console.log(property, value)
        // @ts-ignore
        object[property] = template(value)
      }
      /*
      *  优化： 当animations 不为空时 才执行下一帧
      * */
      if (animations.length > 0) {
        this.requestId = requestAnimationFrame(this.tick)
      }
    }
  }

  /*
  *  动画开始
  * */
  start() {
    if (this.status !== 'pending') {
      return
    }
    this.status = 'playing'
    this.startTime = Date.now()
    this.tick()
  }

  /*
  *  暂停动画
  * */
  pause() {
    if (this.status !== 'playing') {
      return
    }
    if (this.requestId !== null) {
      this.status = 'paused'
      this.pauseTime = Date.now()
      cancelAnimationFrame(this.requestId)
    }
  }

  /*
  *  恢复动画
  * */
  resume() {
    if (this.status !== 'paused') {
      return
    }
    this.status = 'playing'
    // 恢复动画 计算时间差
    this.startTime += (Date.now() - this.pauseTime)
    this.tick()
  }
  /*
  *  重新执行动画
  * */
  restart() {
    if (this.status === 'playing') {
      this.pause()
    }
    this.animations = []
    this.requestId = null
    this.status = 'playing'
    this.startTime = Date.now()
    this.pauseTime = 0
    this.tick()
  }
  /*
  *  向动画队列中 添加动画
  * */
  add(animation: Animation | ColorAnimation, addTime?: number) {
    if (!animation) {
      return
    }
    animation.finished = false
    if (this.status === 'playing') {
      animation.addTime = isUndef(addTime) ? Date.now() - this.startTime : addTime
    } else {
      animation.addTime = isUndef(addTime) ? 0 : addTime
    }
    this.animations.push(animation)
  }
}

export class Animation {
  object: Record<any, any>
  property: string
  template: (v: number) => string
  start: number
  end: number
  duration: number
  delay: number
  timingFunction: (t: number) => number  // t 表示时间百分比
  finished?: boolean    // 是否完成动画，用于过滤动画队列，提升性能
  addTime?: number     // 保存 animation加入 timeline 的时间戳
  constructor(
      object: Record<any, any>,
      property: string,
      template: (v: number) => string,
      start: number,
      end: number,
      duration: number = 0,
      delay: number = 0,
      timingFunction: (t: number) => number = linear // t 表示时间百分比
  ) {
    this.object = object
    this.property = property
    this.template = template
    this.start = start
    this.end = end
    this.duration = duration
    this.delay = delay
    this.timingFunction = timingFunction
  }

  valueFromProgression(progression: number) {
    return this.start + progression * (this.end - this.start)
  }

}

export interface ColorType {
  r: number,
  g: number,
  b: number,
  a: number
}

export class ColorAnimation {
  object: Record<any, any>
  property: string
  template: (v: ColorType) => string
  start: ColorType
  end: ColorType
  duration: number
  delay: number
  timingFunction: (t: number) => number  // t 表示时间百分比
  finished?: boolean    // 是否完成动画，用于过滤动画队列，提升性能
  addTime?: number     // 保存 animation加入 timeline 的时间戳
  constructor(
      object: Record<any, any>,
      property: string,
      start: ColorType,
      end: ColorType,
      duration: number = 0,
      delay: number = 0,
      timingFunction: (t: number) => number = linear, // t 表示时间百分比
      template = (v: ColorType) => `rgba(${v.r}, ${v.g}, ${v.b}, ${v.a})`,
  ) {
    this.object = object
    this.property = property
    this.template = template
    this.start = start
    this.end = end
    this.duration = duration
    this.delay = delay
    this.timingFunction = timingFunction
  }

  valueFromProgression(progression: number) {
    return {
      r: this.start.r + progression * (this.end.r - this.start.r),
      g: this.start.g + progression * (this.end.g- this.start.g),
      b: this.start.b + progression * (this.end.b - this.start.b),
      a: this.start.a + progression * (this.end.a - this.start.a),
    }
  }
}

