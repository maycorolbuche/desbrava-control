<template>
  <v-card flat>
    <v-toolbar color="transparent">
      <v-toolbar-title text="Lista de Usuários"></v-toolbar-title>

      <template v-slot:append>
        <v-btn icon="mdi-sort"></v-btn>
        <v-btn icon="mdi-filter-settings-outline"></v-btn>
        <v-btn icon="mdi-magnify"></v-btn>
      </template>
    </v-toolbar>

    <v-divider />

    <v-list>
      <v-skeleton-loader :loading="loading" type="list-item-two-line">
        <v-list-item
          v-for="item in data"
          :key="item.id"
          :base-color="deleting.includes(item.id) ? 'error' : ''"
          :class="{ blur: deleting.includes(item.id) }"
          v-show="!deleted.includes(item.id)"
        >
          <v-list-item-title>{{ item.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.district?.name }}</v-list-item-subtitle>

          <template v-slot:append>
            <v-list-item-action>
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props" variant="flat" icon="mdi-dots-vertical"></v-btn>
                </template>
                <v-list>
                  <v-list-item
                    title="Alterar"
                    prepend-icon="mdi-pencil-outline"
                    @click="updateData(item)"
                  />

                  <v-divider />
                  <v-list-item
                    base-color="error"
                    title="Remover"
                    prepend-icon="mdi-trash-can-outline"
                    @click="deleteData(item.id)"
                  />
                </v-list>
              </v-menu>
            </v-list-item-action>
          </template>
        </v-list-item>
      </v-skeleton-loader>
    </v-list>
  </v-card>

  <v-bottom-sheet v-model="sheet">
    <v-card title="Alteração">
      <ClubsForm :data="updating" @save="saved" />
    </v-card>
  </v-bottom-sheet>
</template>

<script setup>
import { ref, toRef, onMounted } from 'vue'

import ClubsForm from '@/components/data/ClubsForm.vue'
import Alert from '@/helpers/Alert'
import Api from '@/services/Api'
import Dialog from '@/helpers/Dialog'

const loading = ref(false)
const deleting = toRef([])
const deleted = toRef([])
const updating = toRef({})
const data = toRef({})
const sheet = ref(false)

async function loadData() {
  loading.value = true
  const res = await Api.get('users', {})
  if (!res.success) {
    Alert.error(res.error)
  } else {
    if (res.message) {
      Alert.success(res.message)
    }
    data.value = res.data
  }
  loading.value = false
}

async function deleteData(id) {
  Dialog.confirm('Deseja remover este registro?', async (btn) => {
    if (btn === 'yes') {
      deleting.value.push(id)
      const res = await Api.delete('users/' + id, {})
      if (!res.success) {
        Alert.error(res.error)
      } else {
        if (res.message) {
          Alert.success(res.message)
        }
        deleted.value.push(id)
      }
      deleting.value = deleting.value.filter((i) => i !== id)
    }
  })
}

async function updateData(item) {
  updating.value = item
  sheet.value = true
}

function saved(payload) {
  updating.value = {}
  const index = data.value.findIndex((i) => i.id === payload.id)
  if (index !== -1) {
    data.value[index] = payload
  }
  console.log('payload', payload)
  sheet.value = false
}

onMounted(() => {
  loadData()
})
</script>
