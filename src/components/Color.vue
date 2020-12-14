<template>
  <div class="color" :class="{ dark: textColor }" :style="{ backgroundColor: bgColor }">
    <Title :colorName="colorName" :colorHex="colorHex" />

    <ColorControls
      :loading="loading"
      :locked="locked"
      @toggleLock="toggleLock"
      @showCommandIndex="showCommandIndex"
    />

    <div v-if="commandIndex === index" class="drawers">
      <div class="drawer">
        <h3 @click="randomBackground">random</h3>
      </div>
      <div class="drawer" :class="{ open: opened === 'rgb' }" @click="toggleDrawer('rgb')">
        <h3>rgb</h3>
        <div class="container">
          <div>
            <span>red: {{ valueRed }}</span>
            <input type="range" min="0" max="255" v-model="valueRed" />
          </div>
          <div>
            <span>green: {{ valueGreen }}</span>
            <input type="range" min="0" max="255" v-model="valueGreen" />
          </div>
          <div>
            <span>blue: {{ valueBlue }}</span>
            <input type="range" min="0" max="255" v-model="valueBlue" />
          </div>
        </div>
      </div>
      <div class="drawer" :class="{ open: opened === 'picker' }" @click="toggleDrawer('picker')">
        <h3>hex</h3>
        <div class="container">
          <input type="text" maxlength="6" :placeholder="colorHex" v-model="searchHex" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import randomizeColorsBus from '../randomizeColors-bus'
import Title from '@/components/Title'
import ColorControls from '@/components/ColorControls'

export default Vue.extend({
  props: {
    index: {
      type: Number
    }
  },
  components: {
    Title,
    ColorControls
  },
  data() {
    return {
      colorName: null,
      colorHex: null,
      locked: false,
      loading: false,
      opened: null,
      searchHex: null,
      showCommand: false,
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
    },
    commandIndex() {
      return this.$store.state.colorCommand
    }
  },
  methods: {
    showCommandIndex() {
      this.opened = null
      if (this.commandIndex === this.index) {
        this.$store.commit('commandIndex', null)
      } else {
        this.$store.commit('commandIndex', this.index)
      }
    },
    toggleDrawer(drawer) {
      this.opened = drawer
    },
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

      this.$store.commit('commandIndex', null)
      this.randomBackground()
    })
  }
})
</script>

<style lang="scss" scoped>
.color {
  display: flex;
  flex-direction: column-reverse;
  flex: 1;
  min-height: 19rem;
  padding: 2rem;
  position: relative;

  &.dark {
    color: white;
  }

  .drawers {
    border: 1px solid grey;
    border-radius: 10px;
    color: black;
    left: calc(50% - 12rem);
    min-width: 24rem;
    position: absolute;
    top: 40%;
    z-index: 11;
    background: white;
  }

  .drawer {
    cursor: pointer;
    border-bottom: 1px solid grey;

    &:last-of-type {
      border-bottom: none;
    }

    & .container {
      box-sizing: border-box;
      overflow: hidden;
      height: 0;
    }

    &.open .container {
      padding: 2rem;
      height: auto;
    }
  }
}
</style>
