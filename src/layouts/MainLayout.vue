<template>
  <v-layout>
    <Darkening />

    <v-main>
      <div style="margin-top: 80px">
        <Logo />
      </div>

      <div class="pa-7 d-flex justify-space-evenly flex-wrap" style="gap: 15px">
        <AppButton />
        <AppButton />
        <AppButton />
        <AppButton />
        <AppButton />
        <AppButton />
        <AppButton />
        <AppButton />
        <AppButton />
      </div>
    </v-main>

    <BottomMenu />
  </v-layout>
</template>

<script setup>
import Logo from '@/components/Logo.vue'
import Darkening from '@/components/Darkening.vue'
import BottomMenu from '@/components/BottomMenu.vue'
import AppButton from '@/components/AppButton.vue'
</script>
