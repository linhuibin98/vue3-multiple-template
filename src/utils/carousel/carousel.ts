/*
*  轮播图设计
* Carousel

    state
        activeIndex
    property
        loop time imgList autoplay color
    attribute
        startIndex loop time imgList autoplay color
    children
        两种风格：有 imgList 可能就没有 children
        append remove add
    event
        change click hover swipe resize
    method
        next() prev() goto()
        play() stop() [有 autoplay 实际上不需要 play 和 stop]
    config
        setInterval
        setTimeout
        requestAnimationFrame
        mode: "useRAF" "useTimeout"

CarouselView
* */

import {enableGesture, GestureElement, GestureEvent} from '../gesture'
import {Animation, Timeline} from '../animation'
import Timeout = NodeJS.Timeout;

export class Carousel {
  root: null | GestureElement
  data: any[]
  timeline: Timeline

  constructor() {
    this.root = null
    this.data = []
    this.timeline = new Timeline()
  }

  /*
  *  渲染轮播
  * */
  render(node: string | HTMLElement = document.body) {
    this.root = document.createElement('div')
    this.root.classList.add('carousel')
    /*
    *  手势
    * */
    this.root.addEventListener('mousedown', ((e: MouseEvent) => {
      e.preventDefault()  // 可以阻止图片拖动
    }))
    enableGesture(this.root)

    for (const d of this.data) {
      const imgEl = document.createElement('img')
      imgEl.src = d
      this.root.appendChild(imgEl)
    }

    let current: number
    let currentItem = {} as HTMLImageElement
    let next = 0
    let nextItem = {} as HTMLImageElement
    let prev = 0
    let prevItem = {} as HTMLImageElement
    let timeoutID: Timeout | null = null
    let offset = 0
    const transformReg = /translateX\((-?\d+\.?\d+?)px\)/

    const setCurrent = (val: number) => {
      current = val
      currentItem = this.root!.children[current] as HTMLImageElement
      next = (current + 1) % this.data.length
      nextItem = this.root!.children[next] as HTMLImageElement
      prev = (current - 1 + this.data.length) % this.data.length
      prevItem = this.root!.children[prev] as HTMLImageElement
    }

    setCurrent(0)

    let currentOffset = 0
    let prevOffset = 0
    let nextOffset = 0
    this.root.addEventListener('start', (e: GestureEvent) => {
      this.timeline.reset()
      closeAutoPlay()
      console.log(prev, current, next)
      const {transform} = currentItem.style
      console.log('transform===', transform)
      console.log('transform.match(transformReg)', transform.match(transformReg))
      const currentTransformValue = parseFloat(transform.match(transformReg)?.[1] || '0')
      console.log('currentTransformValue', currentTransformValue)
      offset = currentTransformValue + 500 * current
      console.log('offset', offset)
      currentOffset = -500 * current + offset
      prevOffset = -500 - 500 * prev + offset
      nextOffset = 500 - 500 * next + offset
      console.log('currentOffset', currentOffset)
      console.log('prevOffset', prevOffset)
      console.log('nextOffset', nextOffset)
    })

    this.root.addEventListener('panmove', (e: GestureEvent) => {
      let dx = e.clientX - e.startX
      // 处理 滑动超过一屏
      if (dx > 500) {
        dx = 500
      } else if (-dx > 500) {
        dx = -500
      }
      currentItem.style.transform = `translateX(${currentOffset + dx}px)`
      prevItem.style.transform = `translateX(${prevOffset + dx}px)`
      nextItem.style.transform = `translateX(${nextOffset + dx}px)`
    })

    this.root.addEventListener('end', (e: GestureEvent) => {
      let direction = 0
      let dx = e.clientX - e.startX

      if (dx + offset > 500 / 3) { // 右滑
        direction = 1
      } else if (dx + offset < -500 / 3) {  // 左滑
        direction = -1
      }

      if (dx + offset > 500) {
        dx = 500 - offset
      } else if (dx + offset < -500) {
        dx = -500 - offset
      }

      console.log('direction', direction)
      this.timeline.start()

      const currentAnimation = new Animation(currentItem.style, 'transform', (v) => `translateX(${v}px)`, currentOffset + dx, -500 * current + 500 * direction, 300)
      const nextAnimation = new Animation(nextItem.style, 'transform', (v) => `translateX(${v}px)`, nextOffset + dx, -500 * next + 500 + 500 * direction, 300)
      const prevAnimation = new Animation(prevItem.style, 'transform', (v) => `translateX(${v}px)`, prevOffset + dx, -500 -500 * prev + 500 * direction, 300)
      this.timeline.add(currentAnimation)
      this.timeline.add(nextAnimation)
      this.timeline.add(prevAnimation)
      setCurrent((current - direction + this.data.length) % this.data.length)
      openAutoPlay()
    })

    /* 轮播 */
    this.timeline.start()

    const toNext = () => {

    }

    const toPrev = () => {

    }

    const nextPic = () => {
      const currentAnimation = new Animation(currentItem.style, 'transform', (v) => `translateX(${v}px)`, 0, -500 * current)
      const nextAnimation = new Animation(nextItem.style, 'transform', (v) => `translateX(${v}px)`, 0, 500 - 500 * next)

      this.timeline.add(currentAnimation)
      this.timeline.add(nextAnimation)

      /*
      *  将item移至 目标位置
      *   此时需要过渡动画
      * */
      setTimeout(() => {
        const currentAnimation = new Animation(currentItem.style, 'transform', (v) => `translateX(${v}px)`, -500 * current, -500 - 500 * current, 600)
        const nextAnimation = new Animation(nextItem.style, 'transform', (v) => `translateX(${v}px)`, 500 - 500 * next, -500 * next, 600)
        this.timeline.add(currentAnimation)
        this.timeline.add(nextAnimation)
        setCurrent(next)
      }, 16)
      timeoutID = setTimeout(nextPic, 3000)
    }
    const openAutoPlay = () => timeoutID === null && (timeoutID = setTimeout(nextPic, 3000))
    const closeAutoPlay = () => {
      timeoutID && clearTimeout(timeoutID)
      timeoutID = null
    }


    /* 挂载到指定元素 */
    let nodeEl: HTMLElement | null
    if (typeof node === 'string') {
      nodeEl = document.querySelector(node)
    } else {
      nodeEl = node
    }

    if (!nodeEl) {
      return
    }

    nodeEl.appendChild(this.root)
    openAutoPlay()
  }
}