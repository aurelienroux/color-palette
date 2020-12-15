<template>
  <div class="color-controls">
    <button :class="{ dark: textColor }" @click="showColorCommandsIndex">
      <font-awesome-icon :icon="['fas', 'paint-brush']" />
    </button>

    <button :class="{ dark: textColor }" @click="toggleLock">
      <font-awesome-icon v-if="locked" :icon="['fas', 'lock']" />
      <font-awesome-icon v-if="!locked" :icon="['fas', 'lock-open']" />
    </button>
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
    showColorCommandsIndex() {
      this.$emit('showColorCommandsIndex')
    }
  }
})
</script>

<style lang="scss" scoped>
.color-controls {
  align-items: center;
  display: flex;
  flex-direction: column;

  button {
    background-color: transparent;
    font-size: 2.2rem;
    margin: 0.5rem;
    width: 6rem;

    @include for-tablet-portrait-up {
      font-size: 3rem;
    }

    &.dark {
      color: $white;
    }
  }
}
</style>
