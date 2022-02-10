<template>
  <div class="index">
    <div class="route">
      <router-link to="/home">Home</router-link>
      <router-link to="/drag">Drag</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/proxy">Proxy</router-link>
      <router-link to="/gesture">Gesture</router-link>
      <router-link to="/animation">Animation</router-link>
      <router-link to="/carousel">Carousel</router-link>
      <router-link to="/upload">Upload</router-link>
      <router-link to="/directive">Directive</router-link>
      <router-link to="/slot">Dynamic Slot Name</router-link>
    </div>
    <router-view></router-view>
  </div>
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