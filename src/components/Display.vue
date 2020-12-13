<template>
  <div class="display">
    <Color />
    <Color />
    <Color />
  </div>
</template>

<script>
import Vue from 'vue'
import Color from '@/components/Color.vue'

export default Vue.extend({
  components: {
    Color
  }
})
</script>

<style lang="scss" scoped>
.display {
  border: 1px solid blue;
  display: flex;
  flex: 4;
}
</style>
