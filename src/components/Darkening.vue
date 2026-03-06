<template>
  <div class="__darkening__" ref="hero" />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const hero = ref(null)
function handleScroll() {
  const scrollTop = window.scrollY
  const maxScroll = 400 // distância para desaparecer

  let opacity = 0 + scrollTop / 1000

  if (opacity < 0) opacity = 0
  if (opacity > 0.7) opacity = 0.7

  if (hero.value) {
    hero.value.style.opacity = opacity
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.__darkening__ {
  background: #000;
  opacity: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &::before {
    content: '';
    position: fixed;
    inset: 0;

    background: radial-gradient(
      circle at center,
      rgba(0, 0, 0, 0) 40%,
      rgba(5, 20, 60, 0.6) 70%,
      rgba(2, 10, 30, 0.9) 100%
    );

    pointer-events: none;
  }
}
</style>
