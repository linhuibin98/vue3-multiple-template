<template>
  <div>
    <p>{{ msg }}</p>
    <label>
      Step:
      <input type="number" v-model="step" />
    </label>
    <div>{{ count }}</div>
    <button @click="setCount(step * 1)">点我+{{ step }}</button>
    <button @click="setCount(step * -1)">点我-{{ step }}</button>
    <br />
    <l-form :form="form" :rules="rules">
      <l-form-item :label="'姓名'" prop="name">
        <l-input v-model:value="form.name" />
        <template #error="{ errorTips }">
          <p style="color: red">{{ errorTips }}</p>
        </template>
      </l-form-item>
      <l-form-item :label="'手机号'" prop="phone">
        <l-input v-model:value="form.phone" />
        <template #error="{ errorTips }">
          <p style="color: green">{{ errorTips }}</p>
        </template>
      </l-form-item>
    </l-form>

    <div>{{ form.name }} ---- {{ form.phone }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, onMounted } from "vue";
import LForm from "@/components/form/index.vue";
import LFormItem from "./components/form-item/index.vue";
import LInput from "./components/input/index.vue";
import { MyPromise } from "./utils/MyPromise2"

function useCounter() {
  const count = ref(1);
  const setCount = (step: number) => {
    count.value += step;
  };

  return {
    count,
    setCount,
  };
}

const rules = {
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
};

export default defineComponent({
  name: "App",
  components: {
    LForm,
    LFormItem,
    LInput,
  },
  setup() {
    const { count, setCount } = useCounter();
    const step = ref(1);

    const form = reactive({
      name: "",
      phone: "",
    });

    /*
// 1
console.log(1)
      const promise = new MyPromise((resolve) => {
        console.log(2)
        setTimeout(() => {
          resolve(3)
        }, 2000)
        console.log(4)
        setTimeout(() => {
          console.log(6)
        }, 1000)
      }).then((res) => {
        console.log(res)
      }) 
      console.log(5)
    */

    onMounted(() => {
      const promise = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          reject(1)
        })
      })
      promise.then(res => {
        console.log('res', res)
      }).catch(err => {
        console.log('catch', err)
        return 2
      }).then(data => {
        console.log('data', data)
      })
    });

    return {
      step,
      count,
      setCount,
      msg: ref("hello world"),
      form,
      rules,
    };
  },
});
</script>

<style lang="scss" scoped>
p {
  font-weight: bold;
}
</style>