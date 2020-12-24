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
:root {
  font-size: 62.5%;
}

#app {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: $blue-text;
  display: flex;
  flex-direction: column;
  font-family: $nunito-font;
  text-align: center;

  @include for-desktop-up {
    height: 100vh;
  }
}

button {
  border: none;
  cursor: pointer;
  padding: 1rem;
}
</style>
