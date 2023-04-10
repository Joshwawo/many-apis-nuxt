import {ref} from 'vue'
import {defineStore} from 'pinia'
import type {ImagesTypes,ImgSusRandomTypes} from '@/types/images'

export const useImageStore = defineStore("images", () =>{

  const imageQuery = ref("")
  const imageLimit = ref(5)
  const allowNsfw = ref(true)
  const dataImages = ref<ImagesTypes[]>([])
  const imageLoading = ref(false)
  const randomSusImg = ref<ImgSusRandomTypes>({} as ImgSusRandomTypes)

  return {
    imageQuery,
    imageLimit,
    allowNsfw,
    dataImages,
    imageLoading,
    randomSusImg
  }

})