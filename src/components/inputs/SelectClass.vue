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
  />
</template>

<script setup>
import { ref, toRef, computed, onMounted, watch } from 'vue'

import Alert from '@/helpers/Alert'
import Session from '@/helpers/Session'
import Api from '@/services/Api'

const props = defineProps({
  modelValue: { type: [String, Number, Array], default: '' },
  label: { type: String, default: '' },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  autoSelect: { type: Boolean, default: false },
})

const autoSelect = toRef(props, 'autoSelect')

const emit = defineEmits(['update:modelValue', 'update:selectedItem'])

const model = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})

const data = ref([])
const item_selected = computed(() => {
  return data?.value?.find((item) => item.id === model.value)
})
watch(
  () => item_selected,
  () => {
    emit('update:selectedItem', item_selected.value)
  },
  { deep: true },
)
watch(
  () => data,
  () => {
    if (data.value && autoSelect.value && !model.value) {
      if (data.value[0]?.id) {
        model.value = data.value[0]?.id
      }
    }
  },
  { deep: true },
)

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
