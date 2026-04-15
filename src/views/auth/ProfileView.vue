<template>
  <Page title="Meu Perfil" :prev-route="{ name: 'home' }">
    <v-list>
      <v-list-item :title="user?.name" :subtitle="user?.role?.name">
        <template v-slot:prepend>
          <v-avatar color="primary" size="large">
            <span class="text-headline-small">{{ user?.initials }}</span>
          </v-avatar>
        </template>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list>
      <v-list-item color="primary" :to="{ name: 'profile-data' }">
        <template v-slot:prepend>
          <v-icon icon="mdi-card-account-details-outline"></v-icon>
        </template>
        <v-list-item-title>Meus Dados</v-list-item-title>
      </v-list-item>

      <v-list-item color="primary" :to="{ name: 'change-password' }">
        <template v-slot:prepend>
          <v-icon icon="mdi-key"></v-icon>
        </template>
        <v-list-item-title>Alterar Senha</v-list-item-title>
      </v-list-item>

      <v-list-item v-if="user?.role?.code == 'user'" color="primary" :to="{ name: 'my-progress' }">
        <template v-slot:prepend>
          <v-icon icon="mdi-progress-check"></v-icon>
        </template>
        <v-list-item-title>Meu Progresso</v-list-item-title>
      </v-list-item>

      <v-divider />

      <v-list-item color="primary" :to="{ name: 'terms' }">
        <template v-slot:prepend>
          <v-icon icon="mdi-file-document-outline"></v-icon>
        </template>

        <v-list-item-title>Termos de Uso</v-list-item-title>
      </v-list-item>
    </v-list>
  </Page>
</template>

<script setup>
import { computed } from 'vue'

import Page from '@/components/Page.vue'
import { userStore } from '@/stores/userStore'

const user_store = computed(() => {
  return userStore()
})

const user = computed(() => {
  return user_store.value?.user
})
</script>
