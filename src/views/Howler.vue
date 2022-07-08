<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { AnimationItem } from 'lottie-web'
import lottie from 'lottie-web'
import { Howl } from 'howler'

// import lottieNormalData from '@/asset/img/normal.json'

const createAudio = (assetPath) => {
  const howl = new Howl({
    preload: true,
    src: [assetPath],
  })
  return Object.assign(howl, {
    setVolume(volume = 1) {
      howl.volume(volume)
    },
  })
}

let anim: AnimationItem | null = null
const bodymovin = ref<Element | null>(null)

const play = () => {
  if (!anim) return
  anim.play()
}

onMounted(() => {
  anim = lottie.loadAnimation({
    container: bodymovin.value!,
    loop: true,
    renderer: 'svg',
    autoplay: false,
    path: 'https://labs.nearpod.com/bodymovin/demo/mixstories/data.json',
    // assetsPath: 'http://127.0.0.1:3001/',
    // animationData: lottieNormalData,
    audioFactory: createAudio,
    name: 'Normal Animation',
  })
})
</script>

<template>
  <div class="howler">
    <div ref="bodymovin" class="anim" />
    <button @click="play">
      点击播放
    </button>
  </div>
</template>

<style lang="scss">
.anim {
    width: 518px;
    height: 434px;
    border-radius: 50px;
    overflow: hidden;
}
</style>
