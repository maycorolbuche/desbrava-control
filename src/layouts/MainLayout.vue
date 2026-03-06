<template>
  <v-layout>
    <Darkening />

    <v-main>
      <div style="margin-top: 80px">
        <Logo />
      </div>

      <div>
        <router-view />
      </div>
    </v-main>

    <BottomMenu />
  </v-layout>
</template>

<script setup>
import Logo from '@/components/Logo.vue'
import Darkening from '@/components/Darkening.vue'
import BottomMenu from '@/components/BottomMenu.vue'
</script>
