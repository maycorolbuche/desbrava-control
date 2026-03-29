<template>
  <Page title="Meus Dados" :prev-route="{ name: 'profile' }">
    <v-card flat>
      <v-card-text>
        <Input v-model="data.name" label="Nome" :loading="loading" />
        <Input v-model="data.email" label="E-mail" :loading="loading" />
        <Input v-model="data.username" label="Nome de Usuário" :loading="loading" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click="save"
          color="success"
          text="Salvar"
          prepend-icon="mdi-content-save-outline"
          :disabled="loading"
        />
      </v-card-actions>
    </v-card>
  </Page>
</template>

<script setup>
import { ref, toRef, onMounted } from 'vue'

import Page from '@/components/Page.vue'
import Alert from '@/helpers/Alert'
import Api from '@/services/Api'

import Input from '@/components/inputs/Input.vue'

const loading = ref(false)
const data = toRef({})

async function loadData() {
  loading.value = true
  const res = await Api.get('auth/me', {})
  if (!res.success) {
    Alert.error(res.error)
  } else {
    if (res.message) {
      Alert.success(res.message)
    }
    data.value = res.user
  }
  loading.value = false
}

async function save() {
  loading.value = true

  let res
  res = await Api.post('auth/me', data.value)

  if (!res.success) {
    Alert.error(res.error)
  } else {
    await Api.refresh()
    if (res.message) {
      Alert.success(res.message)
    }
    data.value = res.user
  }
  loading.value = false
}

onMounted(() => {
  loadData()
})
</script>
