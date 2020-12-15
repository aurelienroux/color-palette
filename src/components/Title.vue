<template>
  <div class="title" @click="closeColorCommands">
    <h2>{{ colorHex }}</h2>
    <h3>{{ colorName }}</h3>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  props: {
    colorName: {
      type: String
    },
    colorHex: {
      type: String
    }
  },
  methods: {
    closeColorCommands() {
      this.$store.commit('commandIndex', null)
    }
  }
})
</script>

<style lang="scss" scoped>
.title {
  h2 {
    font-size: 1.8rem;

    @include for-tablet-portrait-up {
      font-size: 2.4rem;
    }
  }

  h3 {
    font-size: 1.4rem;

    @include for-tablet-portrait-up {
      font-size: 2rem;
    }
  }
}
</style>
