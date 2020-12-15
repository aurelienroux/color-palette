<template>
  <div class="controls">
    <button @click="addColor" :disabled="colorDisplay === 5">+</button>
    <button @click="randomizeColors">randomize</button>
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
  padding: 1rem;

  button {
    background-color: $blue-text;
    border-radius: 0.5rem;
    border: none;
    color: $white;
    cursor: pointer;
    font-size: 2rem;
    font-weight: bold;
    margin: 1rem;
    min-width: 4rem;
    padding: 1rem;
    text-transform: uppercase;

    &:disabled {
      background-color: lighten($color: $blue-text, $amount: 50);
      cursor: not-allowed;
    }
  }
}
</style>
