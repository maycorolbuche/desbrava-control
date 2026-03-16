<template>
  <v-text-field
    v-model="model"
    class="my-3"
    variant="outlined"
    :label="label"
    color="info"
    hide-details
    :loading="loading"
    :disabled="loading || disabled"
  />
</template>

<script setup>
import { computed } from 'vue'

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
</script>
