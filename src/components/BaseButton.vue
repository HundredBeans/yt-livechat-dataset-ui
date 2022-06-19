<template>
  <button class="h-12 px-6 font-semibold rounded-md border dark:border-slate-800 hover:border-slate-700 dark:hover:border-slate-200 text-slate-900 dark:text-white" type="button">
    <slot></slot>
  </button>
</template>

<script lang="ts">
export default {
  data() {
    return {
      name: "Asd"
    }
  },
  methods: {
    handleClick() {
      console.log('clicked')
    }
  }
}
</script>

<style>

</style>