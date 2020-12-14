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
    <h3 v-if="loading">loading</h3>
    <button @click="randomBackground">random</button>
    <div>
      <input type="text" maxlength="6" :placeholder="colorHex" v-model="searchHex" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import randomizeColorsBus from '../randomizeColors-bus'

export default Vue.extend({
  data() {
    return {
      colorName: null,
      colorHex: null,
      locked: false,
      loading: false,
      searchHex: null,
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
      this.loading = true

      fetch(`https://www.thecolorapi.com/id?rgb=(${this.valueRed},${this.valueGreen},${this.valueBlue})`)
        .then(response => response.json())
        .then(data => this.updateColorData(data))
    },
    updateColorData(data) {
      this.colorName = data.name.value
      this.colorHex = data.hex.clean
      this.loading = false
    }
  },
  watch: {
    searchHex: function(value) {
      if (!value.match(/[0-9A-Fa-f]{6}/g)) return
      this.loading = true

      fetch(`https://www.thecolorapi.com/id?hex=${value}`)
        .then(response => response.json())
        .then(data => {
          this.colorName = data.name.value
          this.colorHex = data.hex.clean
          this.loading = false
          this.valueRed = data.rgb.r
          this.valueGreen = data.rgb.g
          this.valueBlue = data.rgb.b
        })
    },
    valueRed: function(value) {
      this.loading = true
      fetch(`https://www.thecolorapi.com/id?rgb=(${value},${this.valueGreen},${this.valueBlue})`)
        .then(response => response.json())
        .then(data => this.updateColorData(data))
    },
    valueGreen: function(value) {
      this.loading = true
      fetch(`https://www.thecolorapi.com/id?rgb=(${this.valueRed},${value},${this.valueBlue})`)
        .then(response => response.json())
        .then(data => this.updateColorData(data))
    },
    valueBlue: function(value) {
      this.loading = true
      fetch(`https://www.thecolorapi.com/id?rgb=(${this.valueRed},${this.valueGreen},${value})`)
        .then(response => response.json())
        .then(data => this.updateColorData(data))
    }
  },
  mounted() {
    this.randomBackground()
    randomizeColorsBus.$on('changeColor', () => {
      if (this.locked) return

      this.randomBackground()
    })
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
