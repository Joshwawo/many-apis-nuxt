<script lang="ts" setup>
import { NConfigProvider, darkTheme, NNotificationProvider } from 'naive-ui'

</script>

<template>
    <div class="container mx-auto">
      <title>{{ $route.meta.title }}</title>
      <NConfigProvider :theme="darkTheme">
        <NNotificationProvider>
          <header>
            <nav class="text-gray-300 font-semibold text-lg flex justify-end gap-x-4  mt-5">
              <NuxtLink to="/" class="hover:text-gray-400" >Home</NuxtLink>
              <NuxtLink to="/tts" class="hover:text-gray-400" >TTS</NuxtLink>
              <NuxtLink to="/images" class="hover:text-gray-400" >Images</NuxtLink>
            </nav>
          </header>
          <NuxtPage />
        </NNotificationProvider>
      </NConfigProvider>
    </div>
</template>



<style >

html {
  background-color: #1a202c;
}
</style>
