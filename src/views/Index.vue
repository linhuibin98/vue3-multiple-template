<template>
  <div>
    <div>
      <router-link to="/home">首页</router-link>
      <router-link to="/drag">拖拽</router-link>
      <router-link to="/about">关于</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Index',
  setup () {
    

    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>