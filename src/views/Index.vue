<template>
  <div class="route">
    <router-link to="/home">首页</router-link>
    <router-link to="/drag">拖拽</router-link>
    <router-link to="/about">关于</router-link>
    <router-link to="/proxy">Proxy</router-link>
    <router-link to="/gesture">Gesture</router-link>
    <router-link to="/animation">Animation</router-link>
    <router-link to="/carousel">Carousel</router-link>
  </div>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: "Index",
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.route {
  > a {
    & + a {
      padding-left: 20px;
    }
  }
}
</style>