<template>
  <div class="__logo__">
    <div ref="container" class="sparkle-container"></div>
    <div style="position: relative; width: 100%; text-align: center">
      <div
        style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;

          background: conic-gradient(
            from 0deg,
            rgba(255, 215, 0, 0.9),
            rgba(255, 180, 0, 0.4),
            rgba(255, 215, 0, 0.9),
            rgba(255, 180, 0, 0.4),
            rgba(255, 215, 0, 0.9)
          );

          filter: blur(80px);
          border-radius: 50%;
          opacity: 0.8;
        "
      />
      <div style="width: 100%; height: 100%; padding: 20px">
        <img style="width: 100%; height: 100%" src="@/assets/imgs/logo.png" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const container = ref(null)
let intervalId = null

function createSparkle() {
  if (!container.value) return

  const sparkle = document.createElement('div')
  sparkle.classList.add('sparkle')

  const size = Math.random() * 8 + 4
  sparkle.style.width = size + 'px'
  sparkle.style.height = size + 'px'

  // Centro da tela
  const centerX = window.innerWidth / 2
  const centerY = window.innerHeight / 2 / 2

  sparkle.style.left = centerX + 'px'
  sparkle.style.top = centerY + 'px'

  // Ângulo aleatório
  const angle = Math.random() * 2 * Math.PI

  // Distância grande o suficiente para sair da tela
  const distance = Math.max(window.innerWidth, window.innerHeight / 2)

  const tx = Math.cos(angle) * distance
  const ty = Math.sin(angle) * distance

  sparkle.style.setProperty('--tx', `${tx}px`)
  sparkle.style.setProperty('--ty', `${ty}px`)

  const duration = Math.random() * 8 + 8
  sparkle.style.animationDuration = duration + 's'

  container.value.appendChild(sparkle)

  setTimeout(() => {
    sparkle.remove()
  }, duration * 1000)
}

onMounted(() => {
  intervalId = setInterval(createSparkle, 100)
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
})
</script>

<style lang="scss">
.__logo__ {
  .sparkle-container {
    inset: 0;
    pointer-events: none;
    overflow: hidden;
    position: absolute;
    width: 100vw;
    height: 100vh;

    .sparkle {
      position: absolute;
      border-radius: 50%;
      background: radial-gradient(circle, #ffd700 0%, #ffb300 40%, transparent 70%);
      animation: explode linear forwards;
    }
  }

  @keyframes explode {
    0% {
      transform: translate(0px, 0px) scale(0.6);
      opacity: 0;
    }

    20% {
      opacity: 1;
    }

    80% {
      opacity: 1;
    }

    100% {
      transform: translate(var(--tx), var(--ty)) scale(1);
      opacity: 0;
    }
  }

  @keyframes glow {
    from {
      filter: brightness(1);
    }
    to {
      filter: brightness(1.8);
    }
  }
}
</style>
