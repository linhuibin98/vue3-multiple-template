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
        name: 'Home',
        component: () => import('@/App.vue')
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/About.vue')
      },
      {
        path: 'drag',
        name: 'Drag',
        component: () => import('@/views/Drag.tsx')
      }
    ]
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})