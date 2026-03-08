import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/acesso',
    name: 'login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: {
      layout: 'login',
    },
  },
  {
    path: '/clubes',
    name: 'clubs',
    component: () => import('@/views/clubs/ClubsView.vue'),
    meta: {
      layout: 'page',
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
