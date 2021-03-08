<template>
  <div class="l-form-item">
    <label>
      <span v-if="label">{{ label }}</span>
      <slot></slot>
      <slot name="error" v-if="errorTips" v-bind="{errorTips}">
        <div>
          {{ errorTips }}
        </div>
      </slot>
    </label>
  </div>
</template>

<script>
import { ref, inject, onMounted } from 'vue'
import Schema from 'async-validator'
import { emitter } from '../../utils/emitter'

export default {
  props: {
    label: String,
    prop: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const errorTips = ref('')
    const formInj = inject('form')
    
    const validator = () => {
      const asyncValidator = new Schema(formInj.rules)
      asyncValidator.validate(formInj.form, (errors) => {
        if (errors) {
          const targetError = errors.find(item => item.field === props.prop)
          errorTips.value = targetError?.message || ''
          return
        }
        // 没有错误
        errorTips.value = ''
      })
    }

    onMounted(() => {
      emitter.on('change', validator)
    })

    return {
      errorTips
    }
  }
}
</script>

<style lang="scss" scoped>

</style>