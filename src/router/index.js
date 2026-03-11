import { createRouter, createWebHistory } from 'vue-router'
import Session from '@/helpers/Session'
import { userStore } from '@/stores/userStore'
import { useLoading } from '@/composables/loading'
import Api from '@/services/Api'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      requiresAuth: true,
    },
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

const { start, stop } = useLoading()

async function isAuthenticated() {
  const token = Session.get('token')
  if (!token) {
    return false
  }

  const user = await Api.user()

  const intervalRefresh = 60 * 15 // 15 minutos
  let ts = Session.get('updated-token', intervalRefresh)
  const elapsed = (Date.now() - ts) / 1000

  if (elapsed >= intervalRefresh || !user) {
    const res = await Api.refresh()
    if (!res.success) {
      return false
    }
  }

  return true
}

router.beforeEach(async (to, from) => {
  start()

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const loggedIn = await isAuthenticated()

  userStore().load()

  if (requiresAuth && !loggedIn) {
    stop()
    return { name: 'login' }
  }

  if (to.name === 'login' && loggedIn) {
    stop()
    return { name: 'home' }
  }

  stop()
  return true
})

export default router
