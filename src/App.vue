<template>
  <div id="app">
    <Display />
    <AppControls />
  </div>
</template>

<script>
import AppControls from '@/components/AppControls.vue'
import Display from '@/components/Display.vue'

export default {
  name: 'App',
  components: {
    AppControls,
    Display
  }
}
</script>

<style lang="scss">
@import '@/styles/index.scss';

:root {
  font-size: 62.5%;
}

#app {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  font-family: 'Nunito', sans-serif;
  height: 100vh;
  text-align: center;
}
</style>
