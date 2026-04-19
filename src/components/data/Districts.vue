<template>
  <v-card flat>
    <Toolbar
      title="Lista de Distritos"
      searchable
      :sortable="['asc', 'desc']"
      v-model:search="search"
      v-model:sort="sort"
    />

    <v-divider />

    <v-list>
      <v-skeleton-loader :loading="loading" type="list-item-two-line">
        <v-list-item
          v-for="item in filteredData"
          :key="item.id"
          :base-color="deleting.includes(item.id) ? 'error' : ''"
          :class="{ blur: deleting.includes(item.id) }"
          v-show="!deleted.includes(item.id)"
        >
          <v-list-item-title>{{ item.name }}</v-list-item-title>

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
      <DistrictsForm :data="updating" @save="saved" />
    </v-card>
  </v-bottom-sheet>
</template>

<script setup>
import { ref, toRef, onMounted, watch, computed } from 'vue'

import DistrictsForm from '@/components/data/DistrictsForm.vue'
import Alert from '@/helpers/Alert'
import Api from '@/services/Api'
import Dialog from '@/helpers/Dialog'
import Toolbar from '@/components/Toolbar.vue'
import Session from '@/helpers/Session'

const loading = ref(false)
const deleting = toRef([])
const deleted = toRef([])
const updating = toRef({})
const data = toRef([])
const sheet = ref(false)

const search = ref(null)
const sort = ref(null)

const filteredData = computed(() => {
  let result = [...data.value] // Cria uma cópia do array original

  // Aplica o filtro de busca (se existir)
  if (search.value) {
    result = result.filter((item) => item.name.toLowerCase().includes(search.value.toLowerCase()))
  }

  // Aplica a ordenação (se existir)
  if (sort.value) {
    if (sort.value === 'asc') {
      result.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sort.value === 'desc') {
      result.sort((a, b) => b.name.localeCompare(a.name))
    }
  }

  return result
})

async function loadData() {
  loading.value = true
  const res = await Api.get('districts', {})
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
      const res = await Api.delete('districts/' + id, {})
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
  sheet.value = false
}

watch(
  () => search.value,
  () => {
    Session.set('list-districts-search', search.value)
  },
)
watch(
  () => sort.value,
  () => {
    Session.set('list-districts-sort', sort.value)
  },
)

onMounted(() => {
  loadData()

  search.value = Session.get('list-districts-search', null)
  sort.value = Session.get('list-districts-sort', null)
})
</script>
