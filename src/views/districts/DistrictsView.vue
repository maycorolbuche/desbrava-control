<template>
  <Page title="Distritos" :prev-route="{ name: 'home' }">
    <template v-slot:actions>
      <v-btn :to="{ name: 'districts.new' }" density="default" icon="mdi-plus" />
    </template>
    <Districts />
  </Page>
</template>

<script setup>
import Page from '@/components/Page.vue'
import Districts from '@/components/data/Districts.vue'
</script>
