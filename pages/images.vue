<template>
  <div class="text-gray-300">
    <NForm :rules="RULES">
      <NFormItem path="imageQuery" label="Prompt">
        <NInput v-model:value="imageQuery" type="text" placeholder="Escribe algo" show-count :style="{}" />
      </NFormItem>
      <NFormItem path="imageLimit" label="imageLimit">
        <NInputNumber v-model:value="imageLimit" min="0" max="40" placeholder="Escribe algo" show-count :style="{}" />
      </NFormItem>
      <NSpace>
        <NCheckbox v-model:checked="allowNsfw" :default-checked="allowNsfw">Allow NSFW</NCheckbox>
      </NSpace>
      <NButton @click="getImages" class="mt-5">Search</NButton>
    </NForm>
    <template v-if="dataImages.length > 0">
      <div class="mt-20 columns-5">
        <div class="" v-for="image in dataImages " :key="image.id"> 
          <img :src="image.src" :alt="image.prompt" class="">
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import axios from 'axios'
import { NForm, NInput, NInputNumber, NFormItem, NButton, NCheckbox, NSpace } from 'naive-ui'
import { useImageStore } from '@/store/imageStore'
import {ImagesTypes} from '@/types/images'

const { imageQuery, imageLimit, allowNsfw,dataImages } = storeToRefs(useImageStore())

const getImages = async () => {
  // const { data, error } = await useAsyncData("http://192.168.1.8:3000", () => $fetch(`/api/images/searchengine?q=${imageQuery.value}&limit=${imageLimit.value}`))
  // if (error) {
  //   console.log(error.value)
  // }
  const BASEURL = "http://192.168.1.8:3000"
  const response = await axios.get(`${BASEURL}/api/images/searchengine?q=${imageQuery.value}&limit=${imageLimit.value}`)
  console.log(response.data)

  dataImages.value = [...dataImages.value,...response.data]

}
const RULES = {
  imageQuery: [
    {
      required: true,
      message: 'Please enter a query',
      trigger: 'blur'
    }
  ],
  imageLimit: [
    {
      required: true,
      message: 'Please enter a limit',
      trigger: 'blur'
    }
  ]
}



</script>

<style scoped></style>