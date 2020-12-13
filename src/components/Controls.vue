<template>
  <div class="controls">
    <button @click="randomizeColors">randomize</button>
  </div>
</template>

<script>
import Vue from 'vue'
import randomizeColorsBus from '../randomizeColors-bus'

export default Vue.extend({
  methods: {
    randomizeColors() {
      randomizeColorsBus.$emit('changeColor')
    }
  }
})
</script>

<style lang="scss" scoped>
.controls {
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
}
</style>
