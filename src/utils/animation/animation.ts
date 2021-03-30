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
import { defaultTimingFunction } from './timingFunction'

export class Timeline {
  animations: Animation[]   // 动画队列
  startTime = 0 // start开始执行时间

  constructor() {
    this.animations = []
  }
  /*
  *  动画执行帧 requestAnimationFrame
  * */
  tick() {
    const t = Date.now() - this.startTime
    for (const animation of this.animations) {
      const { object, property, start, end, delay, timingFunction, template, duration } = animation
      if (t > duration + delay) {
        continue
      }
      // delay 之后再执行 动画
      if (t > delay) {
        // progression, 0~1之间的数，由timingFunction得到当前动画的进度
        const progression = timingFunction((t - delay) / duration)
        // 计算当前帧，计算value
        const value = start + progression * (end - start)
        object[property] = template(value)
      }
    }
    requestAnimationFrame(() => this.tick())
  }
  /*
  *  动画开始
  * */
  start() {
    this.startTime = Date.now()
    this.tick()
  }

  add(animation: Animation) {
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
  constructor(
      object: Record<any, any>,
      property: string,
      template: (v: number) => string,
      start: number,
      end: number,
      duration: number = 0,
      delay: number = 0,
      timingFunction: (t: number) => number = defaultTimingFunction.linear, // t 表示时间百分比
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

}
