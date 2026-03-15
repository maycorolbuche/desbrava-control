<template>
  <v-card flat>
    <v-toolbar color="transparent">
      <v-toolbar-title text="Lista de Distritos"></v-toolbar-title>

      <template v-slot:append>
        <v-btn icon="mdi-sort"></v-btn>
        <v-btn icon="mdi-filter-settings-outline"></v-btn>
        <v-btn icon="mdi-magnify"></v-btn>
      </template>
    </v-toolbar>

    <v-divider />

    <v-list>
      <v-skeleton-loader :loading="loading" type="list-item-two-line">
        <v-list-item v-for="item in data" :key="item.id">
          <v-list-item-title>{{ item.name }}</v-list-item-title>

          <template v-slot:append>
            <v-list-item-action>
              <v-btn variant="flat" icon="mdi-dots-vertical"></v-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
      </v-skeleton-loader>
    </v-list>
  </v-card>
</template>

<script setup>
import { toRef, onMounted } from 'vue'

import Alert from '@/helpers/Alert'
import Api from '@/services/Api'

const loading = toRef(false)
const data = toRef({})

async function loadData() {
  loading.value = true
  const res = await Api.get('districts', {})
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
