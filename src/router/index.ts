import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Index from '@/views/index.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Index,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/App.vue')
      },
      {
        path: 'about',
        component: () => import('@/views/About.vue')
      }
    ]
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})