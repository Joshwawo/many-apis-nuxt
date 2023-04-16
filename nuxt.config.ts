// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig:{
    //the private key is not exposed to the client
    NUXT_MONGO_URI: process.env.NUXT_MONGO_URI,
    app:{
      
    },
    public:{
      nuxtApiClash: process.env.NUXT_API_CLASH,
      nuxtApiUberDuck: process.env.NUXT_API_KEY_UBERDUCK,
      nuxtApiLol: process.env.NUXT_LOL_API_KEY,

    },

   },
  nitro:{
    plugins: ["@/server/config/index.ts"]
  },
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
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@nuxt/image-edge", "@nuxt/devtools"],
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
   
   
   
   
} );
