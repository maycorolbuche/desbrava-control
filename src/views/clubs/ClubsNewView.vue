<template>
  <Page title="Novo Clube" :back="back" :prev-route="{ name: 'clubs' }">
    <ClubsForm class="pt-3" @save="save" />
  </Page>
</template>

<script setup>
import { toRef } from 'vue'

import Page from '@/components/Page.vue'
import ClubsForm from '@/components/data/ClubsForm.vue'

const back = toRef(false)

function save(data) {
  back.value = true
}
</script>
