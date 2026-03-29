import { defineStore } from 'pinia'
import Session from '@/helpers/Session'

export const userStore = defineStore('user', {
  state: () => ({
    user: null,
    role: null,
    permissions: null,
  }),

  actions: {
    load() {
      this.user = Session.get('user')
      this.role = this.user?.role
      this.permissions = this.role?.permissions
    },

    set(user) {
      Session.set('user', user)
      this.user = user
    },

    clear() {
      this.user = null
      this.role = null
      this.permissions = null
      Session.remove('user')
    },
  },
})
