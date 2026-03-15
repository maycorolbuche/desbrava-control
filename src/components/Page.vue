<template>
  <v-app-bar app color="primary">
    <template v-slot:prepend>
      <v-btn @click="goBack" density="default" icon="mdi-chevron-left" />
    </template>

    <v-app-bar-title>{{ title }}</v-app-bar-title>

    <template v-slot:append>
      <slot name="actions" />
    </template>
  </v-app-bar>

  <v-main>
    <v-container class="pa-0 ma-0 mx-auto"> <slot /> </v-container>
  </v-main>
</template>

<script setup>
import { toRef, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  title: { type: String },
  back: { type: Boolean, default: false },
  prevRoute: { type: [Object, String] },
})

const title = toRef(props, 'title')
const back = toRef(props, 'back')
const prevRoute = toRef(props, 'prevRoute')

watch(
  () => back.value,
  (newValue) => {
    if (newValue) {
      goBack()
    }
  },
)

function goBack() {
  if (prevRoute.value) {
    router.push(prevRoute.value)
  } else if (window.history.length > 1) {
    router.push(window.history.state.back)
  } else {
    router.push({ name: 'home' })
  }
}

onMounted(() => {
  if (back.value) {
    goBack()
  }
})
</script>
