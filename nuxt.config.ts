// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    transpile:
      process.env.NODE_ENV === "production"
        ? [
            "naive-ui",
            "vueuc",
            "@css-render/vue3-ssr",
            "@juggle/resize-observer",
          ]
        : ["@juggle/resize-observer"],
  },
  vite: {
    optimizeDeps: {
      include:
        process.env.NODE_ENV === "development"
          ? ["naive-ui", "vueuc", "date-fns-tz/esm/formatInTimeZone"]
          : [],
    },
    

  },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@nuxt/image-edge"],
  routeRules: {
    "/examples/*": { redirect: "/redirect-route" },
    "/modify-headers-route": {
      headers: {
        "x-magic-of": "nuxt and vercel",
      },
    },
    "/spa": { ssr: false },
  },
   typescript:{
    strict: true,
   },
   privateRuntimeConfig:{
    NUXT_API_CLASH: process.env.NUXT_API_CLASH,
    NUXT_LOL_API_KEY: process.env.NUXT_LOL_API_KEY,
    API_KEY_UBERDUCK: process.env.API_KEY_UBERDUCK,

   }
   
   
   
} as any);
