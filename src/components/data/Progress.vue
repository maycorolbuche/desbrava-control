<template>
  <v-card flat>
    <v-tabs v-model="tab" color="primary">
      <v-tab value="classes">Classes</v-tab>
      <v-tab value="honors">Especialidades</v-tab>
    </v-tabs>

    <v-divider></v-divider>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="classes">
        <pre>
          {{ data }}
        </pre>
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
</template>

<script setup>
import { ref, toRef, onMounted, computed } from 'vue'

import UsersForm from '@/components/data/UsersForm.vue'
import Alert from '@/helpers/Alert'
import Api from '@/services/Api'
import Dialog from '@/helpers/Dialog'

const props = defineProps({
  user_id: { type: [Number, String], required: true },
})
const user_id = toRef(props, 'user_id')

const tab = ref('classes')
const show_honor = ref(false)
const honor = ref({})

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

onMounted(() => {
  loadData()
})
</script>
