<template>
  <Page title="Alterar Senha" :prev-route="{ name: 'profile' }">
    <v-card flat>
      <v-card-text>
        <Password v-model="data.current_password" label="Senha Atual" :loading="loading" />
        <Password v-model="data.password" label="Nova Senha" :loading="loading" />
        <Password
          v-model="data.password_confirmation"
          label="Confirmar Nova Senha"
          :loading="loading"
        />
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
import { ref, toRef } from 'vue'

import Page from '@/components/Page.vue'
import Alert from '@/helpers/Alert'
import Api from '@/services/Api'

import Password from '@/components/inputs/Password.vue'

const loading = ref(false)
const data = toRef({})

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
  }
  loading.value = false
}
</script>
