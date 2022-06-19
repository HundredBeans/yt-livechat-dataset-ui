<template>
  <button @click="toggleTheme" class="w-6 h-6 dark:text-white text-black">
    <SunIcon v-if="theme === 'light'" />
    <MoonIcon v-else />
  </button>
</template>

<script>
import {SunIcon, MoonIcon} from "@heroicons/vue/outline"

export default {
  components: {
    SunIcon,
    MoonIcon
  },
  data() {
    return {
      theme: '',
    }
  },
  beforeMount() {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      this.setTheme('dark')
    } else {
      this.setTheme('light')
    }
    console.log('theme', this.theme)
  },
  methods: {
    toggleTheme() {
      if (this.theme === 'dark') {
        this.setTheme('light')
      } else {
        this.setTheme('dark')
      }
    },
    setTheme(type) {
      if (type === 'dark') {
        document.documentElement.classList.add('dark')
        this.theme = 'dark'
        localStorage.theme = 'dark'
      } else if (type === 'light') {
        document.documentElement.classList.remove('dark')
        this.theme = 'light'
        localStorage.theme = 'light'
      }
    }
  }
}
</script>

<style>

</style>