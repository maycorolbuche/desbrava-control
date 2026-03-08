<template>
  <component :is="layoutComponent" v-cloak />
</template>

<script setup>
/* ------------------------ IMPORTS ------------------------ */

import { computed } from 'vue'
import { useRoute } from 'vue-router'

import MainLayout from '@/layouts/MainLayout.vue'
import LoginLayout from '@/layouts/LoginLayout.vue'
import BlankLayout from '@/layouts/BlankLayout.vue'
import PageLayout from '@/layouts/PageLayout.vue'

/* ------------------------ VARS ------------------------ */

const route = useRoute()

/* ------------------------ COMPUTEDS ------------------------ */

const layoutComponent = computed(() => {
  return route?.meta?.layout === 'login'
    ? LoginLayout
    : route?.meta?.layout === 'blank'
      ? BlankLayout
      : route?.meta?.layout === 'page'
        ? PageLayout
        : MainLayout
})
</script>
