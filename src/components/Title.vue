<template>
  <div class="title">
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
  }
})
</script>

<style lang="scss" scoped>
.title {
  h2 {
    font-size: 3rem;
  }

  h3 {
    font-size: 2rem;
  }
}
</style>
