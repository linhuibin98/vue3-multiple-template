<template>
  <div ref="containerRef" class="container"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { Carousel } from '@/utils/carousel'
import '@/utils/carousel/carousel.scss'

export default defineComponent({
  setup() {
    const containerRef = ref({} as HTMLDivElement)
    onMounted(() => {
      const carousel = new Carousel()

      carousel.data = [
        'https://static001.geekbang.org/resource/image/bd/2e/bddfad3dc8fb2f7c4942a0dc1286c92e.jpg',
        'https://static001.geekbang.org/resource/image/f7/f8/f7c1822abb4382896b9b4d3530b02ff8.jpg',
        'https://static001.geekbang.org/resource/image/fb/c0/fb4e210a483a7892433331082f5f09c0.jpg',
        'https://static001.geekbang.org/resource/image/b4/26/b4ff997b68f16f882c255aef8c833626.jpg'
      ]
      carousel.render(containerRef.value)
    })
    return {
      containerRef
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
