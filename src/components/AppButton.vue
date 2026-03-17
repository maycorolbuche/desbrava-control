<template>
  <v-card class="__app-button__" :width="150">
    <v-card-text class="text-center mx-0 px-0 pb-0 mb-0">
      <v-icon :size="60" v-if="iconType === 'object'">
        <component :is="icon" />
      </v-icon>
      <v-icon v-else :size="60">
        {{ icon }}
      </v-icon>
    </v-card-text>
    <v-card-title
      class="text-center font-weight-medium mx-0 px-0"
      style="font-size: 17px; text-wrap: auto"
    >
      {{ label }}
    </v-card-title>
  </v-card>
</template>

<script setup>
import { ref, toRef, onMounted, onBeforeUnmount } from 'vue'
import { computed } from 'vue'

const props = defineProps({
  icon: { type: [String, Object] },
  label: { type: String },
})

const icon = toRef(props, 'icon')
const label = toRef(props, 'label')

const iconType = computed(() => typeof icon.value)
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

  &:hover {
    animation: borderPulse 1s infinite;
  }
}

@keyframes borderPulse {
  0% {
    border-color: rgb(var(--v-theme-secondary));
  }
  50% {
    border-color: rgb(var(--v-theme-primary));
  }
  100% {
    border-color: rgb(var(--v-theme-secondary));
  }
}
</style>
