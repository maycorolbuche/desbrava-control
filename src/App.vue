<template>
  <Loading v-model="isLoading" />
  <Alert />
  <component :is="layoutComponent" v-cloak />
</template>

<script setup>
/* ------------------------ IMPORTS ------------------------ */

import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLoading } from '@/composables/loading'

import Loading from '@/components/Loading.vue'
import Alert from '@/components/Alert.vue'

import MainLayout from '@/layouts/MainLayout.vue'
import LoginLayout from '@/layouts/LoginLayout.vue'
import BlankLayout from '@/layouts/BlankLayout.vue'
import PageLayout from '@/layouts/PageLayout.vue'

/* ------------------------ VARS ------------------------ */

const route = useRoute()
const { isLoading } = useLoading()

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
