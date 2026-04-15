<template>
  <Page
    :title="'Acompanhar Progresso' + (data?.name ? ` | ${data.name}` : '')"
    :prev-route="{ name: 'users' }"
  >
    <v-card flat>
      <v-skeleton-loader v-if="loading" type="heading" />
      <v-card-title v-else>
        {{ data?.name }}
      </v-card-title>
      <Progress :user_id="id" />
    </v-card>
  </Page>
</template>

<script setup>
import { ref, toRef, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

import Page from '@/components/Page.vue'
import Progress from '@/components/data/Progress.vue'
import Alert from '@/helpers/Alert'
import Api from '@/services/Api'

const route = useRoute()
const id = computed(() => route.params.id)

const loading = ref(false)
const data = toRef({})

async function loadData() {
  loading.value = true
  const res = await Api.get(`users/${id.value}`, {})
  if (!res.success) {
    Alert.error(res.error)
  } else {
    if (res.message) {
      Alert.success(res.message)
    }
    data.value = res.data
  }
  loading.value = false
}

onMounted(() => {
  loadData()
})
</script>
