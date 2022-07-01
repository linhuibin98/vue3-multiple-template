<template>
  <div>
    <p>我是about页面</p>
    <p>{{ msg + name }}</p>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
const props = defineProps({
  name: {
    type: String,
    default: '~~~'
  }
})
const msg = ref('你好啊')
console.log('props', props)
console.log('msg', msg)
</script>

<style lang="scss" scoped>

</style>