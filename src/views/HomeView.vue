<template>
  <v-container class="pa-0 ma-0 mx-auto">
    <div class="pa-2 d-flex justify-center flex-wrap" style="gap: 20px">
      <AppButton
        v-if="permissions.includes('districts.manage')"
        icon="mdi-map-marker-radius"
        label="Distritos"
        :to="{ name: 'districts' }"
      />
      <AppButton
        v-if="permissions.includes('clubs.manage')"
        icon="mdi-home-city-outline"
        label="Clubes"
        :to="{ name: 'clubs' }"
      />
      <AppButton
        v-if="permissions.includes('users.manage')"
        icon="mdi-account-group"
        label="Usuários"
        :to="{ name: 'users' }"
      />
      <AppButton
        v-if="permissions.includes('classes.control')"
        :icon="ClassesIcon"
        label="Controle de Classes"
        :to="{ name: 'classes-control' }"
      />
      <!--
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
      -->
    </div>
  </v-container>
</template>

<script setup>
import { computed } from 'vue'

import AppButton from '@/components/AppButton.vue'
import ClassesIcon from '@/components/icons/ClassesIcon.vue'
import HonorsIcon from '@/components/icons/HonorsIcon.vue'
import { userStore } from '@/stores/userStore'

const permissions = computed(() => {
  return userStore().role?.permissions?.map((item) => {
    return item.code
  })
})
</script>
