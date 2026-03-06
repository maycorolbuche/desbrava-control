<template>
  <v-layout>
    <Darkening />

    <v-main>
      <div style="margin-top: 80px">
        <Logo />
      </div>
      <v-btn color="primary" @click="createSparkle()">aaa</v-btn>
      <v-btn color="secondary">ffds</v-btn>

      <div class="pa-7 d-flex justify-space-evenly flex-wrap" style="gap: 15px">
        <AppButton />
        <AppButton />
        <AppButton />
      </div>

      gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />
      gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />
      gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />
      gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />
      gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />
      gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />
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
