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
import { ref, computed, onMounted, watch } from 'vue'

import Alert from '@/helpers/Alert'
import Session from '@/helpers/Session'
import Api from '@/services/Api'

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, default: '' },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'data'])

const model = computed({
  get: () => props.modelValue,
  set: (v) => {
    emit('update:modelValue', v)

    // Encontra e emite o objeto completo do item selecionado
    const selectedItem = data.value.find((item) => item.id == v)
    if (selectedItem) {
      emit('data', selectedItem)
    } else {
      emit('data', null)
    }
  },
})

// Watch para emitir o objeto quando o modelValue mudar externamente
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue && data.value.length > 0) {
      const selectedItem = data.value.find((item) => item.id == newValue)
      if (selectedItem) {
        emit('data', selectedItem)
      }
    }
  },
)

const data = ref([])
const loading_data = ref(false)

async function loadData() {
  data.value = Session.get('select-roles', [])

  loading_data.value = true
  const res = await Api.get('roles', {})
  if (!res.success) {
    Alert.error(res.error)
  } else {
    if (res.message) {
      Alert.success(res.message)
    }
    data.value = res.data
    Session.set('select-roles', data.value)
  }
  loading_data.value = false
}

// Emitir o objeto inicial se já houver um modelValue
onMounted(async () => {
  await loadData()

  // Se já tem um valor selecionado, emite o objeto completo
  if (props.modelValue && data.value.length > 0) {
    const selectedItem = data.value.find((item) => item.id == props.modelValue)
    if (selectedItem) {
      emit('data', selectedItem)
    }
  }
})
</script>
