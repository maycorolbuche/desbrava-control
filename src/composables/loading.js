import { ref } from 'vue'

const isLoading = ref(false)

export function useLoading() {
  const start = () => (isLoading.value = true)
  const stop = () => (isLoading.value = false)

  return { isLoading, start, stop }
}
