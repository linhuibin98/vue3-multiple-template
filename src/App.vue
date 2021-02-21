<template>
  <div>
    <p>{{ msg }}</p>
    <label for="">
      Step:
      <input type="number" v-model="step">
    </label>
    <div>{{ count }}</div>
    <button @click="setCount(step * 1)">点我+{{ step }}</button>
    <button @click="setCount(step * -1)">点我-{{ step }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue'

function useCounter() {
  const count = ref(1)
  const setCount = (step: number) => {
    count.value += step
  }

  return {
    count,
    setCount
  }
}

export default defineComponent({
  name: 'App',
  setup() {
    const { count, setCount } = useCounter()
    const step = ref(1)
    return {
      step,
      count,
      setCount,
      msg: ref('hello world')
    }
  }
})
</script>

<style lang="scss" scoped>

</style>