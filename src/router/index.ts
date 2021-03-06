import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Index from '@/views/Index.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Index,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/About.vue'),
      },
      {
        path: 'drag',
        name: 'Drag',
        component: () => import('@/views/Drag'),
      },
      {
        path: 'proxy',
        name: 'Proxy',
        component: () => import('@/views/Proxy.vue'),
      },
      {
        path: 'gesture',
        name: 'Gesture',
        component: () => import('@/views/Gesture.vue'),
      },
      {
        path: 'animation',
        name: 'animation',
        component: () => import('@/views/Animation.vue'),
      },
      {
        path: 'carousel',
        name: 'Carousel',
        component: () => import('@/views/Carousel.vue'),
      },
      {
        path: 'upload',
        name: 'Upload',
        component: () => import('@/views/Upload.vue'),
      },
      {
        path: 'directive',
        name: 'Directive',
        component: () => import('@/views/Directive.vue'),
      },
      {
        path: 'slot',
        name: 'DynamicSlot',
        component: () => import('@/views/DynamicSlot.vue'),
      },
      {
        path: 'lottie',
        name: 'Lottie',
        component: () => import('@/views/Lottie.vue'),
      },
    ],
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
