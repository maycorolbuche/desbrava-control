<template>
  <v-card flat>
    <v-card-text>
      <Input v-model="form.name" label="Nome" :loading="loading" />
      <SelectDistrict
        v-if="user.role.code != 'instructor'"
        v-model="form.district_id"
        label="Distrito"
        :loading="loading"
      />
      <SelectClub
        v-if="user.role.code != 'instructor'"
        v-model="form.club_id"
        label="Clube"
        :loading="loading"
      />
      <MultipleClass
        v-if="user.role.code == 'instructor'"
        v-model="form.class_id"
        label="Classes"
        :loading="loading"
      />
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        v-if="!data"
        @click="save"
        color="info"
        text="Cadastrar"
        prepend-icon="mdi-plus"
        :disabled="loading"
      />
      <v-btn
        v-else
        @click="save"
        color="success"
        text="Salvar"
        prepend-icon="mdi-content-save-outline"
        :disabled="loading"
      />
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref, toRef, onMounted, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { userStore } from '@/stores/userStore'

import Input from '@/components/inputs/Input.vue'
import SelectDistrict from '@/components/inputs/SelectDistrict.vue'
import SelectClub from '@/components/inputs/SelectClub.vue'
import MultipleClass from '@/components/inputs/MultipleClass.vue'

import Alert from '@/helpers/Alert'
import Api from '@/services/Api'

/* ------------------------ VARS ------------------------ */

const props = defineProps({
  data: { type: Object },
})

const data = toRef(props, 'data')

const loading = ref(false)
const form = ref({
  class_id: [],
})

const router = useRouter()
const emit = defineEmits(['save'])

const user = computed(() => {
  return userStore()
})

/* ------------------------ WATCH ------------------------ */

watch(
  () => data.value,
  () => {
    setForm()
  },
  { deep: true },
)

/* ------------------------ METHODS ------------------------ */

async function save() {
  loading.value = true

  let res
  if (data.value?.id) {
    res = await Api.put('users/' + data.value.id, form.value)
  } else {
    res = await Api.post('users', form.value)
  }

  if (!res.success) {
    Alert.error(res.error)
  } else {
    if (res.message) {
      Alert.success(res.message)
    }
    emit('save', res.data)
  }
  loading.value = false
}

async function setForm() {
  if (data.value) {
    form.value = Object.assign({}, data.value)
  }
}

/* ------------------------ MOUNTED ------------------------ */

onMounted(() => {
  setForm()
})
</script>
