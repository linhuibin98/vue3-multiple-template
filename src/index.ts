import { createApp } from 'vue'
import App from './App.vue'
import './testJsx'
import { loadingDirective } from "@/direcctives/loading"

import { router } from './router'

const app = createApp(App)
app.use(router)
app.directive(loadingDirective.name, loadingDirective)
app.mount('#app')
