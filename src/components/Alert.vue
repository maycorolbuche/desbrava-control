<template>
  <v-snackbar
    v-model="Alert.state.show"
    :timeout="Alert.state.timeout"
    :color="Alert.state.color"
    location="top right"
    elevation="6"
    rounded="lg"
    @update:model-value="handleSnackbarChange"
  >
    {{ Alert.state.message }}

    <v-progress-linear
      v-if="Alert.state.timeout > 0"
      :model-value="progress"
      color="#FFF"
      height="4"
      absolute
      bottom
    />

    <template v-slot:actions>
      <v-btn color="#FFF" icon="mdi-close" @click="Alert.state.show = false" />
    </template>
  </v-snackbar>
</template>

<script setup>
import { ref, watch } from "vue";
import Alert from "@/helpers/Alert";

const progress = ref(0);
const timestamp = ref(0);
let intervalId = null;

// Função para iniciar a contagem regressiva da barra de progresso
function startProgress() {
  progress.value = 0;
  clearInterval(intervalId);

  if (Alert.state.timeout > 0) {
    const duration = Alert.state.timeout;
    intervalId = setInterval(() => {
      timestamp.value = Date.now();
      progress.value = ((timestamp.value - Alert.state.timestamp) / duration) * 100;
      if (progress.value >= duration) {
        clearInterval(intervalId);
      }
    }, 50);
  }
}

watch(
  () => Alert.state.show,
  (newValue) => {
    if (newValue) {
      startProgress();
    } else {
      clearInterval(intervalId);
    }
  }
);

// Adiciona um listener para quando o v-snackbar fecha (mesmo que por timeout)
function handleSnackbarChange(newValue) {
  if (!newValue) {
    clearInterval(intervalId);
  }
}
</script>
