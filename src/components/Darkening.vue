<template>
  <div
    ref="hero"
    style="
      background: #000;
      opacity: 0;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    "
  />
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
