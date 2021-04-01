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
        component: () => import('@/views/Home.vue')
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
      },
      {
        path: 'proxy',
        name: 'Proxy',
        component: () => import('@/views/Proxy.vue')
      },
      {
        path: 'gesture',
        name: 'Gesture',
        component: () => import('@/views/Gesture.vue')
      },
      {
        path: 'animation',
        name: 'animation',
        component: () => import('@/views/Animation.vue')
      },
      {
        path: 'carousel',
        name: 'Carousel',
        component: () => import('@/views/Carousel.vue')
      }
    ]
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})