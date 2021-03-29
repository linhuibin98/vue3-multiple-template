<template>
  <div>
    <p>a: {{ obj.a.c }}</p>
    <p ref="root">double c: {{ obj.a.c }}</p>
    <input ref="inputRef1" type="range" min="0" max="255" />
    <input ref="inputRef2" type="range" min="0" max="255" />
    <input ref="inputRef3" type="range" min="0" max="255" />
  </div>
  <div ref="bg" class="bg" :style="`width: 150px; height: 150px; background-color: rgb(${obj.r}, ${obj.g}, ${obj.b});`"></div>
  <button @click="handler.onClick">+1</button>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { reactive, effect } from '@/utils/proxy'

export default defineComponent({
  setup() {
    const root = ref({} as HTMLDivElement)
    const bg = ref({} as HTMLDivElement)
    const inputRef1 = ref({} as HTMLInputElement)
    const inputRef2 = ref({} as HTMLInputElement)
    const inputRef3= ref({} as HTMLInputElement)
    const obj = reactive({
      a: {
        c: 6
      },
      r: 100,
      g: 100,
      b: 100
    })
    window.obj = obj
    effect(() => {
      const val = String(obj.a.c * 2)
      root.value.innerText = val
    })

    const handler = {
      onClick: () => {
        obj.a.c += 1
      }
    }

    effect(() => inputRef1.value.value = obj.r)
    effect(() => inputRef2.value.value = obj.g)
    effect(() => inputRef3.value.value = obj.b)

    effect(() => {
      const bgColor = `rgb(${obj.r}, ${obj.g}, ${obj.b})`
      bg.value.style?.backgroundColor = bgColor
    })

    onMounted(() => {
      inputRef1.value.addEventListener('input', (e: InputEvent) => {
        obj.r = e.target.value
      })
      inputRef2.value.addEventListener('input', (e: InputEvent) => {
        obj.g = e.target.value
      })
      inputRef3.value.addEventListener('input', (e: InputEvent) => {
        obj.b = e.target.value
      })
    })

    return {
      obj,
      handler,
      root,
      inputRef1,
      inputRef2,
      inputRef3,
      bg
    };
  },
});
</script>

<style lang="scss" scoped>
</style>