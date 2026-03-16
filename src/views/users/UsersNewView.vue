<template>
  <Page title="Novo Usuário" :back="back" :prev-route="{ name: 'users' }">
    <UsersForm class="pt-3" @save="save" />
  </Page>
</template>

<script setup>
import { toRef } from 'vue'

import Page from '@/components/Page.vue'
import UsersForm from '@/components/data/UsersForm.vue'

const back = toRef(false)

function save(data) {
  back.value = true
}
</script>
