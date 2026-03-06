<template>
  <v-bottom-navigation class="__bottom-menu__">
    <div class="left-menu" />
    <div class="center-menu">
      <v-btn class="button-menu" icon="mdi-history" />
      <div class="divider-menu" vertical />
      <v-btn class="button-menu" icon="mdi-heart" />
      <div class="divider-menu" vertical />
      <v-btn class="button-menu" icon="mdi-map-marker" />
    </div>
    <div class="right-menu" />
  </v-bottom-navigation>
</template>

<style lang="scss" scoped>
.__bottom-menu__ {
  background: initial;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;

  .left-menu,
  .right-menu {
    border: 0;
    border-bottom: 4px solid rgb(var(--v-theme-secondary));
    width: 20%;
    margin: 0px;
    position: relative;

    @media (max-width: 400px) {
      width: 20px;
    }

    &:after {
      content: '';
      position: absolute;
      margin-top: 24px;
      width: 35px;
      height: 100%;
    }
  }
  .left-menu {
    border-radius: 0 0 35px 0;
    &:after {
      right: 0;
      background: radial-gradient(circle at 0 0, transparent 36px, rgb(0 0 0 / 45%) 0px);
    }
  }

  .right-menu {
    border-radius: 0 0 0 35px;
    &:after {
      left: 0;
      background: radial-gradient(circle at 100% 0, transparent 36px, rgb(0 0 0 / 45%) 0px);
    }
  }

  .center-menu {
    height: 60px !important;

    display: flex;
    align-items: center;
    justify-content: space-evenly;

    background: rgb(0 0 0 / 45%);
    backdrop-filter: blur(30px);

    border: 0;
    border-top: 4px solid rgb(var(--v-theme-secondary));
    border-radius: 35px 35px 0 0;
    padding: 6px 10px;

    flex: 1;

    &::after {
      content: '';
      position: absolute;
      top: -10px;
      left: 15%;
      width: 70%;
      height: 20px;

      background: radial-gradient(ellipse, rgb(var(--v-theme-secondary)) 0%, transparent 70%);

      filter: blur(10px);
    }

    &::before {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 15%;
      width: 70%;
      height: 20px;

      background: radial-gradient(ellipse, rgba(var(--v-theme-secondary), 0.8) 0%, transparent 70%);

      filter: blur(10px);
    }

    .button-menu {
      color: rgb(var(--v-theme-secondary)) !important;
    }

    .divider-menu {
      border: 0;
      width: 1px;
      height: 100%;

      background-image: linear-gradient(
        to bottom,
        transparent,
        rgb(var(--v-theme-secondary)),
        transparent
      );
    }
  }
}
</style>
