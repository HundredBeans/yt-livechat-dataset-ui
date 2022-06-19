import { defineConfig } from 'astro/config';

import vue from "@astrojs/vue"

import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), tailwind(), partytown()]
});