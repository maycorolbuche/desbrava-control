import { inject } from 'vue'

export function definePage(options) {
  const setTitle = inject('setPageTitle')

  if (setTitle && options?.title) {
    setTitle(options.title)
  }
}
