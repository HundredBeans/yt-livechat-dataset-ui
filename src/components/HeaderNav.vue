<template>
  <header class="fixed backdrop-blur-md w-full px-8 text-black dark:text-white">
    <nav class="flex flex-row h-16 align-middle items-center gap-8">
      <a href="/">
        <span class="font-bold text-xl">YT Livechat Dataset</span>
      </a>
      <div class="grow"></div>
      <ThemeSwitcher />
    </nav>
  </header>
</template>

<script>
import ThemeSwitcher from './ThemeSwitcher.vue'

export default {
  components: {
    ThemeSwitcher
  }
}
</script>

<style>
</style>