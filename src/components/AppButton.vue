<template>
  <v-card class="__app-button__" :width="200" @click="alert('df')">
    <v-card-title>APP </v-card-title>
  </v-card>
</template>

<style lang="scss" scoped>
.__app-button__ {
  border: 3px solid rgb(var(--v-theme-secondary));
  background: initial;
  border-radius: 12px;
  background: #00000030;
  box-shadow: 0px 16px 12px 5px rgba(0, 0, 0, 0.3);

  &::before {
    content: '';
    box-shadow: inset 0 0 7px 10px rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
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

  &:hover {
    background: rgb(var(--v-theme-secondary));

    &::before {
      box-shadow: initial;
    }
  }
}
</style>
