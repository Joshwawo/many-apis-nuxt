<template>
  <div class="text-gray-300">
    <NForm @submit.prevent="getImages" :rules="RULES">
      <NFormItem path="imageQuery" label="Prompt">
        <NInput
          v-model:value="imageQuery"
          type="text"
          placeholder="Write something"
          show-count
          :style="{}"
        />
      </NFormItem>
      <NFormItem path="imageLimit" label="imageLimit">
        <NInputNumber
          v-model:value="imageLimit"
          min="0"
          max="40"
          placeholder="Escribe algo"
          show-count
          :style="{}"
        />
      </NFormItem>
      <NSpace>
        <NCheckbox v-model:checked="allowNsfw" :default-checked="allowNsfw"
          >Allow NSFW</NCheckbox
        >
      </NSpace>
      <NButton :attr-type="'submit'" :disabled="imageLoading" class="mt-5">Search</NButton>
    </NForm>
    <template v-if="dataImages.length > 0">
      <div class="mt-20 columns-5">
        <template class="" v-for="image in dataImages" :key="image.id">
          <!-- <img :src="image.src" :alt="image.prompt" class="" /> -->
          <NuxtImg :src="image.src" :alt="image.prompt" class="pt-4" loading="lazy"/>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { storeToRefs } from "pinia";
import {
  NForm,
  NInput,
  NInputNumber,
  NFormItem,
  NButton,
  NCheckbox,
  NSpace,
  useNotification,
} from "naive-ui";
// import { clienteAxios } from "@/helpers/clienteAxios";
import { useImageStore } from "@/store/imageStore";
import { ImagesTypes } from "@/types/images";

definePageMeta({
  title: "Images",
  description: "Images Page Description",
  keywords: "Images Page Keywords",
});

//store
const { imageQuery, imageLimit, allowNsfw, dataImages,imageLoading } = storeToRefs(
  useImageStore()
);

//Configs
const notification = useNotification();


//validaciones
const RULES = {
  imageQuery: [
    {
      required: true,
      message: "Please enter a query",
      trigger: "blur",
    },
  ],
  imageLimit: [
    {
      required: true,
      message: "Please enter a limit",
      trigger: "blur",
    },
  ],
};
//metodos
const getImages = async () => {
  imageLoading.value = true
  if([imageQuery.value].includes('')){
     notification.info({
      title: 'Warning',
      description: 'Please fill in all the fields',
      duration: 2000
    })
    imageLoading.value = false
    return 
  }
  try {
    const response = await axios.get<ImagesTypes[]>(
      `/api/images/searchengine?q=${imageQuery.value}&limit=${imageLimit.value}&nsfw=${allowNsfw.value ? 1 : 0}`
    );
    console.log(response.data);
    const uniqueImages = [...dataImages.value, ...response.data]
    .filter((image, index, self) => index === self.findIndex((t) => t.id === image.id));

    dataImages.value = [...uniqueImages];
    notification.success({
      title: "Success",
      description: "Images search successfully",
      duration: 2000,
    });
  } catch (error) {
    console.log(error);
  }finally{
    imageLoading.value = false
  }
};
/**
 * TODO:Quedan pendientes los estilos para images
 */

</script>

<style scoped></style>
