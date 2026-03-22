<template>
  <v-card flat>
    <v-toolbar color="transparent" class="pa-4 pb-1">
      <SelectClass v-model="class_id" label="Classe" auto-select />
    </v-toolbar>

    <v-divider />

    <div class="ma-3">Escolha o requisito para ser trabalhado:</div>

    <v-skeleton-loader v-if="loading" type="image" />
    <v-expansion-panels v-else v-model="panels" variant="accordion" static multiple>
      <v-expansion-panel
        v-for="category in data?.categories"
        :key="category.id"
        :color="data.color"
        v-show="!selected_category || selected_category == category.id"
      >
        <v-expansion-panel-title>
          <template v-slot:actions v-if="selected_category">
            <v-icon icon="mdi-chevron-left"> </v-icon>
          </template>
          {{ category.name }}
        </v-expansion-panel-title>

        <v-expansion-panel-text>
          <v-list class="pa-0 ma-0">
            <template v-for="item in category.items" :key="item.id">
              <v-list-item
                v-if="!selected_item"
                class="pa-0 ma-0 py-1 px-4"
                @click="selectItem(category.id, item.id)"
              >
                <v-list-item-title style="text-wrap: auto">
                  <ol class="ma-0 px-5 pe-0" :start="item.number">
                    <li>
                      <span v-html="itemText(item.description)"></span>
                    </li>
                  </ol>
                </v-list-item-title>

                <template v-slot:append>
                  <v-progress-circular
                    :model-value="resume(item.id).percent"
                    :color="resume(item.id).color"
                    class="ms-3"
                  >
                    <template v-slot:default="{ value }">
                      <small>{{ Math.round(value) }} </small>
                    </template>
                  </v-progress-circular>
                </template>
              </v-list-item>

              <v-list-item v-else-if="selected_item == item.id" class="pa-0 ma-0 py-2 px-4">
                <v-list-item-title style="text-wrap: auto">
                  <ol class="ma-0 px-5 pe-0" :start="item.number">
                    <li>
                      <span v-html="itemText(item.description)"></span>
                    </li>
                  </ol>
                </v-list-item-title>
                <v-list-item-title>
                  <v-sheet class="d-flex align-center mx-auto">
                    <v-progress-linear
                      :model-value="resume(item.id).percent"
                      :color="resume(item.id).color"
                      height="15"
                    />
                    <small class="ms-2">{{ Math.round(resume(item.id).percent) }}%</small>
                  </v-sheet>
                </v-list-item-title>
                <div v-if="selected_item">
                  <ClassesControlItem :item-id="item.id" @save="loadData(true)" />
                </div>
              </v-list-item>
            </template>
          </v-list>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script setup>
import { ref, toRef, onMounted, watch } from 'vue'

import SelectClass from '@/components/inputs/SelectClass.vue'
import ClassesControlItem from '@/components/data/ClassesControlItem.vue'

import Text from '@/helpers/Text'
import Alert from '@/helpers/Alert'
import Api from '@/services/Api'

const panels = ref([])
const class_id = ref(null)
const loading = ref(false)
const data = toRef({})

const selected_category = ref(null)
const selected_item = ref(null)
const last_panels = ref([])

watch(
  () => class_id.value,
  () => {
    deselectItem([])
    loadData()
  },
)
watch(
  () => data.value?.categories,
  (val) => {
    if (val && !selected_category.value) {
      deselectItem()
    }
  },
  { immediate: true },
)
watch(
  () => panels.value,
  (val) => {
    if (selected_category.value) {
      deselectItem(last_panels.value)
    }
  },
  { immediate: true },
)

function itemText(text) {
  return Text.beauty(text)
}

function selectItem(category_id, item_id) {
  selected_category.value = category_id
  selected_item.value = item_id
  last_panels.value = panels.value
}
function deselectItem(select_panels) {
  selected_category.value = null
  selected_item.value = null
  if (select_panels) {
    panels.value = select_panels
  } else {
    panels.value = data.value?.categories.map((_, index) => index)
  }
}

async function loadData(persistent = false) {
  if (!class_id.value) {
    return
  }

  if (!persistent) {
    loading.value = true
  }
  const res = await Api.get('classes/' + class_id.value, {})
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

function resume(id) {
  const item = Object.values(data.value?.resume?.items).filter((class_item) => {
    return class_item.class_item_id == id
  })

  const total = data.value?.resume?.users_count ?? 0
  const completed =
    item.filter((st) => {
      return st.status == 'completed'
    })[0]?.qtd ?? 0
  const started =
    item.filter((st) => {
      return st.status == 'started'
    })[0]?.qtd ?? 0
  const percent = ((completed + started / 2) / total) * 100

  return {
    total,
    completed,
    started,
    pending: total - completed - started,
    percent: percent,
    color: percent >= 100 ? 'success' : percent > 0 ? 'warning' : 'error',
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
ol li::marker {
  font-weight: bold;
}
</style>
<style>
.v-expansion-panel-text__wrapper {
  margin: 0;
  padding: 0;
}
</style>
