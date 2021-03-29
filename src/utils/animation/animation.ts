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
      if (t > delay) {
        object[property] = template(timingFunction(start, end)(t - delay))
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
  template: (v: string) => string
  start: number
  end: number
  duration: number
  delay: number
  timingFunction: any
  constructor(
      object: Record<any, any>,
      property: string,
      template: (v: string) => string,
      start: number,
      end: number,
      duration?: number,
      delay?: number,
      timingFunction?: string,
  ) {
    this.object = object
    this.property = property
    this.template = template
    this.start = start
    this.end = end
    this.duration = duration || 0
    this.delay = delay || 0
    this.timingFunction = timingFunction || ((start: number, end: number) => {
      return (t: number) => start + (t / this.duration) * (end - start)
    })
  }

}
