<template>
  <div>
    <p>{{ msg }}</p>
    <label>
      Step:
      <input type="number" v-model="step">
    </label>
    <div>{{ count }}</div>
    <button @click="setCount(step * 1)">点我+{{ step }}</button>
    <button @click="setCount(step * -1)">点我-{{ step }}</button>
    <br />
    <l-form :form="form" :rules="rules">
      <l-form-item :label="'姓名'" prop="name">
        <l-input v-model:value="form.name" />
        <template #error="{ errorTips }">
          <p style="color: red;">{{ errorTips }}</p>
        </template>
        
      </l-form-item>
      <l-form-item :label="'手机号'" prop="phone">
        <l-input v-model:value="form.phone" />
        <template #error="{ errorTips }">
          <p style="color: green;">{{ errorTips }}</p>
        </template>
      </l-form-item>
    </l-form>

    <div>
      {{ form.name }} ---- {{ form.phone }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, onMounted } from 'vue'
import LForm from '@/components/form/index.vue'
import LFormItem from './components/form-item/index.vue'
import LInput from './components/input/index.vue'
import { MyPromise } from './utils/MyPromise'

function useCounter() {
  const count = ref(1)
  const setCount = (step: number) => {
    count.value += step
  }

  return {
    count,
    setCount
  }
}

const rules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur'  }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur'  }
  ]
}

export default defineComponent({
  name: 'App',
  components: {
    LForm,
    LFormItem,
    LInput
  },
  setup() {
    const { count, setCount } = useCounter()
    const step = ref(1)

    const form = reactive({
      name: '',
      phone: ''
    })

    onMounted(() => {
      console.log('mounted=======')
      // 1
      // new MyPromise((resolve, reject) => {
      //   console.log(1)
      //   resolve('resolve1')
      //   reject('reject1')
      // }).then((res) => {
      //   console.log('then1 fulfilled', res)
      // }, err => {
      //   console.log('then1 rejected', err)
      // })
      // 2
      // const promise = new MyPromise((resolve, reject) => {
      //   setTimeout(() => {
      //     resolve(1)
      //   }, 2000)
      // })
      // promise.then((res) => {
      //   console.log('then1 fulfilled', res)
      // })
      // promise.then((res) => {
      //   console.log('then2 fulfilled', res)
      // })
      // 3
      // new MyPromise((resolve, reject) => {
      //   setTimeout(() => {
      //     reject(333)
      //   }, 1500)
      // }).catch(err => {
      //   console.log(err)
      // })
      // 4
      // @ts-ignore
      Promise.myAll = function (promiseArr: any[]) {
        const promises = Array.from(promiseArr)
        const num = promises.length
        let count = 0
        let resolvedValue = new Array(num)

        return new Promise((resolve, reject) =>{
          for (const item of promises) {
            Promise.resolve(item).then((res) => {
              resolvedValue[count++] = res
              if(count === num){
                resolve(resolvedValue)
              }
            }).catch((err) => {
              reject(err)
            })
          }
        })
      }
      // @ts-ignore
      // Promise.myAll([Promise.resolve(66), Promise.resolve(2), 3]).then((res) => {
      //   console.log('my all', res)
      // })

      Promise.all([Promise.resolve(66), new Promise(resolve => { setTimeout(() => { resolve(99) }, 2000) }), 3]).then((res) => {
        console.log('Promise.myAll', res)
      })

      MyPromise.all([MyPromise.resolve(66), new MyPromise(resolve => { setTimeout(() => { resolve(99) }, 2000) }), 3]).then((res) => {
        console.log('MyPromise.all', res)
      })
    })

    return {
      step,
      count,
      setCount,
      msg: ref('hello world'),
      form,
      rules,
    }
  }
})
</script>

<style lang="scss" scoped>
p {
  font-weight: bold;
}
</style>