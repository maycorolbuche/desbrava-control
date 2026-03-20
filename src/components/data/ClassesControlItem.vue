<template>
  <v-card flat>
    <!--
    LISTA DE USUARIOS|{{ itemId }}|
    <a @click="save"> EMITA SALVAR </a>
    -->

    <!-- TODO: Implantar recursos -->
    <!--
    <v-toolbar color="transparent">
      <template v-slot:append>
        <v-btn icon="mdi-sort"></v-btn>
        <v-btn icon="mdi-filter-settings-outline"></v-btn>
        <v-btn icon="mdi-magnify"></v-btn>
      </template>
    </v-toolbar>
    -->

    <v-divider />

    <v-list>
      <v-skeleton-loader :loading="loading" type="list-item-two-line">
        <v-list-item
          v-for="item in data"
          :key="item.id"
          active
          :color="
            item.class_item?.status == 'completed'
              ? 'success'
              : item.class_item?.status == 'started'
                ? 'warning'
                : 'error'
          "
          class="my-1"
          @click="updateItem(item)"
        >
          <v-list-item-title>{{ item.name }}</v-list-item-title>

          <template v-slot:append>
            <v-progress-circular
              v-if="updating_ids.includes(item.id)"
              :color="
                item.class_item?.status == 'completed'
                  ? 'success'
                  : item.class_item?.status == 'started'
                    ? 'warning'
                    : 'error'
              "
              :size="21"
              :width="2"
              indeterminate
            />

            <v-icon v-else-if="item.class_item?.status == 'completed'">mdi-check-circle</v-icon>
            <v-icon v-else-if="item.class_item?.status == 'started'">
              mdi-check-circle-outline
            </v-icon>
            <v-icon v-else>mdi-checkbox-blank-circle-outline</v-icon>
          </template>
        </v-list-item>
      </v-skeleton-loader>
    </v-list>
  </v-card>

  <v-bottom-sheet v-model="sheet">
    <v-card v-if="updating_ids.includes(updating.id)">
      <v-card-title class="text-center">
        <v-progress-circular :size="32" indeterminate />
      </v-card-title>
    </v-card>
    <v-card v-else title="Marcação de Progresso">
      {{ updating_ids }}|
      <pre>{{ updating.class_item }}</pre>
      <v-card-actions>
        <v-btn @click="save(updating.id, { status: 'completed' })">Concluído</v-btn>
        <v-btn @click="save(updating.id, { status: 'started' })">INICIADO</v-btn>
        <v-btn @click="save(updating.id, { status: 'pending' })">pendente</v-btn>
      </v-card-actions>
    </v-card>
  </v-bottom-sheet>
</template>

<script setup>
import { ref, toRef, onMounted, watch } from 'vue'

import Alert from '@/helpers/Alert'
import Api from '@/services/Api'

/* ------------------------ VARS ------------------------ */

const props = defineProps({
  itemId: { type: Number },
})

const itemId = toRef(props, 'itemId')

const emit = defineEmits(['save'])

const loading = ref(false)
const data = toRef({})
const sheet = ref(false)
const updating = toRef({})
const updating_ids = toRef([])

/* ------------------------ METHODS ------------------------ */

async function loadData() {
  loading.value = true
  const res = await Api.get('classes/users', { class_item_id: itemId.value })
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

async function save(user_id, payload) {
  sheet.value = false
  updating_ids.value.push(user_id)
  const res = await Api.post('classes/users', { user_id, class_item_id: itemId.value, ...payload })
  if (!res.success) {
    Alert.error(res.error)
  } else {
    if (res.message) {
      Alert.success(res.message)
    }

    const index = data.value.findIndex((i) => i.id === user_id)
    if (index !== -1) {
      data.value[index].class_item = res.data
    }
  }
  updating_ids.value = updating_ids.value.filter((i) => i !== user_id)

  console.log('EMIT', { user_id, class_item_id: itemId.value, ...payload })
  emit('save', [])
}

function updateItem(item) {
  updating.value = item
  sheet.value = true
}

/* ------------------------ METHODOS ------------------------ */

onMounted(() => {
  loadData()
})
</script>
