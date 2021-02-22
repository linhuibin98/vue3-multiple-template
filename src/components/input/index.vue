<template>
  <div class="l-input">
    <input type="text" v-model="inputValue" @input="onInput" @change="onChange">
  </div>
</template>

<script lang='ts'>
import { ref, watch, onUpdated, onBeforeUpdate } from 'vue'
import { emitter } from '../../utils/emitter'
export default {
  props: {
    value: [String, Number],
  },
  emits: ['update:value'],
  setup (props, setupContext) {
    const inputValue = ref('')
    const setInputValue = (val: any) => {
      if (inputValue.value !== val) {
        inputValue.value = val === undefined ? '' : val
      }
    }
    watch(() => props.value, setInputValue, { immediate: true })
    const onInput = (e: any) => {
      setupContext.emit('update:value', e.target.value)
    }
    onBeforeUpdate(() => {
      console.log('input组件更新之前')
      console.log('props.value', props.value)
      console.log('inputValue', inputValue.value)
    })
    onUpdated(() => {
      console.log('input组件更新了')
    })

    const onChange = () => {
      emitter.emit('change')
    }

    return {
      inputValue,
      onInput,
      onChange
    }
  }
}
</script>

<style lang="scss" scoped>

</style>