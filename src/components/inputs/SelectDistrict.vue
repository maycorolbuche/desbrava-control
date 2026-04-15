<template>
  <v-select
    v-model="model"
    class="my-3"
    variant="outlined"
    :label="label"
    color="info"
    hide-details
    :items="data"
    item-title="name"
    item-value="id"
    :loading="loading || loading_data"
    :disabled="loading || disabled || (loading_data && data.length <= 0)"
    clearable
  />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

import Alert from '@/helpers/Alert'
import Session from '@/helpers/Session'
import Api from '@/services/Api'

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
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
  data.value = Session.get('select-districts', [])

  loading_data.value = true
  const res = await Api.get('districts', {})
  if (!res.success) {
    Alert.error(res.error)
  } else {
    if (res.message) {
      Alert.success(res.message)
    }
    data.value = res.data
    Session.set('select-districts', data.value)
  }
  loading_data.value = false
}

onMounted(() => {
  loadData()
})
</script>
