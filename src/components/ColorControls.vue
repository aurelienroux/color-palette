<template>
  <div class="color-controls">
    <button class="button--icon" :class="{ 'button--icon__dark': textColor }" @click="showCommandIndex">
      <font-awesome-icon :icon="['fas', 'paint-brush']" />
    </button>

    <button class="button--icon" :class="{ 'button--icon__dark': textColor }" @click="toggleLock">
      <font-awesome-icon v-if="locked" :icon="['fas', 'lock']" />
      <font-awesome-icon v-if="!locked" :icon="['fas', 'lock-open']" />
    </button>

    {{ textColor }}
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  props: {
    locked: {
      type: Boolean
    },
    textColor: {
      type: Boolean
    }
  },
  methods: {
    toggleLock() {
      this.$emit('toggleLock')
    },
    showCommandIndex() {
      this.$emit('showCommandIndex')
    }
  }
})
</script>

<style lang="scss" scoped>
.color-controls {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .button--icon {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 3rem;
    margin: 0.5rem;
    padding: 1rem;
    width: 6rem;
  }

  .button--icon__dark {
    color: white;
  }
}
</style>
