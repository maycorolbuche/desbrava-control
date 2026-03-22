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

    <v-divider class="mt-3" />

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
          <v-list-item-subtitle>
            {{
              item?.class_item?.date
                ? new Date(item.class_item.date + 'T00:00:00').toLocaleDateString('pt-BR')
                : ''
            }}
          </v-list-item-subtitle>

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
    <v-card
      :disabled="updating_ids.includes(updating.id)"
      :loading="updating_ids.includes(updating.id)"
    >
      <v-toolbar>
        <v-toolbar-title>{{ updating.name }}</v-toolbar-title>
        <v-btn icon="mdi-close" @click="sheet = false"></v-btn>
      </v-toolbar>
      <v-card-text>
        <DateInput
          label="Data"
          v-model="updating.class_item.date"
          @blur="save(updating.id, { date: updating.class_item.date }, true)"
        />
        <Textarea
          label="Anotações"
          v-model="updating.class_item.notes"
          @blur="save(updating.id, { notes: updating.class_item.notes }, true)"
        />

        <v-card v-if="updating?.honors_list?.length > 0" density="compact" class="ma-0 pa-0">
          <v-card-title class="ma-0 pa-0">
            <v-toolbar class="ma-0 pa-0" density="compact">
              <v-toolbar-title class="text-title-medium"> Especialidades </v-toolbar-title>
              <template v-slot:append>
                <v-btn icon="mdi-plus" @click="show_honors = true" />
              </template>
            </v-toolbar>
          </v-card-title>
          <v-card-text class="pt-2">
            <v-chip
              v-for="honor in user_honors_class"
              :key="honor.id"
              :color="honor.color"
              class="ma-1"
              @click="showHonor(honor)"
            >
              {{ honor.name }} ({{ honor.code }})
            </v-chip>
          </v-card-text>
        </v-card>
      </v-card-text>

      <v-card-subtitle>Status do Requisito</v-card-subtitle>
      <v-card-actions>
        <v-spacer />
        <v-btn
          prepend-icon="mdi-checkbox-blank-circle-outline"
          variant="tonal"
          color="error"
          @click="save(updating.id, { status: 'pending' })"
        >
          Pendente
        </v-btn>
        <v-btn
          prepend-icon="mdi-check-circle-outline"
          variant="tonal"
          color="warning"
          @click="save(updating.id, { status: 'started' })"
        >
          Iniciado
        </v-btn>
        <v-btn
          prepend-icon="mdi-check-circle"
          variant="tonal"
          color="success"
          @click="save(updating.id, { status: 'completed' })"
        >
          Concluído
        </v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-bottom-sheet>

  <v-dialog v-model="show_honors" max-width="400" persistent scrollable>
    <v-card
      :disabled="updating_ids.includes(updating.id)"
      :loading="updating_ids.includes(updating.id)"
    >
      <v-toolbar>
        <v-toolbar-title> Adicionar Especialidade </v-toolbar-title>

        <v-btn icon="mdi-close" @click="show_honors = false"></v-btn>
      </v-toolbar>

      <v-card-text>
        <v-list>
          <v-list-item
            v-for="honor in updating?.honors_list"
            :key="honor.id"
            @click="save_honor(updating.id, honor.id, { status: 'completed' })"
          >
            <v-list-item-title>{{ honor.name }} ({{ honor.code }})</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-dialog v-model="show_honor" max-width="400" persistent scrollable>
    <v-card
      :disabled="updating_ids.includes(updating.id)"
      :loading="updating_ids.includes(updating.id)"
    >
      <v-toolbar :color="updating_honor.color">
        <v-toolbar-title>{{ updating_honor.name }} ({{ updating_honor.code }})</v-toolbar-title>
        <v-btn icon="mdi-close" @click="show_honor = false"></v-btn>
      </v-toolbar>

      <v-card-text>
        <DateInput
          label="Data"
          v-model="updating_honor.date"
          @blur="save_honor(updating.id, updating_honor.id, { date: updating_honor.date }, true)"
        />
        <Textarea
          label="Anotações"
          v-model="updating_honor.notes"
          @blur="save_honor(updating.id, updating_honor.id, { notes: updating_honor.notes }, true)"
        />

        <v-sheet class="d-flex flex-wrap align-center justify-center" style="gap: 5px">
          <v-btn
            prepend-icon="mdi-checkbox-blank-circle-outline"
            variant="tonal"
            color="error"
            @click="save_honor_close(updating.id, updating_honor.id, { status: 'pending' })"
          >
            Pendente
          </v-btn>
          <v-btn
            prepend-icon="mdi-check-circle-outline"
            variant="tonal"
            color="warning"
            @click="save_honor_close(updating.id, updating_honor.id, { status: 'started' })"
          >
            Iniciado
          </v-btn>
          <v-btn
            prepend-icon="mdi-check-circle"
            variant="tonal"
            color="success"
            @click="save_honor_close(updating.id, updating_honor.id, { status: 'completed' })"
          >
            Concluído
          </v-btn>
        </v-sheet>
      </v-card-text>

      <template v-slot:actions>
        <v-spacer />
        <v-btn
          prepend-icon="mdi-trash-can-outline"
          variant="tonal"
          color="error"
          @click="save_honor_delete(updating.id, updating_honor.id, { status: 'deleted' })"
        >
          Remover
        </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, toRef, onMounted, watch, computed } from 'vue'

