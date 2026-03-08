<template>
  <v-container class="pa-0 ma-0 mx-auto">
    <div class="pa-2 d-flex justify-center flex-wrap" style="gap: 20px">
      <AppButton icon="mdi-home-city-outline" label="Clubes" @click="click()" />
      <AppButton :icon="ClassesIcon" label="Classes" @click="click()" />
      <AppButton :icon="HonorsIcon" label="Especialidades" @click="click()" />
      <AppButton icon="mdi-clock" label="Classes" />
      <AppButton icon="mdi-menu" label="Mapa" />
      <AppButton icon="mdi-calendar" label="Agenda" />
      <AppButton icon="mdi-calendar" label="Agenda" />
      <AppButton icon="mdi-calendar" label="Agenda" />
      <AppButton icon="mdi-calendar" label="Agenda" />
      <AppButton icon="mdi-calendar" label="Agenda" />
      <AppButton icon="mdi-calendar" label="Agenda" />
      <AppButton icon="mdi-calendar" label="Agenda" />
      <AppButton icon="mdi-calendar" label="Agenda" />
      <AppButton icon="mdi-calendar" label="Agenda" />
      <AppButton icon="mdi-calendar" label="Agenda" />
      <AppButton icon="mdi-calendar" label="Agenda" />
      <AppButton icon="mdi-calendar" label="Agenda" />
      <AppButton icon="mdi-calendar" label="Agenda" />
      <AppButton icon="mdi-calendar" label="Agenda" />
      <AppButton icon="mdi-calendar" label="Agenda" />
      <AppButton icon="mdi-calendar" label="Agenda" />
      <AppButton icon="mdi-calendar" label="Agenda" />
      <AppButton icon="mdi-calendar" label="Agenda" />
      <AppButton icon="mdi-calendar" label="Agenda" />
      <AppButton icon="mdi-calendar" label="Agenda" />
      <AppButton icon="mdi-calendar" label="Agenda" />
      <AppButton icon="mdi-calendar" label="Agenda" />
      <AppButton icon="mdi-calendar" label="Agenda" />
      <AppButton icon="mdi-calendar" label="Agenda" />
      <AppButton icon="mdi-calendar" label="Agenda" />
      <AppButton icon="mdi-calendar" label="Agenda" />
      <AppButton icon="mdi-calendar" label="Agenda" />
      <AppButton icon="mdi-calendar" label="Agenda" />
      <AppButton icon="mdi-calendar" label="Agenda" />
    </div>
  </v-container>
</template>

<script setup>
import AppButton from '@/components/AppButton.vue'
import ClassesIcon from '@/components/icons/ClassesIcon.vue'
import HonorsIcon from '@/components/icons/HonorsIcon.vue'

function click() {
  console.log('CLICK')
}
</script>
