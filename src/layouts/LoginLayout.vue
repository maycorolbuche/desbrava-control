<template>
  <div class="d-flex align-center flex-column align-stretch justify-center vh-100">
    <div class="d-flex align-center justify-center">
      <Logo width="250px" />
    </div>
    <v-divider color="secondary" opacity="1" thickness="2" gradient />
    <router-view />
    <v-divider color="secondary" opacity="1" thickness="2" gradient />

    <div
      class="text-center position-absolute bottom-0 w-100 text-white"
      style="font-weight: 100; opacity: 0.3"
    >
      Desenvolvido por
      <a
        href="https://maycorolbuche.com.br"
        class="text-white"
        style="font-weight: 400; text-decoration: none"
        target="_blank"
      >
        Mayco Rolbuche
      </a>
    </div>
  </div>
</template>

<script setup>
import Logo from '@/components/Logo.vue'
</script>
