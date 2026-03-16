<template>
  <v-select
    v-model="model"
    class="my-3"
    variant="outlined"
    :label="label"
    color="info"
    hide-details
    :items="clubs"
    item-title="name"
    item-value="id"
    :loading="loading || loading_data"
    :disabled="loading || disabled || loading_data"
  />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

import Alert from '@/helpers/Alert'
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

const clubs = ref([])
const loading_data = ref(false)

async function loadData() {
  loading_data.value = true
  const res = await Api.get('clubs', {})
  if (!res.success) {
    Alert.error(res.error)
  } else {
    if (res.message) {
      Alert.success(res.message)
    }
    clubs.value = res.data
  }
  loading_data.value = false
}

onMounted(() => {
  loadData()
})
</script>
