<template>
  <v-select
    v-model="model"
    class="my-3"
    variant="outlined"
    :label="label"
    color="info"
    hide-details
    :items="data"
    item-title="label"
    item-value="id"
    :loading="loading || loading_data"
    :disabled="loading || disabled || (loading_data && data.length <= 0)"
    multiple
  >
    <template v-slot:selection="{ item }">
      <v-chip :text="item.label"></v-chip>
    </template>
  </v-select>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

import Alert from '@/helpers/Alert'
import Session from '@/helpers/Session'
import Api from '@/services/Api'

const props = defineProps({
  modelValue: { type: [String, Number, Array], default: '' },
  label: { type: String, default: '' },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])

const model = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})

const data = ref([])
const loading_data = ref(false)

async function loadData() {
  data.value = Session.get('select-classes', [])

  loading_data.value = true
  const res = await Api.get('classes', {})
  if (!res.success) {
    Alert.error(res.error)
  } else {
    if (res.message) {
      Alert.success(res.message)
    }
    data.value = res.data
    Session.set('select-classes', data.value)
  }
  loading_data.value = false
}

onMounted(() => {
  loadData()
})
</script>
