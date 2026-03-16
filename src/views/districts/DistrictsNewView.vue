<template>
  <Page title="Novo Distrito" :back="back" :prev-route="{ name: 'districts' }">
    <DistrictsForm class="pt-3" @save="save" />
  </Page>
</template>

<script setup>
import { toRef } from 'vue'

import Page from '@/components/Page.vue'
import DistrictsForm from '@/components/data/DistrictsForm.vue'

const back = toRef(false)

function save(data) {
  back.value = true
}
</script>
