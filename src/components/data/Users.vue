<template>
  <v-card flat>
    <Toolbar
      title="Lista de Membros"
      searchable
      :sortable="['asc', 'desc']"
      :filterable="filterable"
      v-model:search="search"
      v-model:sort="sort"
      v-model:filter="filter"
    />

    <v-divider />

    <v-list>
      <v-skeleton-loader :loading="loading" type="list-item-two-line">
        <v-list-item
          v-for="item in filteredData"
          :key="item.id"
          :base-color="deleting.includes(item.id) ? 'error' : ''"
          :class="{ blur: deleting.includes(item.id) }"
          v-show="!deleted.includes(item.id) && user?.user?.id !== item.id"
        >
          <v-list-item-title>{{ item.name }}</v-list-item-title>
          <v-list-item-subtitle v-if="user?.role?.code == 'instructor'" style="display: initial">
            <v-chip
              v-for="itemclass in item.classes"
              :key="itemclass.id"
              :color="itemclass.color"
              size="small"
            >
              {{ itemclass.name }}
            </v-chip>
          </v-list-item-subtitle>
          <v-list-item-subtitle
            v-if="user?.role?.code == 'club.secretary' || user?.role?.code == 'director'"
            style="display: initial"
          >
            {{ item?.role?.name }}
            <v-chip
              v-for="itemclass in item.classes"
              :key="itemclass.id"
              :color="itemclass.color"
              size="x-small"
            >
              {{ itemclass.name }}
            </v-chip>
          </v-list-item-subtitle>
          <v-list-item-subtitle v-if="user?.role?.code == 'district'" style="display: initial">
            {{ item?.club?.name }} | {{ item?.role?.name }}
          </v-list-item-subtitle>
          <v-list-item-subtitle v-else>
            {{ item?.club?.district?.name ?? item?.district?.name }} | {{ item?.club?.name }} |
            {{ item?.role?.name }}
          </v-list-item-subtitle>

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
                  <v-list-item
                    v-if="item?.role?.code === 'user'"
                    title="Ver Progresso"
                    prepend-icon="mdi-chart-line"
                    @click="showUserProgress(item)"
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
      <UsersForm :data="updating" @save="saved" />
    </v-card>
  </v-bottom-sheet>
</template>

<script setup>
import { ref, toRef, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

import { userStore } from '@/stores/userStore'
import UsersForm from '@/components/data/UsersForm.vue'
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
const router = useRouter()

const search = ref(null)
const sort = ref(null)
const filter = ref(null)

const user = computed(() => {
  return userStore()
})

const filteredData = computed(() => {
  let result = [...data.value] // Cria uma cópia do array original

  // Aplica o filtro de busca (se existir)
  if (search.value) {
    result = result.filter((item) => item.name.toLowerCase().includes(search.value.toLowerCase()))
  }

  // Aplica o filtro por role (se existir)
  if (filter.value && filter.value.role && filter.value.role.length > 0) {
    result = result.filter((item) => item.role && filter.value.role.includes(item.role.id))
  }

  // Aplica o filtro por clube (se existir)
  if (filter.value && filter.value.club && filter.value.club.length > 0) {
    result = result.filter((item) => item.club && filter.value.club.includes(item.club.id))
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

const filterable = computed(() => {
  if (user.value?.user?.role?.code == 'instructor') {
    return []
  }

  const filters = [{ key: 'role', title: 'Cargo', items: rolesData.value }]

  const allowedRoles = ['regional', 'regional.secretary', 'district']
  if (user.value?.user?.role?.code && allowedRoles.includes(user.value.user.role.code)) {
    filters.unshift({ key: 'club', title: 'Clube', items: clubsData.value })
  }

  return filters
})

watch(
  () => search.value,
  () => {
    Session.set('list-users-search', search.value)
  },
)
watch(
  () => sort.value,
  () => {
    Session.set('list-users-sort', sort.value)
  },
)
watch(
  () => filter.value,
  () => {
    Session.set('list-users-filter', filter.value)
  },
)

const rolesData = computed(() => {
  if (!data.value || !data.value.length) return []

  // Pega todos os roles distintos
  const rolesMap = new Map()

  data.value.forEach((item) => {
    if (item.role && item.role.id) {
      if (!rolesMap.has(item.role.id)) {
        rolesMap.set(item.role.id, {
          id: item.role.id,
          code: item.role.code,
          name: item.role.name,
          level: item.role.level,
        })
      }
    }
  })

  // Converte o Map para array e ordena por nível ou nome
  return Array.from(rolesMap.values()).sort((a, b) => b.level - a.level)
})
const clubsData = computed(() => {
  if (!data.value || !data.value.length) return []

  // Pega todos os clubs distintos
  const clubsMap = new Map()

  data.value.forEach((item) => {
    if (item.club && item.club.id) {
      if (!clubsMap.has(item.club.id)) {
        clubsMap.set(item.club.id, {
          id: item.club.id,
          name: item.club.name,
        })
      }
    }
  })

  // Converte o Map para array e ordena por nível ou nome
  return Array.from(clubsMap.values()).sort((a, b) => b.level - a.level)
})

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

function updateData(item) {
  updating.value = item
  sheet.value = true
}

function showUserProgress(item) {
  router.push({ name: 'user.progress', params: { id: item.id } })
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

  search.value = Session.get('list-users-search', null)
  sort.value = Session.get('list-users-sort', null)
  filter.value = Session.get('list-users-filter', null)
})
</script>
