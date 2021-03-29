<template>
  <div class="animation">
    <div ref="animateRef" class="animation-item"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { Timeline, Animation } from "@/utils/animation";

export default defineComponent({
  setup() {
    const animateRef = ref({} as HTMLDivElement)
    onMounted(() => {
      const animateEl = animateRef.value
      const animation = new Animation(
          animateEl.style,
          'transform',
          v => `translateX(${v}px)`,
          0,
          200,
          5000,
          5000
      )
      const timeline = new Timeline()
      timeline.add(animation)
      timeline.start()
    })
    return {
      animateRef
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
