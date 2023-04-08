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
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
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
   }
});
