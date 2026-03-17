<template>
  <div style="background: #ededed; min-height: 100vh">
    <router-view />
    <BottomMenu />
  </div>
</template>

<script setup>
import BottomMenu from '@/components/BottomMenu.vue'
</script>
