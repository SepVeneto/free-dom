<template>
  <FreeScene style="width: 100vw; height: 50vh; display: block;">
    <FreeDom>
      <a
        href="https://vitejs.dev"
        target="_blank"
      >
        <img
          src="/vite.svg"
          class="logo"
          alt="Vite logo"
        >
      </a>
    </FreeDom>
    <FreeDom>
      <a
        href="https://vuejs.org/"
        target="_blank"
      >
        <img
          src="./assets/vue.svg"
          class="logo vue"
          alt="Vue logo"
        >
      </a>
    </FreeDom>
    <FreeDom>
      <HelloWorld msg="Vite + Vue" />
    </FreeDom>
  </FreeScene>
  <GridLayout
    v-model="layout"
    collision
  >
    <span
      key="a"
      class="grid-item"
    >a</span>
    <span
      key="b"
      class="grid-item"
    >b</span>
    <span
      key="c"
      class="grid-item"
    >c</span>
  </GridLayout>
</template>

<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { FreeDom, FreeScene, GridLayout } from '@sepveneto/free-dom'
import '@sepveneto/free-dom/css'
import { ref } from 'vue'

const layout = ref([
  { i: 'a', x: 0, y: 0, w: 1, h: 2 },
  { i: 'b', x: 1, y: 0, w: 3, h: 2 },
  { i: 'c', x: 2, y: 0, w: 1, h: 2 },
])
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
