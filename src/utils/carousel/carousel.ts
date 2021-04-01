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

export class Carousel {
  root: null | HTMLElement
  data: any[]
  constructor() {
    this.root = null
    this.data = []
  }
  /*
  *  渲染轮播
  * */
  render(node: string | HTMLElement = document.body) {
    this.root = document.createElement('div')
    this.root.classList.add('carousel')

    for (const d of this.data) {
      const imgEl = document.createElement('img')
      imgEl.src = d
      this.root.appendChild(imgEl)
    }

    let current = 0

    /* 轮播 */
    const nextPic = () => {
      const next = (current + 1) % this.data.length
      const currentItem = this.root!.children[current] as HTMLImageElement
      const nextItem = this.root!.children[next] as HTMLImageElement

      /*
      *  将item移至 正确位置（即：前后顺序关系）
      *   此时不需要过渡动画
      * */
      currentItem.style.transition = 'none'
      nextItem.style.transition = 'none'

      currentItem.style.transform = `translateX(${-100 * current}%)`
      /*
      *  主要是将下一项移至 当前项 后面
      * */
      nextItem.style.transform = `translateX(${100 - 100 * next}%)`

      /*
      *  将item移至 目标位置
      *   此时需要过渡动画
      * */
      setTimeout(() => {
        currentItem.style.transition = 'ease .5s'
        nextItem.style.transition = 'ease .5s'
        currentItem.style.transform = `translateX(${-100 - 100 * current}%)`
        nextItem.style.transform = `translateX(${-100 * next}%)`
        current = next
      }, 16)
      setTimeout(nextPic, 3000)
    }
    setTimeout(nextPic, 3000)

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
  }
}