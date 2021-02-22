<template>
  <div class='l-form'>
    <slot></slot>
  </div>
</template>

<script>
import { provide } from 'vue'
export default {
  props: {
    form: {
      props: Object,
      required: true
    },
    rules: {
      props: Object,
      required: true
    }
  },
  provide() {
    return {
      form: this
    }
  },
  setup () {

    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>