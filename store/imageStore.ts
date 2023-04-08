import {ref} from 'vue'
import {defineStore} from 'pinia'
import {ImagesTypes} from '@/types/images'

export const useImageStore = defineStore("images", () =>{

  const imageQuery = ref("")
  const imageLimit = ref(5)
  const allowNsfw = ref(true)
  const dataImages = ref<ImagesTypes[]>([])

  return {
    imageQuery,
    imageLimit,
    allowNsfw,
    dataImages
  }

})