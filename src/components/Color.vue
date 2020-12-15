<template>
  <div class="color" :class="{ dark: textColor }" :style="{ backgroundColor: bgColor }">
    <Title :colorName="colorName" :colorHex="colorHex" />

    <ColorControls
      :locked="locked"
      :textColor="textColor"
      @toggleLock="toggleLock"
      @showColorCommandsIndex="showColorCommandsIndex"
    />

    <div v-if="colorCommandsIndex === index" class="drawers">
      <div class="close" @click="close">
        <font-awesome-icon :icon="['fas', 'times']" />
      </div>
      <div class="drawer">
        <div class="title" @click="randomBackground">random</div>
      </div>
      <div class="drawer" :class="{ open: opened === 'rgb' }" @click="toggleDrawer('rgb')">
        <div class="title">rgb</div>
        <div class="container">
          <div class="picker">
            <span>R:</span>
            <button class="color-increment" @click="valueRed--">-</button>
            <input type="number" min="0" max="255" v-model="valueRed" />
            <button class="color-decrement" @click="valueRed--">+</button>
          </div>
          <div class="picker">
            <span>G:</span>
            <button class="color-increment" @click="valueGreen--">-</button>
            <input type="number" min="0" max="255" v-model="valueGreen" />
            <button class="color-decrement" @click="valueGreen--">+</button>
          </div>
          <div class="picker">
            <span>B:</span>
            <button class="color-increment" @click="valueBlue--">-</button>
            <input type="number" min="0" max="255" v-model="valueBlue" />
            <button class="color-decrement" @click="valueBlue--">+</button>
          </div>
        </div>
      </div>
      <div class="drawer" :class="{ open: opened === 'picker' }" @click="toggleDrawer('picker')">
        <div class="title">hex</div>
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
    colorCommandsIndex() {
      return this.$store.state.colorCommand
    }
  },
  methods: {
    showColorCommandsIndex() {
      this.opened = null
      if (this.colorCommandsIndex === this.index) {
        this.$store.commit('colorCommandsIndex', null)
      } else {
        this.$store.commit('colorCommandsIndex', this.index)
      }
    },
    close() {
      this.$store.commit('colorCommandsIndex', null)
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

      fetch(`https://www.thecolorapi.com/id?rgb=(${this.valueRed},${this.valueGreen},${this.valueBlue})`)
        .then(response => response.json())
        .then(data => this.updateColorData(data))
    },
    updateColorData(data) {
      this.colorName = data.name.value
      this.colorHex = data.hex.clean
    }
  },
  watch: {
    searchHex: function(value) {
      if (!value.match(/[0-9A-Fa-f]{6}/g)) return

      fetch(`https://www.thecolorapi.com/id?hex=${value}`)
        .then(response => response.json())
        .then(data => {
          this.colorName = data.name.value
          this.colorHex = data.hex.clean
          this.valueRed = data.rgb.r
          this.valueGreen = data.rgb.g
          this.valueBlue = data.rgb.b
        })
    },
    valueRed: function(value) {
      fetch(`https://www.thecolorapi.com/id?rgb=(${value},${this.valueGreen},${this.valueBlue})`)
        .then(response => response.json())
        .then(data => this.updateColorData(data))
    },
    valueGreen: function(value) {
      fetch(`https://www.thecolorapi.com/id?rgb=(${this.valueRed},${value},${this.valueBlue})`)
        .then(response => response.json())
        .then(data => this.updateColorData(data))
    },
    valueBlue: function(value) {
      fetch(`https://www.thecolorapi.com/id?rgb=(${this.valueRed},${this.valueGreen},${value})`)
        .then(response => response.json())
        .then(data => this.updateColorData(data))
    }
  },
  mounted() {
    this.randomBackground()
    randomizeColorsBus.$on('changeColor', () => {
      if (this.locked) return

      this.$store.commit('colorCommandsIndex', null)
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
  padding: 2rem;
  position: relative;

  &.dark {
    color: $white;
  }

  .drawers {
    background: $white;
    border-radius: 1rem;
    color: $black;
    left: calc(50% - 10rem);
    min-width: 20rem;
    position: absolute;
    top: 40%;
    z-index: 11;
  }

  .close {
    text-align: right;
    padding: 1rem 1rem 0.5rem;
    font-size: 1.5rem;
    cursor: pointer;
  }

  .drawer {
    border-top: 0.1rem solid $grey;
    cursor: pointer;
    font-size: 1.2rem;
    text-transform: uppercase;

    & .container {
      box-sizing: border-box;
      height: 0;
      overflow: hidden;
    }

    &.open .container {
      height: auto;
      padding: 1rem 1rem 1.5rem;
    }

    .title {
      font-size: 1.5rem;
      padding: 1rem;
    }

    .color-increment {
      border-radius: 5px 0 0 5px;
      border: 0.1rem solid $grey;
      padding: 0.5rem 0.8rem;
    }

    .color-decrement {
      border-radius: 0 5px 5px 0;
      border: 0.1rem solid $grey;
      padding: 0.5rem 0.8rem;
    }

    input[type='number'] {
      background: transparent;
      border: none;
      border-bottom: 0.1rem solid $grey;
      border-top: 0.1rem solid $grey;
      padding: 0.5rem 0.8rem;
      text-align: center;
    }

    input[type='text'] {
      background: transparent;
      border: none;
      border-bottom: 0.1rem solid $grey;
      cursor: pointer;
      font-size: 1.7rem;
      max-width: 7rem;
      text-align: center;
      text-transform: uppercase;
    }

    .picker {
      align-items: center;
      display: flex;
      font-size: 1.3rem;
      justify-content: space-around;
      padding: 0.5rem;

      span {
        flex: 1;
      }
    }
  }
}
</style>
