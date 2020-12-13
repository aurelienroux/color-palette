<template>
  <div class="color" :style="{ backgroundColor: bgColor }">
    <button @click="toggleLock">lock</button>

    <div v-if="!locked">
      <div>red: {{ valueRed }}</div>
      <input type="range" min="0" max="255" v-model="valueRed" />
      <div>green: {{ valueGreen }}</div>
      <input type="range" min="0" max="255" v-model="valueGreen" />
      <div>blue: {{ valueBlue }}</div>
      <input type="range" min="0" max="255" v-model="valueBlue" />
    </div>
    <h2>hexcode here: {{ hexCode }}</h2>
    <h2>rgb to hex: {{ RGBToHex }}</h2>
    <h2>hex to rgb: {{ HexToRGB }}</h2>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      locked: false,
      valueRed: 100,
      valueGreen: 100,
      valueBlue: 100,
      hexCode: '00ff00'
    }
  },
  computed: {
    bgColor() {
      return `rgb(${this.valueRed},${this.valueGreen},${this.valueBlue})`
    },
    RGBToHex() {
      let r = Math.abs(this.valueRed).toString(16)
      let g = Math.abs(this.valueGreen).toString(16)
      let b = Math.abs(this.valueBlue).toString(16)

      if (r.length == 1) r = '0' + r
      if (g.length == 1) g = '0' + g
      if (b.length == 1) b = '0' + b

      this.hexCode === '#' + r + g + b

      return r + g + b
    },
    HexToRGB() {
      var test = this.hexCode.match(/.{1,2}/g)
      var ttt = [parseInt(test[0], 16), parseInt(test[1], 16), parseInt(test[2], 16)]
      return ttt
    }
  },
  methods: {
    toggleLock() {
      this.locked = !this.locked
    }
  }
})
</script>

<style lang="scss" scoped>
.color {
  flex: 1;
  border: 1px solid salmon;
  padding: 4rem;
}
</style>
