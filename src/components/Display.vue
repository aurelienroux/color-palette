<template>
  <div class="display">
    <Color v-for="(display, index) in colorDisplays" :key="index" :index="index" />
  </div>
</template>

<script>
import Vue from 'vue'
import Color from '@/components/Color.vue'

export default Vue.extend({
  components: {
    Color
  },
  computed: {
    colorDisplays() {
      return this.$store.state.colors
    }
  }
})
</script>

<style lang="scss" scoped>
.display {
  display: flex;
  flex: 5;
  flex-direction: column;

  @include for-desktop-up {
    flex-direction: row;
  }
}
</style>
