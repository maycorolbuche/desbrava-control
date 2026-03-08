<template>
  <v-container>
    <v-text-field label="Login" variant="solo" />
    <v-text-field label="Senha" variant="solo" />
    <v-btn color="primary" block @click="login()">Entrar</v-btn>
  </v-container>
</template>

<script setup>
import AppButton from '@/components/AppButton.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

function login() {
  router.push({ name: 'home' })
}
</script>
