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
    let timeoutIDs: Timeout[] = []
    let startTransform = {
      current: 0,
      next: 0,
      prev: 0
    }
    const matrixReg = /matrix\(\d, \d, \d, \d, (-?\d+), \d\)/

    const setCurrent = (val: number) => {
      current = val
      currentItem = this.root!.children[current] as HTMLImageElement
      next = (current + 1) % this.data.length
      nextItem = this.root!.children[next] as HTMLImageElement
      prev = (current - 1 + this.data.length) % this.data.length
      prevItem = this.root!.children[prev] as HTMLImageElement
    }

    setCurrent(0)


    this.root.addEventListener('tapstart', (e: GestureEvent) => {
      closeAutoPlay()
      this.timeline.reset()
      this.timeline.start()
      console.log(prev, current, next)
      const prevAnimation = new Animation(prevItem.style, 'transform', (v) => `translateX(${v}px)`, 0, -500 * prev - 500)
      const currentAnimation = new Animation(currentItem.style, 'transform', (v) => `translateX(${v}px)`, 0, -500 * current)
      const nextAnimation = new Animation(nextItem.style, 'transform', (v) => `translateX(${v}px)`, 0, 500 - 500 * next)
      this.timeline.add(prevAnimation)
      this.timeline.add(currentAnimation)
      this.timeline.add(nextAnimation)
      setTimeout(() => {
        const { transform: currentTranValue } = getComputedStyle(currentItem)
        const { transform: nextTranValue } = getComputedStyle(nextItem)
        const { transform: prevTranValue } = getComputedStyle(prevItem)
        startTransform.prev = parseFloat(prevTranValue.match(matrixReg)?.[1] || '0')
        startTransform.current = parseFloat(currentTranValue.match(matrixReg)?.[1] || '0')
        startTransform.next = parseFloat(nextTranValue.match(matrixReg)?.[1] || '0')
      }, 16)
    })
    this.root.addEventListener('panmove', (e: GestureEvent) => {
      let dx = e.clientX - e.startX
      // 处理 滑动超过一屏
      if (dx > 500) {
        dx = 500
      } else if (-dx > 500) {
        dx = -500
      }
      prevItem.style.transform = `translateX(${dx + startTransform.prev}px)`
      currentItem.style.transform = `translateX(${dx + startTransform.current}px)`
      nextItem.style.transform = `translateX(${dx + startTransform.next}px)`
    })
    this.root.addEventListener('panend', (e: GestureEvent) => {
      let dx = e.clientX - e.startX
      // 处理 滑动超过一屏
      if (dx > 500) {
        dx = 500
      } else if (-dx > 500) {
        dx = -500
      }

      if (dx > 500 / 3) { // 右滑
        const currentAnimation = new Animation(currentItem.style, 'transform', (v) => `translateX(${v}px)`, dx + startTransform.current, -500 * current + 500, 300)
        const nextAnimation = new Animation(nextItem.style, 'transform', (v) => `translateX(${v}px)`, dx + startTransform.next, -500 * next + 500, 300)
        const prevAnimation = new Animation(prevItem.style, 'transform', (v) => `translateX(${v}px)`, dx + startTransform.prev, -500 * prev, 300)
        this.timeline.add(currentAnimation)
        this.timeline.add(nextAnimation)
        this.timeline.add(prevAnimation)
        setCurrent(prev)
      } else if (-dx > 500 / 3) {  // 左滑
        const currentAnimation = new Animation(currentItem.style, 'transform', (v) => `translateX(${v}px)`, dx + startTransform.current, -500 * current - 500, 300)
        const nextAnimation = new Animation(nextItem.style, 'transform', (v) => `translateX(${v}px)`, dx + startTransform.next, -500 * next, 300)
        const prevAnimation = new Animation(prevItem.style, 'transform', (v) => `translateX(${v}px)`, dx + startTransform.prev, -500 * prev - 500 - 500, 300)
        this.timeline.add(currentAnimation)
        this.timeline.add(nextAnimation)
        this.timeline.add(prevAnimation)
        setCurrent(next)
      } else {
        const currentAnimation = new Animation(currentItem.style, 'transform', (v) => `translateX(${v}px)`, dx + startTransform.current, -500 * current, 300)
        const nextAnimation = new Animation(nextItem.style, 'transform', (v) => `translateX(${v}px)`, dx + startTransform.next, -500 * next + 500, 300)
        const prevAnimation = new Animation(prevItem.style, 'transform', (v) => `translateX(${v}px)`, dx + startTransform.prev, -500 * prev - 500, 300)
        this.timeline.add(currentAnimation)
        this.timeline.add(nextAnimation)
        this.timeline.add(prevAnimation)
      }
      timeoutIDs.push(openAutoPlay())
    })
    // this.root.addEventListener('tapend', (e: GestureEvent) => {
    //   this.timeline.restart()
    //   openAutoPlay()
    // })

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
        const currentAnimation = new Animation(currentItem.style, 'transform', (v) => `translateX(${v}px)`,-500 * current, -500 - 500 * current, 1000)
        const nextAnimation = new Animation(nextItem.style, 'transform', (v) => `translateX(${v}px)`, 500 - 500 * next, -500 * next, 1000)
        this.timeline.add(currentAnimation)
        this.timeline.add(nextAnimation)
        setCurrent(next)
      }, 16)
      timeoutIDs.push(setTimeout(nextPic, 3000))
    }
    const openAutoPlay = () => timeoutIDs.length === 0 && setTimeout(nextPic, 3000)
    const closeAutoPlay = () => {
      timeoutIDs.forEach(id => clearTimeout(id))
      timeoutIDs = []
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
    // timeoutIDs.push(openAutoPlay())
  }
}