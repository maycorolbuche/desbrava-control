<template>
  <v-dialog v-model="Dialog.state.show" max-width="420">
    <v-card>
      <v-card-title style="text-wrap: auto"> {{ Dialog.state.message }}</v-card-title>
      <template v-slot:actions>
        <v-spacer></v-spacer>
        <v-btn
          v-for="btn in Dialog.state.buttons"
          :key="btn.name"
          :color="btn.color || 'primary'"
          @click="Dialog.action(btn)"
        >
          {{ btn.label }}
        </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup>
import Dialog from '@/helpers/Dialog'
</script>
