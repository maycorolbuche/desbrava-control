<template>
  <v-card flat>
    <v-tabs v-model="tab" color="primary">
      <v-tab value="classes">Classes</v-tab>
      <v-tab value="honors">Especialidades</v-tab>
    </v-tabs>

    <v-divider />

    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="classes">
        <v-list>
          <v-skeleton-loader :loading="loading" type="list-item-two-line">
            <v-list-item
              v-for="itemclass in data.classes"
              :key="itemclass.id"
              :active="itemclass.progress.status !== 'completed'"
              :color="
                itemclass.progress.status == 'in_progress'
                  ? 'warning'
                  : itemclass.progress.status == 'completed'
                    ? 'success'
                    : 'error'
              "
              v-show="itemclass?.pivot?.status !== 'pending'"
              @click="setClass(itemclass)"
            >
              <v-list-item-title>
                {{ itemclass.label }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ itemclass.progress.completed }} de {{ itemclass.progress.total }} requisitos
              </v-list-item-subtitle>

              <template v-slot:append>
                <v-progress-circular
                  :model-value="itemclass.progress.percent"
                  :color="
                    itemclass.progress.status == 'in_progress'
                      ? 'warning'
                      : itemclass.progress.status == 'completed'
                        ? 'success'
                        : 'error'
                  "
                  class="ms-3"
                >
                  <template v-slot:default="{ value }">
                    <small>{{ Math.round(value) }}</small>
                  </template>
                </v-progress-circular>
              </template>
            </v-list-item>
          </v-skeleton-loader>
        </v-list>
      </v-tabs-window-item>
      <v-tabs-window-item value="honors">
        <v-list>
          <v-skeleton-loader :loading="loading" type="list-item-two-line">
            <v-list-item
              v-for="honor in data.honors"
              :key="honor.id"
              :active="honor.pivot?.status !== 'completed'"
              :color="honor?.pivot?.status == 'started' ? 'warning' : 'success'"
              v-show="honor?.pivot?.status !== 'pending'"
              @click="setHonor(honor)"
            >
              <v-list-item-title>
                {{ honor.name }}
                <small>({{ honor.code }})</small>
              </v-list-item-title>
              <v-list-item-subtitle>
                {{
                  honor?.pivot?.date
                    ? new Date(honor.pivot.date + 'T00:00:00').toLocaleDateString('pt-BR')
                    : ''
                }}
              </v-list-item-subtitle>

              <template v-slot:append>
                <v-icon v-if="honor.pivot?.status == 'completed'" color="success"
                  >mdi-check-circle</v-icon
                >
                <v-icon v-else-if="honor.pivot?.status == 'started'">
                  mdi-check-circle-outline
                </v-icon>
                <v-icon v-else>mdi-checkbox-blank-circle-outline</v-icon>
              </template>
            </v-list-item>
          </v-skeleton-loader>
        </v-list>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>

  <v-dialog v-model="show_honor" max-width="400" persistent scrollable>
    <v-card>
      <v-toolbar
        :color="
          honor?.pivot?.status == 'completed'
            ? 'success'
            : honor?.pivot?.status == 'started'
              ? 'warning'
              : 'error'
        "
      >
        <v-toolbar-title> {{ honor.name }} ({{ honor.code }}) </v-toolbar-title>

        <v-btn icon="mdi-close" @click="show_honor = false"></v-btn>
      </v-toolbar>

      <v-card-text>
        <strong>Status:</strong>
        {{
          honor?.pivot?.status == 'completed'
            ? 'Completo'
            : honor?.pivot?.status == 'started'
              ? 'Iniciado'
              : 'Pendente'
        }}
        <br />
        <strong>Data:</strong>
        {{
          honor?.pivot?.date
            ? new Date(honor.pivot.date + 'T00:00:00').toLocaleDateString('pt-BR')
            : ''
        }}
        <br />
        <strong>Observações:</strong>
        {{ honor?.pivot?.notes }}
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-dialog v-model="show_class" max-width="400" persistent scrollable>
    <v-card>
      <v-toolbar :color="itemclass?.color">
        <v-toolbar-title>{{ itemclass.label }}</v-toolbar-title>

        <v-btn icon="mdi-close" @click="show_class = false"></v-btn>
      </v-toolbar>

      <v-card-text class="ma-0 pa-0">
        <v-expansion-panels
          v-model="panels"
          variant="accordion"
          static
          multiple
          class="ma-0 pa-0"
          :rounded="0"
        >
          <v-expansion-panel
            v-for="category in itemclass?.categories"
            :key="category.id"
            class="ma-0 pa-0"
          >
            <v-expansion-panel-title>
              {{ category.name }}
              <v-chip
                size="x-small"
                class="mx-2"
                :color="
                  category.progress.status == 'completed'
                    ? 'success'
                    : category.progress.status == 'in_progress'
                      ? 'warning'
                      : 'error'
                "
              >
                {{ category.progress.percent.toFixed(0) }}%
              </v-chip>
            </v-expansion-panel-title>

            <v-expansion-panel-text class="ma-0 pa-0">
              <v-list class="pa-0 ma-0">
                <v-list-item
                  v-for="item in category.items"
                  :key="item.id"
                  class="pa-0 ma-0 py-1 px-4"
                  @click="selectItemClass(item)"
                >
                  <v-list-item-title style="text-wrap: auto; font-size: 12px" class="pa-0 ma-0">
                    <ol class="ma-0 px-5 pe-0" :start="item.number">
                      <li>
                        <span v-html="itemText(item.description)"></span>
                        <v-chip
                          size="x-small"
                          class="ms-2"
                          :color="
                            item?.progress?.status == 'completed'
                              ? 'success'
                              : item?.progress?.status == 'started'
                                ? 'warning'
                                : 'error'
                          "
                        >
                          {{
                            item?.progress?.status == 'completed'
                              ? 'Completo'
                              : item?.progress?.status == 'started'
                                ? 'Iniciado'
                                : 'Pendente'
                          }}
                        </v-chip>
                      </li>
                    </ol>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>

      <v-card-actions class="d-flex flex-column align-items-start pa-0">
        <small>
          {{ itemclass.progress.completed }} de {{ itemclass.progress.total }} requisitos ({{
            itemclass.progress.percent.toFixed(0)
          }}%)
        </small>
        <v-progress-linear v-model="itemclass.progress.percent" color="success" />
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="show_item" max-width="400" persistent scrollable>
    <v-card>
      <v-toolbar
        :color="
          selected_item?.progress?.status == 'completed'
            ? 'success'
            : selected_item?.progress?.status == 'started'
              ? 'warning'
              : 'error'
        "
      >
        <v-toolbar-title>{{ selected_item.category.name }}</v-toolbar-title>

        <v-btn icon="mdi-close" @click="show_item = false"></v-btn>
      </v-toolbar>

      <v-card-text>
        <strong>Status:</strong>
        {{
          selected_item?.progress?.status == 'completed'
            ? 'Completo'
            : selected_item?.progress?.status == 'started'
              ? 'Iniciado'
              : 'Pendente'
        }}
        <br />
        <strong>Data:</strong>
        {{
          selected_item?.progress?.date
            ? new Date(selected_item?.progress?.date + 'T00:00:00').toLocaleDateString('pt-BR')
            : ''
        }}
        <br />
        <strong>Observações:</strong>
        {{ selected_item?.progress?.notes }}
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, toRef, onMounted, computed } from 'vue'

import UsersForm from '@/components/data/UsersForm.vue'
import Alert from '@/helpers/Alert'
import Api from '@/services/Api'
import Dialog from '@/helpers/Dialog'
import Text from '@/helpers/Text'

const props = defineProps({
  user_id: { type: [Number, String], required: true },
})
const user_id = toRef(props, 'user_id')

const tab = ref('classes')
const show_honor = ref(false)
const show_class = ref(false)
const show_item = ref(false)
const honor = ref({})
const itemclass = ref({})
const panels = ref([])
const selected_item = ref(null)

const loading = ref(false)
const data = toRef({})

async function loadData() {
  loading.value = true
  const res = await Api.get('users/' + user_id.value, { with_progress: 'yes' })
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

function setHonor(honor_data) {
  honor.value = honor_data
  show_honor.value = true
}

function setClass(class_data) {
  itemclass.value = class_data
  show_class.value = true
}

function selectItemClass(item) {
  selected_item.value = item
  show_item.value = true
}

function itemText(text) {
  return Text.beauty(text)
}

onMounted(() => {
  loadData()
})
</script>
