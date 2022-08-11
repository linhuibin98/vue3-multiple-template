import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { routes } from '@vue-router/routes'
import App from './App.vue'
import { loadingDirective } from '@/direcctives/loading'

// element-plus css
import 'element-plus/dist/index.css'
// windi
import 'windi.css'

import { router } from '@/router'

console.log('routes', routes)

const app = createApp(App)
app.use(router).use(ElementPlus)
app.directive(loadingDirective.name, loadingDirective)
app.mount('#app')
