<template>
  <v-layout class="min-vh-100 bg-light">
    <v-app-bar color="primary">
      <template v-slot:prepend>
        <v-btn :to="{ name: 'home' }" density="default" icon="mdi-chevron-left" />
      </template>

      <v-app-bar-title>
        {{ title }}
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <BottomMenu />
  </v-layout>
</template>

<script setup>
import { ref, provide } from 'vue'
import BottomMenu from '@/components/BottomMenu.vue'

const title = ref('')

function setPageTitle(value) {
  title.value = value
}

provide('setPageTitle', setPageTitle)
</script>
