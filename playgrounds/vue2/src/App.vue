<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <FreeDom>
      <HelloWorld msg="Welcome to Your Vue.js App"/>
    </FreeDom>
  </div>
</template>

<script>
import { FreeDom } from '@sepveneto/free-dom'
import '@sepveneto/free-dom/css'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    FreeDom,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
