<template>
  <div class="color" :class="{ dark: textColor }" :style="{ backgroundColor: bgColor }">
    <button @click="toggleLock">lock</button>

    <div v-if="!locked">
      <div>red: {{ valueRed }}</div>
      <input type="range" min="0" max="255" v-model="valueRed" />
      <div>green: {{ valueGreen }}</div>
      <input type="range" min="0" max="255" v-model="valueGreen" />
      <div>blue: {{ valueBlue }}</div>
      <input type="range" min="0" max="255" v-model="valueBlue" />
    </div>
    <h2>{{ colorHex }}</h2>
    <h2>{{ colorName }}</h2>
    <button @click="randomBackground">random</button>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      colorName: null,
      colorHex: null,
      locked: false,
      valueRed: 0,
      valueGreen: 0,
      valueBlue: 0
    }
  },
  computed: {
    bgColor() {
      return `rgb(${this.valueRed},${this.valueGreen},${this.valueBlue})`
    },
    textColor() {
      const colorTreshold = 150
      if (
        this.valueRed < colorTreshold &&
        this.valueGreen < colorTreshold &&
        this.valueBlue < colorTreshold
      ) {
        return true
      } else if (
        this.valueRed < colorTreshold &&
        this.valueGreen < colorTreshold &&
        this.valueBlue > colorTreshold
      ) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    toggleLock() {
      this.locked = !this.locked
    },
    randomBackground() {
      this.valueRed = Math.floor(Math.random() * 256)
      this.valueGreen = Math.floor(Math.random() * 256)
      this.valueBlue = Math.floor(Math.random() * 256)

      fetch(`https://www.thecolorapi.com/id?rgb=(${this.valueRed},${this.valueGreen},${this.valueBlue})`)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.colorName = data.name.value
          this.colorHex = data.hex.value
        })
    }
  },
  mounted() {
    this.randomBackground()
  }
})
</script>

<style lang="scss" scoped>
.color {
  flex: 1;
  padding: 4rem;

  &.dark {
    color: white;
  }
}
</style>
