<template>
  <div ref="root">
    {{ val }}
  </div>
  <button @click="handler.onClick">+1</button>
</template>

<script land='ts'>
import { defineComponent, onMounted, ref } from "vue";
import { reactive, effect } from '@/utils/proxy'

export default defineComponent({
  setup() {
    const root = ref({})
    const obj = reactive({
      a: 10,
      b: 2
    })

    let val = 0

    window.obj= obj

    effect(() => root.value.innerText = obj.a * 2)

    const handler = {
      onClick: () => {
        obj.a += 1
      }
    }

    onMounted(() => {
      root.value
    })

    return {
      obj,
      handler,
      root,
      val
    };
  },
});
</script>

<style lang="scss" scoped>
</style>