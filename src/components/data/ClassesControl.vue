<template>
  <v-card flat>
    <v-toolbar color="transparent" class="pa-4 pb-1">
      <SelectClass v-model="class_id" label="Classe" auto-select />
    </v-toolbar>

    <v-divider />

    <v-sheet class="ma-3">Escolha o requisito para ser trabalhado:</v-sheet>

    <v-skeleton-loader v-if="loading" type="image" />
    <v-expansion-panels v-else v-model="panels" variant="accordion" static multiple>
      <v-expansion-panel
        v-for="category in data?.categories"
        :key="category.id"
        :color="data.color"
      >
        <v-expansion-panel-title>
          {{ category.name }}
        </v-expansion-panel-title>

        <v-expansion-panel-text>
          <v-list class="pa-0 ma-0">
            <v-list-item
              v-for="item in category.items"
              :key="item.id"
              class="pa-0 ma-0 py-1 px-4"
              @click="selectItem(category, item)"
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
                  v-if="resume(item.id).total > 0"
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
          </v-list>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>

  <v-dialog v-model="show_item" max-width="400" persistent scrollable>
    <v-card>
      <v-toolbar :color="data.color">
        <v-toolbar-title>
          {{ selected_category?.name }}
        </v-toolbar-title>

        <v-btn icon="mdi-close" @click="deselectItem()"></v-btn>
      </v-toolbar>

      <v-card-text>
        <v-sheet class="d-flex w-100">
          <div class="font-weight-bold pe-2">{{ selected_item?.number }}.</div>
          <div>
            <span v-html="itemText(selected_item?.description)"></span>
          </div>
        </v-sheet>

        <ClassesControlItem
          v-if="resume(selected_item?.id).total > 0"
          :item-id="selected_item?.id"
          @save="loadData(true)"
        />
      </v-card-text>

      <template v-slot:actions>
        <v-sheet
          v-if="resume(selected_item?.id).total > 0"
          class="d-flex align-center mx-auto w-100"
        >
          <v-progress-linear
            :model-value="resume(selected_item?.id).percent"
            :color="resume(selected_item?.id).color"
            height="15"
          />
          <small class="ms-2">{{ Math.round(resume(selected_item?.id).percent) }}%</small>
        </v-sheet>
      </template>
    </v-card>
  </v-dialog>
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
const show_item = ref(false)

watch(
  () => class_id.value,
  () => {
    loadData()
  },
)

function itemText(text) {
  return Text.beauty(text)
}

function selectItem(category, item) {
  selected_category.value = category
  selected_item.value = item
  show_item.value = true
}
function deselectItem() {
  show_item.value = false
  setTimeout(function () {
    selected_category.value = null
    selected_item.value = null
  }, 500)
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
    if (!persistent) {
      panels.value = data.value?.categories?.map((_, index) => index)
    }
  }
  loading.value = false
}

function resume(id) {
  console.log('data', data.value)
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
