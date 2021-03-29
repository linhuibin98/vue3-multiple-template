<template>
  <div class="gesture">
    <div ref="areaRef" class="gesture-area"></div>
    <div ref="areaRef2" class="gesture-area2"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { enableGesture } from '@/utils/gesture'
import type { GestureEvent } from "@/utils/gesture";

export default defineComponent({
  setup() {
    const areaRef = ref({} as HTMLDivElement)
    const areaRef2 = ref({} as HTMLDivElement)
    const position: Map<object, {
      x: number,
      y: number,
      startX: number,
      startY: number
    }> = new Map()
    onMounted(() => {
      const areaEl = areaRef.value
      areaEl.addEventListener('panstart', (e: GestureEvent) => {
        console.log('panstart', e)
        if (!position.has(areaEl)) {
          position.set(areaEl, {
            x: 0,
            y: 0,
            startX: 0,
            startY: 0
          })
        }
        position.get(areaEl).startX = e.clientX
        position.get(areaEl).startY = e.clientY
      })
      areaEl.addEventListener('panmove', (e: GestureEvent) => {
        console.log('panmove', e)
        const dx = e.clientX - position.get(areaEl).startX
        const dy = e.clientY - position.get(areaEl).startY
        areaEl.style.transform = `translate(${position.get(areaEl).x + dx}px, ${position.get(areaEl).y+dy}px)`
      })
      areaEl.addEventListener('panend', (e: GestureEvent) => {
        console.log('panend', e)
        position.get(areaEl).x = e.clientX - position.get(areaEl).startX + position.get(areaEl).x
        position.get(areaEl).y = e.clientY - position.get(areaEl).startY + position.get(areaEl).y
        areaEl.style.transform = `translate(${position.get(areaEl).x}px, ${position.get(areaEl).y}px)`
      })
      enableGesture(areaEl)

      const areaEl2 = areaRef2.value
      areaEl2.addEventListener('panstart', (e: GestureEvent) => {
        console.log('panstart', e)
        if (!position.has(areaEl2)) {
          position.set(areaEl2, {
            x: 0,
            y: 0,
            startX: 0,
            startY: 0
          })
        }
        position.get(areaEl2).startX = e.clientX
        position.get(areaEl2).startY = e.clientY
      })
      areaEl2.addEventListener('panmove', (e: GestureEvent) => {
        console.log('panmove', e)
        const dx = e.clientX - position.get(areaEl2).startX
        const dy = e.clientY - position.get(areaEl2).startY
        areaEl2.style.transform = `translate(${position.get(areaEl2).x + dx}px, ${position.get(areaEl2).y+dy}px)`
      })
      areaEl2.addEventListener('panend', (e: GestureEvent) => {
        console.log('panend', e)
        position.get(areaEl2).x = e.clientX - position.get(areaEl2).startX + position.get(areaEl2).x
        position.get(areaEl2).y = e.clientY - position.get(areaEl2).startY + position.get(areaEl2).y
        areaEl2.style.transform = `translate(${position.get(areaEl2).x}px, ${position.get(areaEl2).y}px)`
      })
      enableGesture(areaEl2)
    })
    return {
      areaRef,
      areaRef2
    }
  }
})
</script>

<style lang="scss">
.gesture {
  > .gesture-area {
    width: 50px;
    height: 50px;
    background-color: deepskyblue;
  }
  > .gesture-area2 {
    width: 50px;
    height: 50px;
    background-color: palevioletred;
  }
}
</style>
