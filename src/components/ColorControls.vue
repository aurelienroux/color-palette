<template>
  <div class="color-controls">
    <h3 v-if="!loading">loading</h3>
    <button @click="showCommandIndex">show command</button>
    <button @click="toggleLock">
      <div v-if="locked">locked</div>
      <div v-else>un-locked</div>
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
