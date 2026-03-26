<template>
  <Input
    v-model="model"
    :label="label"
    :loading="loading"
    @input="sanitizeUsername($event.target.value)"
  />
</template>

<script setup>
import Input from '@/components/inputs/Input.vue'
import { ref, computed } from 'vue'

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

function sanitizeUsername(value) {
  model.value = value.toLowerCase().replace(/[^a-z0-9._]/g, '')
}
</script>
