<script lang="ts">
import { defineComponent } from 'vue'
import virtualModule from 'virtual-module'
import RawMdiAlarmOff from '~icons/mdi/alarm-off'
import RawMdiAlarmOff2 from '~icons/mdi/alarm-off'
console.log('🚀 ~ file: Index.vue ~ line 22 ~ virtualModule', virtualModule)

export default defineComponent({
  name: 'Index',
  components: {
    VirtualModule: virtualModule,
    RawMdiAlarmOff,
    RawMdiAlarmOff2,
  },
  setup() {
    return {}
  },
})
</script>

<template>
  <div class="p-10px index">
    <div>
      <RawMdiAlarmOff />
      <RawMdiAlarmOff2 />
    </div>
    <VirtualModule class="virtual" />
    <div class="mt-10px mb-10px py-20px route">
      <router-link to="/home">
        Home
      </router-link>
      <router-link to="/drag">
        Drag
      </router-link>
      <router-link to="/about">
        About
      </router-link>
      <router-link to="/proxy">
        Proxy
      </router-link>
      <router-link to="/gesture">
        Gesture
      </router-link>
      <router-link to="/animation">
        Animation
      </router-link>
      <router-link to="/carousel">
        Carousel
      </router-link>
      <router-link to="/upload">
        Upload
      </router-link>
      <router-link to="/directive">
        Directive
      </router-link>
      <router-link to="/slot">
        Dynamic Slot Name
      </router-link>
      <router-link to="/lottie">
        Lottie Web
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
.route {
  > a {
    padding: 10px 20px;
    margin-bottom: 10px;
    display: inline-block;
    border: 1px solid deepskyblue;
    border-radius: 10px;
    & + a {
      margin-left: 20px;
    }
  }
}
</style>
