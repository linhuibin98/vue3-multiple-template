<template>
  <div class="animation">
    <div ref="animateRef" class="animation-item"></div>
  </div>
  <div class="ani-top">
    <button @click="pause">暂停</button>
    <button @click="resume">恢复</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { Timeline, Animation } from "@/utils/animation";

export default defineComponent({
  setup() {
    const animateRef = ref({} as HTMLDivElement)
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
      timeline.start()
    })

    const pause = () => timeline.pause()
    const resume = () => timeline.resume()
    return {
      animateRef,
      pause,
      resume
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
