<template>
  <component :is="layoutComponent" />
</template>

<script setup>
/* ------------------------ IMPORTS ------------------------ */

import { computed } from 'vue'
import { useRoute } from 'vue-router'

import MainLayout from '@/layouts/MainLayout.vue'
import LoginLayout from '@/layouts/LoginLayout.vue'
import BlankLayout from '@/layouts/BlankLayout.vue'

/* ------------------------ VARS ------------------------ */

const route = useRoute()

/* ------------------------ COMPUTEDS ------------------------ */

const layoutComponent = computed(() => {
  return route?.meta?.layout === 'login'
    ? LoginLayout
    : route?.meta?.layout === 'blank'
      ? BlankLayout
      : MainLayout
})
</script>
