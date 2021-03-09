import { createApp } from 'vue'
import App from './App.vue'

import { curring } from '@/utils/curring'

function add(a: number, b: number, c: number) {
  return a + b + c
}

console.log('test curring', curring(add)(1)(2)(3))

createApp(App).mount('#app')