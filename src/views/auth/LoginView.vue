<template>
  <v-container>
    <form>
      <v-text-field
        v-model="username"
        autocomplete="username"
        label="Login"
        variant="solo"
        prepend-inner-icon="mdi-account"
      />
      <v-text-field
        v-model="password"
        autocomplete="current-password"
        label="Senha"
        variant="solo"
        prepend-inner-icon="mdi-lock"
        :type="showPassword ? 'text' : 'password'"
        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append-inner="showPassword = !showPassword"
      />
      <v-btn color="primary" block @click="login()">Entrar</v-btn>
    </form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLoading } from '@/composables/loading'
import Alert from '@/helpers/Alert'
import Api from '@/services/Api'

/* ------------------------ VARS ------------------------ */

const { start, stop } = useLoading()
const router = useRouter()

const username = ref('')
const password = ref('')
const showPassword = ref(false)

/* ------------------------ METHODS ------------------------ */

async function login() {
  start()
  const res = await Api.login({
    username: username.value,
    password: password.value,
  })
  if (!res.success) {
    console.log('res', res)
    Alert.error(res.error)
    stop()
  } else {
    //Alert.success("Autenticação realizada com sucesso!");
    router.push({ name: 'home' })
  }
}
</script>
