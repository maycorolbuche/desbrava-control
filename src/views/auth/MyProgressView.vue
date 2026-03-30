<template>
  <Page title="Meu Progresso" :prev-route="{ name: 'profile' }">
    <Progress :user_id="user.id" />
  </Page>
</template>

<script setup>
import { computed } from 'vue'

import Page from '@/components/Page.vue'
import Progress from '@/components/data/Progress.vue'

import { userStore } from '@/stores/userStore'

const user_store = computed(() => {
  return userStore()
})

const user = computed(() => {
  return user_store.value?.user
})
</script>
