import { createRouter, createWebHistory } from 'vue-router'
import { useLayout } from 'vuetify/lib/composables/layout'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: {
      layout: 'login',
    },
  },
  {
    path: '/wallpaper',
    name: 'wallpaper',
    component: () => import('@/views/WallpaperView.vue'),
    meta: {
      layout: 'blank',
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