import DateInput from '@/components/inputs/Date.vue'
import Textarea from '@/components/inputs/Textarea.vue'
import Dialog from '@/helpers/Dialog'

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
const show_honors = ref(false)
const show_honor = ref(false)
const updating = toRef({})
const updating_ids = toRef([])
const updating_honor = toRef({})

/* ------------------------ COMPUTEDS ------------------------ */

const user_honors_class = computed(() => {
  const honors_class = updating.value?.honors_list
  const honors_user = updating.value?.class_item?.honors

  const honors_class_ids = new Set(honors_class.map((h) => h.id))
  const common = honors_user
    .filter((h) => honors_class_ids.has(h.id))
    .map((h) => {
      h.status = h['pivot']?.status
      h.date = h['pivot']?.date
      h.notes = h['pivot']?.notes

      h.color = h.status == 'completed' ? 'success' : h.status == 'started' ? 'warning' : 'error'
      return h
    })

  return common
})

/* ------------------------ METHODS ------------------------ */

async function loadData() {
  loading.value = true
  const res = await Api.get('classes/users', { class_item_id: itemId.value })
  if (!res.success) {
    Alert.error(res.error)
  } else {
    if (res.message) {
      //Alert.success(res.message)
    }
    data.value = res.data
  }
  loading.value = false
}

async function save(user_id, payload, persistent = false) {
  if (!persistent) {
    sheet.value = false
  }
  updating_ids.value.push(user_id)
  const res = await Api.post('classes/users', { user_id, class_item_id: itemId.value, ...payload })
  if (!res.success) {
    Alert.error(res.error)
  } else {
    if (res.message) {
      //Alert.success(res.message)
    }

    const index = data.value.findIndex((i) => i.id === user_id)
    if (index !== -1) {
      data.value[index].class_item = res.data
    }
    console.log('EMIT', { user_id, class_item_id: itemId.value, ...payload })
    emit('save', [])
  }
  updating_ids.value = updating_ids.value.filter((i) => i !== user_id)
}

async function save_honor_delete(user_id, honor_id, payload) {
  Dialog.confirm('Deseja remover esta especialidade?', async (btn) => {
    if (btn === 'yes') {
      save_honor(user_id, honor_id, payload)
    }
  })
}
async function save_honor_close(user_id, honor_id, payload) {
  await save_honor(user_id, honor_id, payload)
  show_honor.value = false
}
async function save_honor(user_id, honor_id, payload) {
  updating_ids.value.push(user_id)
  const res = await Api.post('honors/users', { user_id, honor_id, ...payload })
  if (!res.success) {
    Alert.error(res.error)
  } else {
    show_honors.value = false
    save(user_id, {}, true)
    let d = res.data
    if (d?.honor_id) {
      d.id = d.honor_id
      d.color =
        res.data.status == 'completed'
          ? 'success'
          : res.data.status == 'started'
            ? 'warning'
            : 'error'

      showHonor(d)
    } else {
      show_honor.value = false
    }
    return
  }
  updating_ids.value = updating_ids.value.filter((i) => i !== user_id)
}

function updateItem(item) {
  if (!item.class_item) {
    item.class_item = { date: null, notes: null }
  }
  updating.value = item
  sheet.value = true
}

function showHonor(honor) {
  updating_honor.value = honor
  show_honor.value = true
}

/* ------------------------ METHODOS ------------------------ */

onMounted(() => {
  loadData()
})
</script>
