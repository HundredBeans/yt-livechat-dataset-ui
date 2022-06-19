<template>
  <div class="h-full w-full rounded-md flex flex-col bg-white dark:bg-stone-800 dark:text-gray-300">
    <div :style="thumbnailStyle" class="preview-thumbnail"></div>
    <Link :href="url" target="_blank" rel="noopener noreferrer">
      <h3 class="p-3 font-bold">{{ title }}</h3>
    </Link>
    <slot></slot>
  </div>
</template>

<script>
import Link from "./BaseAnchor.vue"

export default {
  components: {
    Link
  },
  props: {
    url: {
      type: String
    },
    thumbnail: {
      type: String
    },
    title: {
      type: String
    },
  },
  computed: {
    thumbnailStyle() {
      return {
        backgroundImage: `url(${this.thumbnail})`
      }
    }
  }
}
</script>

<style scoped>
.link-preview-card {
  text-align: left;
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 7px;
  border: 1px solid #ccc;
  color: black;
  transition: 0.3s all ease;
  height: fit-content;
  min-width: 350px;
  width: 400px;
}

.preview-thumbnail {
  width: 100%;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 250px;
}
</style>