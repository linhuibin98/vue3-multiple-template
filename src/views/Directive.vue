<template>
  <div class="directive-page">
    <div v-loading:img="'https://img0.baidu.com/it/u=733504811,3711083882&fm=26&fmt=auto&gp=0.jpg'" class="test-box"></div>
    <button @click="onClick">开启/关闭loading</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const showLoading = ref(true);
    const onClick = () => {
      showLoading.value = !showLoading.value
    }
    return {
      onClick,
      showLoading
    }
  }
})
</script>

<style lang="scss" scoped>
.test-box {
  width: 600px;
  height: 300px;
  background: red;
}
</style>
