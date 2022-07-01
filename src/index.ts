import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import { loadingDirective } from "@/direcctives/loading"

import 'element-plus/dist/index.css'

import { router } from './router'

const app = createApp(App)
app.use(router).use(ElementPlus)
app.directive(loadingDirective.name, loadingDirective)
app.mount('#app')
