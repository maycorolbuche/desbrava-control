<template>
  <Page title="Controle de Classes" :prev-route="{ name: 'home' }">
    <ClassesControl />
  </Page>
</template>

<script setup>
import Page from '@/components/Page.vue'
import ClassesControl from '@/components/data/ClassesControl.vue'
</script>
