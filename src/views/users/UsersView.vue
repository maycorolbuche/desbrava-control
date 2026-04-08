<template>
  <Page title="Membros" :prev-route="{ name: 'home' }">
    <template v-slot:actions>
      <v-btn :to="{ name: 'users.new' }" density="default" icon="mdi-plus" />
    </template>
    <Users />
  </Page>
</template>

<script setup>
import Page from '@/components/Page.vue'
import Users from '@/components/data/Users.vue'
</script>
