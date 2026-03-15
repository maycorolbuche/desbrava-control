<template>
  <v-card flat>
    <v-card-text>
      <v-text-field
        v-model="form.name"
        class="my-3"
        variant="outlined"
        label="Nome do Distrito:"
        color="info"
        hide-details
        :loading="loading"
        :disabled="loading"
      />
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        @click="save"
        color="info"
        text="Cadastrar"
        prepend-icon="mdi-plus"
        :disabled="loading"
      />
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref, toRef } from 'vue'
import { useRouter } from 'vue-router'
import Alert from '@/helpers/Alert'
import Api from '@/services/Api'

/* ------------------------ VARS ------------------------ */

const loading = toRef(false)
const form = toRef({})

const router = useRouter()
const emit = defineEmits(['save'])

/* ------------------------ METHODS ------------------------ */

async function save() {
  loading.value = true
  const res = await Api.post('districts', form.value)
  if (!res.success) {
    Alert.error(res.error)
  } else {
    if (res.message) {
      Alert.success(res.message)
    }
    emit('save', res.data)
  }
  loading.value = false
}
</script>
