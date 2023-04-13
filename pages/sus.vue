<template>
    <div class="text-gray-300">
       <template v-if="randomSusImg.susImg">
          <NuxtImg :src="randomSusImg.susImg" :alt="randomSusImg.susImg" class="h-screen w-screen object-cover" />
         </template>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import {storeToRefs} from 'pinia'
import {useImageStore} from '../store/imageStore'
// import { clienteAxios } from '~/helpers/clienteAxios';
import {ImgSusRandomTypes} from '@/types/images'
const {randomSusImg} = storeToRefs(useImageStore())

const getSusImg = async () => {
   const response =  await axios.get<ImgSusRandomTypes>('/api/images/sus-random')
   randomSusImg.value = response.data
   console.log(response.data)
}

getSusImg()



</script>

<style scoped>

</style>