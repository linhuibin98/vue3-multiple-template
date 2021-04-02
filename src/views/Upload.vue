<template>
  <div class="upload-page">
    <input type="file" id="upload" name="file" @change="onChange">
    <button class="up-btn">上传</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { request } from '@/utils/request'
const fileInfo = ref(null)
const onChange = (e: InputEvent) => {
  console.log(e.target.files)
  const [file] = e.target.files
  if (!file) {
    return
  }
  fileInfo.value = file
}
</script>

<style lang="scss" scoped>
.upload-page {
  padding: 20px;
}
</style>
