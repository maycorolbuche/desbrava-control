<template>
  <v-card flat>
    LISTA DE USUARIOS
    <a @click="save"> EMITA SALVAR </a>
  </v-card>
</template>

<script setup>
//import { ref, toRef, onMounted, watch } from 'vue'
//import { useRouter } from 'vue-router'

/* ------------------------ VARS ------------------------ */

const props = defineProps({
  //  data: { type: Object },
})

const emit = defineEmits(['save'])

/* ------------------------ METHODS ------------------------ */

async function save() {
  console.log('EMIT')
  emit('save', [])
}
</script>
