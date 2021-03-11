import { createApp } from 'vue'
import Index from './views/Index.vue'

import { router } from './router'

const app = createApp(Index)
app.use(router)
app.mount('#app')