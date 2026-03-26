<template>
  <Input
    v-model="model"
    :label="label"
    :loading="loading"
    @input="sanitizeUsername($event.target.value)"
    prepend-inner-icon="mdi-lock"
    :type="showPassword ? 'text' : 'password'"
    :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
    @click:append-inner="showPassword = !showPassword"
    :hint="hint"
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
  hint: { type: String },
})

const emit = defineEmits(['update:modelValue'])
const showPassword = ref(false)

const model = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})

function sanitizeUsername(value) {
  model.value = value.toLowerCase().replace(/[^a-z0-9._]/g, '')
}
</script>
