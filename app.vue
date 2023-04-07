<script lang="ts" setup>
import {NButton, NConfigProvider, darkTheme, NNotificationProvider} from 'naive-ui'

</script>

<template>
  <div class="">
  <NConfigProvider :theme="darkTheme">
      <NNotificationProvider>
        <NuxtPage/>
      </NNotificationProvider>
  </NConfigProvider>
  </div>
</template>



<style >

body {
  background-color: #1a202c;
}

</style>
