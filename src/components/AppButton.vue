<template>
  <v-card class="__app-button__" :width="150">
    <v-card-text class="text-center mx-0 px-0 pb-0 mb-0">
      <v-icon :size="60">
        {{ icon }}
      </v-icon>
    </v-card-text>
    <v-card-title class="text-center font-weight-medium mx-0 px-0" style="font-size: 17px">
      {{ label }}
    </v-card-title>
  </v-card>
</template>

<script setup>
import { ref, toRef, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  icon: { type: String },
  label: { type: String },
})

const icon = toRef(props, 'icon')
const label = toRef(props, 'label')
</script>

<style lang="scss" scoped>
.__app-button__ {
  border: 3px solid rgb(var(--v-theme-secondary));
  background: initial;
  border-radius: 12px;
  background: rgb(var(--v-theme-secondary));
  box-shadow: 0px 16px 12px 5px rgba(0, 0, 0, 0.3);
  color: rgb(var(--v-theme-primary));

  &::after {
    content: '';
    background: radial-gradient(ellipse, rgba(var(--v-theme-secondary), 0.8) 0%, transparent 70%);
    position: absolute;
    top: -50%;
    left: 5%;
    width: 90%;
    height: 90%;
    filter: blur(10px);
  }
}
</style>
