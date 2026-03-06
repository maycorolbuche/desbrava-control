<template>
  <v-card class="__app-button__" :width="150" @click="alert('df')">
    <v-card-text class="text-center mx-0 px-0 pb-0 mb-0">
      <v-icon :size="60">mdi-calendar</v-icon>
    </v-card-text>
    <v-card-title class="text-center font-weight-thin mx-0 px-0" style="font-size: 17px">
      AGENDA
    </v-card-title>
  </v-card>
</template>

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
}
</style>
