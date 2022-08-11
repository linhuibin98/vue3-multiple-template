import type { Directive } from 'vue'
import imgSrc from '@/asset/img/loading.gif'

export type CustomDirectiveType = Directive & {
  name: string
}

export function creatPop() {
  const img = new Image()
  img.style.cssText = `
      width: 60px;
      height: 60px;
    `
  img.src = imgSrc
  const imgWrap = document.createElement('div')
  imgWrap.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.2);
      display: flex;
      justify-content: center;
      align-items: center;
    `
  imgWrap.appendChild(img)
  return imgWrap
}

function removeChild(parent: HTMLElement, child: HTMLElement) {
  if (parent.contains(child))
    parent.removeChild(child)
}

function hasPosition(el: HTMLElement & { [T: string]: string }) {
  const tempPosition = window.getComputedStyle(el).position
  if (!tempPosition || tempPosition === 'static') {
    el.style.position = 'relative'
    el.tempPosition = tempPosition
  }
}

const imgWrap = creatPop()

function appendImgWrap(el: any, value: boolean) {
  if (value) {
    hasPosition(el)
    el.appendChild(imgWrap)
  }
}

function removeImgWrap(el: HTMLElement & { [T: string]: string }) {
  removeChild(el, imgWrap)
  if (el.tempPosition)
    el.style.position = el.tempPosition
}

// 处理img arg
function handleArgImg(el: any, value: boolean) {

}

export const loadingDirective: CustomDirectiveType = {
  name: 'loading',
  mounted(el, binding, vNode) {
    console.log('binding', binding)
    console.log('vNode', vNode)
    const { value, arg, modifiers } = binding
    if (!el)
      return

    if (arg === 'img') {
      appendImgWrap(el, value)
      let isClosed = false
      const tempImg = new Image()
      function handleFN() {
        if (!isClosed) {
          removeImgWrap(el)
          isClosed = true
        }
      }
      tempImg.onload = () => {
        console.log('加载成功')
        handleFN()
      }
      tempImg.onerror = () => {
        console.log('加载失败')
        handleFN()
      }
      if (tempImg.complete) {
        console.log('加载完成')
        handleFN()
      }
      tempImg.src = value
    }
    else {
      appendImgWrap(el, value)
    }
  },
  updated(el, binding) {
    if (binding.value) {
      hasPosition(el)
      el.appendChild(imgWrap)
    }
    else {
      removeImgWrap(el)
    }
  },
}
