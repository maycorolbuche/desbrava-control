<template>
  <Page title="Clubes" :prev-route="{ name: 'home' }">
    <template v-slot:actions>
      <v-btn :to="{ name: 'clubs.new' }" density="default" icon="mdi-plus" />
    </template>
    <Clubs />
  </Page>
</template>

<script setup>
import Page from '@/components/Page.vue'
import Clubs from '@/components/data/Clubs.vue'
</script>
