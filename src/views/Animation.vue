<template>
  <div class="animation">
    <div ref="animateRef" class="animation-item"></div>
    <div ref="animateRef2" class="animation-item"></div>
  </div>
  <div class="ani-top">
    <button @click="pause">暂停</button>
    <button @click="resume">恢复</button>
    <button @click="newStart">EL2动画</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { Timeline, Animation, ColorAnimation } from "@/utils/animation";

export default defineComponent({
  setup() {
    const animateRef = ref({} as HTMLDivElement)
    const animateRef2 = ref({} as HTMLDivElement)
    const timeline = new Timeline()


    onMounted(() => {
      const animateEl = animateRef.value
      const animation = new Animation(
          animateEl.style,
          'transform',
          v => `translateX(${v}px)`,
          0,
          200,
          2000,
          0
      )

      timeline.add(animation)

      const colorAnimation = new ColorAnimation(
          animateEl.style,
          'backgroundColor',
          {
            r: 0,
            g: 0,
            b: 0,
            a: 1
          },
          {
            r: 255,
            g: 0,
            b: 0,
            a: 1
          },
          2000)
      timeline.add(colorAnimation)
      timeline.start()
    })

    const pause = () => timeline.pause()
    const resume = () => timeline.resume()
    const newStart = () => {
      const animation = new Animation(
          animateRef2.value.style,
          'transform',
          v => `translateX(${v}px)`,
          0,
          200,
          2000,
          0
      )
      timeline.add(animation)
    }
    return {
      animateRef,
      pause,
      resume,
      animateRef2,
      newStart
    }
  }
})
</script>

<style lang="scss" scoped>
.animation {
  .animation-item {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: deepskyblue;
  }
}
</style>
