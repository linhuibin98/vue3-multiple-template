<template>
  <div class="upload-page">
    <input type="file" id="upload" name="file" @change="onChange">
    <button class="up-btn" @click="handleUpload">上传</button>
    <p>总进度：<meter :value="uploadPercent" /> {{ parseInt(uploadPercent * 100) + '%' }}</p>
    <ul>
      <li v-for="item in data">
        <span>{{ item.hash }}</span>
        <span>大小：{{ item.chunk.size }}</span>
        <span><meter :value="item.percent"></meter>{{ parseInt(item.percent * 100) + '%' }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import {ref, computed} from 'vue'
import {request} from '@/utils/request'

const SIZE = 10 * 1024 * 1024; // 切片大小
const data = ref([]) // 保存切片文件

const fileInfo = ref<null | File>(null) // 保存文件信息

// 计算总上传进度
const uploadPercent = computed(() => {
  if (!fileInfo.value || !data.value.length) return 0;
  const loaded = data.value
      .map(chunkItem => chunkItem.chunk.size * chunkItem.percent)
      .reduce((prev, cur) => prev + cur)

  return loaded / fileInfo.value.size
})

const onChange = (e: InputEvent) => {
  console.log((e.target as any).files)
  const [file] = (e.target as any).files
  if (!file) {
    return
  }
  console.log('file.slice', file.slice(0, 100))
  fileInfo.value = file
}

/*
* 生成文件切片
* */
const createFileChunk = (file: File, size = SIZE) => {
  const fileChunkList = []
  let cur = 0
  while (cur < file.size) {
    fileChunkList.push({file: file.slice(cur, cur + SIZE)})
    cur += size
  }
  return fileChunkList
}

/*
*  上传切片
* */
const uploadChunks = async () => {
  // 处理上传
  const requestList = data.value.map((chunkItem) => {
    const {chunk, hash} = chunkItem
    const formData = new FormData()
    formData.append('chunk', chunk)
    formData.append('hash', hash)
    formData.append("filename", fileInfo.value.name);
    return {formData, chunkItem}
  }).map(async ({formData, chunkItem}) => {
    return request({
      url: "http://localhost:3000/upload",
      data: formData,
      onProgress: (e: ProgressEvent) => {
        chunkItem.percent = e.loaded / e.total
      }
    })
  })

  await Promise.all(requestList); // 并发切片
}

/*
*  点击上传， 处理切片
* */
const handleUpload = async () => {
  if (!fileInfo.value) return;
  // 切片
  const fileChunkList = createFileChunk(fileInfo.value)
  // 给每个切片添加 hash值
  data.value = fileChunkList.map(({ file }, index) => ({
    chunk: file,
    hash: fileInfo.value.name + '@@' + index, // 文件名 + 数组下标
    percent: 0          // 切片上传进度条
  }))
  // 上传
  await uploadChunks()
  // 发送完成，通知合并上传
  await mergeRequest()
}

/*
*  请求合并: 前端通知后端，发送完成，合并文件
* */
const mergeRequest = async () => {
  await request({
    url: "http://localhost:3000/merge",
    headers: {
      "content-type": "application/json"
    },
    data: JSON.stringify({
      filename: fileInfo.value.name,
      size: SIZE
    })
  })
}

</script>

<style lang="scss" scoped>
.upload-page {
  padding: 20px;
}
</style>
