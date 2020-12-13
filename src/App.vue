<template>
  <div id="app">
    <Display />
    <Controls />
  </div>
</template>

<script>
import Controls from '@/components/Controls.vue'
import Display from '@/components/Display.vue'

export default {
  name: 'App',
  components: {
    Controls,
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
  // background: pink;
  border: 1px solid white;
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  height: 100vh;
  text-align: center;

  display: flex;
  flex-direction: column;
}
</style>
