<script setup lang="ts">
import { computed, markRaw, nextTick, onMounted, reactive, ref } from 'vue'
import type { AnimationItem } from 'lottie-web'
import lottie from 'lottie-web'
import { Howl } from 'howler'

import lottieNormalData from '@/asset/lottie/normal.json'
import lottieLowData from '@/asset/lottie/low.json'
import lottieHighData from '@/asset/lottie/high.json'

const createAudio = (assetPath) => {
  const howl = new Howl({
    preload: true,
    volume: 1,
    src: [assetPath],
  })
  return Object.assign(howl, {
    setVolume(volume = 1) {
      howl.volume(volume)
    },
  })
}
const enum Current {
  normal = 0,
  low = 1,
  high = 2,
}
const current = ref(Current.normal)
const animMap = reactive({})
const animNormal = ref<Element | null>(null)
const animLow = ref<Element | null>(null)
const animHigh = ref<Element | null>(null)
const currentAnim = computed<AnimationItem | undefined>(() => {
  return animMap[current.value]
})

let lastTime = 0; const intervalTime = 150

const toggleStop = () => {
  if (!currentAnim.value || Date.now() - lastTime < intervalTime) return
  if (currentAnim.value.isPaused)
    currentAnim.value.play()

  else
    currentAnim.value.goToAndStop(0)

  lastTime = Date.now()
}

const togglePause = () => {
  if (!currentAnim.value || Date.now() - lastTime < intervalTime) return
  if (currentAnim.value.isPaused)
    currentAnim.value.play()

  else
    currentAnim.value.pause()

  lastTime = Date.now()
}

const change = async () => {
  if (!currentAnim.value || Date.now() - lastTime < intervalTime) return
  currentAnim.value.goToAndStop(0)
  if (animMap[current.value + 1])
    current.value += 1

  else
    current.value = 0

  nextTick(() => {
    currentAnim.value.play()
    lastTime = Date.now()
  })
}

const createAnim = (opts) => {
  return lottie.loadAnimation({
    loop: false,
    renderer: 'svg',
    autoplay: false,
    assetsPath: '/asset/',
    audioFactory: createAudio,
    ...opts,
  })
}

onMounted(() => {
  animMap[Current.normal] = markRaw(createAnim({
    name: 'Normal Animation',
    container: animNormal.value!,
    animationData: lottieNormalData,
  }))

  animMap[Current.low] = markRaw(createAnim({
    name: 'Low Animation',
    container: animLow.value!,
    animationData: lottieLowData,
  }))

  animMap[Current.high] = markRaw(createAnim({
    name: 'High Animation',
    container: animHigh.value!,
    animationData: lottieHighData,
  }))
})

const remoteAnim = ref(null)

const onClickRemotePlay = (e) => {
  if (!remoteAnim.value) return
  remoteAnim.value.play()
  e.target.style.display = 'none'
}

onMounted(() => {
  remoteAnim.value = lottie.loadAnimation({
    name: 'Remote',
    container: document.getElementById('remote'),
    loop: false,
    renderer: 'svg',
    autoplay: false,
    path: 'https://labs.nearpod.com/bodymovin/demo/mixstories/data.json',
    audioFactory: createAudio,
  })
})
</script>

<template>
  <div class="howler w-full m-auto">
    <div v-show="current === Current.normal" ref="animNormal" class="anim w-full m-auto" />
    <div v-show="current === Current.low" ref="animLow" class="anim w-full m-auto" />
    <div v-show="current === Current.high" ref="animHigh" class="anim w-full m-auto" />
    <div class="p-10px flex justify-center items-center">
      <button class="py-10px px-20px text-#333 rounded-10px border-1px border-solid border-green-500 mr-10px" @click="toggleStop">
        开关
      </button>
      <button class="py-10px px-20px text-#333 rounded-10px border-1px border-solid border-green-500 mr-10px" @click="change">
        切换
      </button>
      <button class="py-10px px-20px text-#333 rounded-10px border-1px border-solid border-green-500 mr-10px" @click="togglePause">
        暂停
      </button>
    </div>
    <div class="mt-10px relative">
      <div id="remote" class="w-full h-500px" />
      <button class="absolute top-1/2 left-1/2 py-10px px-20px w-80px h-40px border rounded-10px border-green-800 transform -translate-x-1/2 -translate-y-1/2 text-block-200" @click="onClickRemotePlay">
        播放
      </button>
    </div>
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
