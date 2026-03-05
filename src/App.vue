<template>
  <v-layout>
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
    <v-main>
      <div style="margin-top: 80px">
        <Logo />
      </div>
      <v-btn color="primary" @click="createSparkle()">aaa</v-btn>
      <v-btn color="secondary">ffds</v-btn>

      <v-card class="agenda-card" elevation="0">
        <div class="agenda-content">
          <v-icon size="60" color="amber-darken-2">mdi-calendar</v-icon>
          <div class="agenda-number">25</div>
          <div class="agenda-text">AGENDA</div>
        </div>
        <div class="agenda-glow"></div>
      </v-card>

      gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />
      gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />
      gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />
      gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />
      gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />
      gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />gfdgf<br />
    </v-main>

    <v-bottom-navigation>
      <v-btn>
        <v-icon>mdi-history</v-icon>
        Recents
      </v-btn>
      <v-btn>
        <v-icon>mdi-heart</v-icon>
        Favorites
      </v-btn>
      <v-btn>
        <v-icon>mdi-map-marker</v-icon>
        Nearby
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<script setup>
import Logo from '@/components/Logo.vue'

import { ref, onMounted, onBeforeUnmount } from 'vue'

const hero = ref(null)
function handleScroll() {
  const scrollTop = window.scrollY
  const maxScroll = 400 // distância para desaparecer

  console.log(scrollTop)

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

<style>
.agenda-card {
  width: 160px;
  height: 180px;
  border-radius: 22px;
  position: relative;
  overflow: hidden;

  background: linear-gradient(180deg, #0b3a78 0%, #0a2f63 40%, #07244d 100%);

  border: 4px solid #f3c84a;
  box-shadow:
    inset 0 0 20px rgba(255, 215, 0, 0.15),
    0 0 15px rgba(255, 200, 80, 0.4);
}

.agenda-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.agenda-number {
  position: absolute;
  top: 58px;
  font-size: 28px;
  font-weight: bold;
  color: white;
}

.agenda-text {
  margin-top: 60px;
  font-size: 18px;
  font-weight: 600;
  color: #f3c84a;
  letter-spacing: 2px;
}

/* brilho inferior */
.agenda-glow {
  position: absolute;
  bottom: -40px;
  left: -20%;
  width: 140%;
  height: 120px;

  background: radial-gradient(
    ellipse at center,
    rgba(255, 215, 0, 0.8) 0%,
    rgba(255, 215, 0, 0.4) 40%,
    transparent 70%
  );

  filter: blur(18px);
  opacity: 0.8;
}
</style>
