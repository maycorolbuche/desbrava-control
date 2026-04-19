<template>
  <v-toolbar color="transparent">
    <v-toolbar-title :text="title"></v-toolbar-title>

    <template v-slot:append>
      <v-menu v-if="sortable.length > 0">
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-badge location="top right" color="red" dot :model-value="!!sortValue">
              <v-icon :icon="sortIcon" />
            </v-badge>
          </v-btn>
        </template>
        <v-list>
          <template v-for="item in sortItems" :key="item.key">
            <v-divider v-if="item.title === '-'" />
            <v-list-item
              v-else-if="item.key == '' || (item.key !== '' && sortable.includes(item.key))"
              :value="item.key"
              :active="sortValue === item.key"
              @click="updateSort(item.key)"
            >
              <template v-slot:prepend>
                <v-icon v-if="item.icon" :icon="item.icon"></v-icon>
              </template>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item>
          </template>
        </v-list>
      </v-menu>

      <v-bottom-sheet v-if="filterable.length > 0">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn v-bind="activatorProps" icon>
            <v-badge location="top right" color="red" dot :model-value="hasActiveFilters">
              <v-icon icon="mdi-filter-settings-outline" />
            </v-badge>
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            <span>Filtros</span>
            <v-btn
              variant="text"
              color="error"
              @click="clearAllFilters"
              :disabled="!hasActiveFilters"
            >
              Limpar tudo
            </v-btn>
          </v-card-title>
          <v-divider />
          <v-card-text>
            <template v-for="filter in filterable" :key="filter.key">
              <v-select
                v-model="filterValue[filter.key]"
                :label="filter.title"
                color="info"
                hide-details
                :items="filter.items"
                :item-title="filter.itemTitle || 'name'"
                :item-value="filter.itemValue || 'id'"
                clearable
                density="compact"
                variant="outlined"
                class="mb-4"
                multiple
                chips
                @update:model-value="updateFilter"
              >
                <template v-slot:selection="{ item, index }">
                  <v-chip v-if="index < 2">
                    <span>{{ item.title }}</span>
                  </v-chip>
                  <span v-if="index === 2" class="text-grey text-caption align-self-center">
                    +{{ filterValue[filter.key].length - 2 }}
                  </span>
                </template>
              </v-select>
            </template>
          </v-card-text>
        </v-card>
      </v-bottom-sheet>

      <v-btn v-if="searchable" icon :active="showSearch" @click="toogleSearch">
        <v-badge location="top right" color="red" dot :model-value="!!searchValue">
          <v-icon icon="mdi-magnify" />
        </v-badge>
      </v-btn>
    </template>
  </v-toolbar>

  <v-card-item>
    <v-text-field
      v-if="showSearch"
      v-model="searchValue"
      density="compact"
      variant="outlined"
      hide-details
      placeholder="Buscar..."
      prepend-inner-icon="mdi-magnify"
      append-inner-icon="mdi-close"
      @click:append-inner="clearSearch"
      @update:model-value="updateSearch"
    />
  </v-card-item>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  title: { type: String, default: '' },
  search: { type: String, default: '' },
  sort: { type: String, default: '' },
  filter: { type: Object, default: () => ({}) },
  searchable: { type: Boolean, default: false },
  sortable: { type: Array, default: [] },
  filterable: { type: Array, default: [] },
})

const emit = defineEmits(['update:search', 'update:sort', 'update:filter'])

// Estado local
const showSearch = ref(false)
const searchValue = ref(props.search)
const sortValue = ref(props.sort)
const filterValue = ref({ ...props.filter })

const sortItems = [
  {
    key: 'asc',
    icon: 'mdi-sort-ascending',
    title: 'Nome - Crescente',
  },
  {
    key: 'desc',
    icon: 'mdi-sort-descending',
    title: 'Nome - Decrescente',
  },
  { key: 'separator1', title: '-' },
  { key: '', icon: 'mdi-sort', title: 'Sem Ordenação' },
]
const sortIcon = computed(() => {
  const item = sortItems.find((i) => i.key === sortValue.value)
  return item ? item.icon : 'mdi-sort'
})

// Verifica se há algum filtro ativo
const hasActiveFilters = computed(() => {
  return Object.keys(filterValue.value).some((key) => {
    const value = filterValue.value[key]
    if (Array.isArray(value)) {
      return value.length > 0
    }
    return value !== null && value !== undefined && value !== ''
  })
})

// Abrir/Fechar busca
const toogleSearch = () => {
  showSearch.value = !showSearch.value
}

// Limpar busca
const clearSearch = () => {
  showSearch.value = false
  searchValue.value = ''
  emit('update:search', searchValue.value)
}

// Atualizar busca e emitir
const updateSearch = (value) => {
  emit('update:search', value)
}

// Atualizar sort e emitir
const updateSort = (value) => {
  sortValue.value = value
  emit('update:sort', value)
}

// Atualizar filtro e emitir
const updateFilter = () => {
  // Remove chaves com valores vazios/null/undefined/arrays vazios
  const cleanFilter = {}
  Object.keys(filterValue.value).forEach((key) => {
    const value = filterValue.value[key]
    if (value !== null && value !== undefined && value !== '') {
      // Se for array e estiver vazio, não inclui
      if (Array.isArray(value) && value.length === 0) {
        return
      }
      cleanFilter[key] = value
    }
  })
  emit('update:filter', cleanFilter)
}

// Limpar todos os filtros
const clearAllFilters = () => {
  // Reseta todos os valores do filtro
  Object.keys(filterValue.value).forEach((key) => {
    filterValue.value[key] = Array.isArray(filterValue.value[key]) ? [] : null
  })
  updateFilter()
}

// Sincronizar (caso seja alterada externamente)
watch(
  () => props.search,
  (newValue) => {
    if (searchValue.value !== newValue) {
      searchValue.value = newValue
    }
  },
)
watch(
  () => props.sort,
  (newValue) => {
    if (sortValue.value !== newValue) {
      sortValue.value = newValue
    }
  },
)
watch(
  () => props.filter,
  (newValue) => {
    if (JSON.stringify(filterValue.value) !== JSON.stringify(newValue)) {
      filterValue.value = { ...newValue }
    }
  },
  { deep: true },
)
</script>
