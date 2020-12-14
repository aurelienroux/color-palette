<template>
  <div class="color-controls">
    <font-awesome-icon v-if="!loading" :icon="['fas', 'spinner']" spin />

    <button @click="showCommandIndex">
      <font-awesome-icon v-if="!loading" :icon="['fas', 'paint-brush']" />
    </button>

    <button @click="toggleLock">
      <div v-if="locked">
        <font-awesome-icon v-if="!loading" :icon="['fas', 'lock']" />
      </div>
      <div v-else>
        <font-awesome-icon v-if="!loading" :icon="['fas', 'lock-open']" />
      </div>
    </button>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  props: {
    loading: {
      type: Boolean
    },
    locked: {
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
  border: 1px solid;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
