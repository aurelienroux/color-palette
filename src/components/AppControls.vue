<template>
  <div class="controls">
    <button @click="randomizeColors">randomize</button>
    <button @click="addColor" :disabled="colorDisplay === 5">+</button>
    <button @click="removeColor" :disabled="colorDisplay === 2">-</button>
  </div>
</template>

<script>
import Vue from 'vue'
import randomizeColorsBus from '../randomizeColors-bus'

export default Vue.extend({
  computed: {
    colorDisplay() {
      return this.$store.state.colors
    }
  },
  methods: {
    randomizeColors() {
      randomizeColorsBus.$emit('changeColor')
    },
    addColor() {
      this.$store.commit('addColor')
    },
    removeColor() {
      this.$store.commit('removeColor')
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
