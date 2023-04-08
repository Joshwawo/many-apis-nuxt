<template>
  <div class="container mx-auto mt-10">
    <NForm :rules="RULES">
      <NSpace vertical>
        <NFormItem path="voice" label="Voice actor">
          <NSelect v-model:value="selectedVoice" :options="voicesList" placeholder="Select a voice" filterable />
        </NFormItem>
      </NSpace>

      <NSpace>
        <NFormItem label="Change language">
          <NSelect v-model:value="langSelected" :options="langList" @update:value="getVoices" filterable />
        </NFormItem>


      </NSpace>


      <NSpace vertical>
        <NFormItem path="prompt" label="Prompt">
          <NInput v-model:value="prompt" type="textarea" placeholder="Escribe algo" show-count :style="{
            width: '100%',
            height: '200px',

          }" />
        </NFormItem>
      </NSpace>
      <p class="text-gray-400/90 inline-block px-2">To ensure processing accuracy, we automatically remove any special
        characters or accents from the entered text. This means that only letters and numbers will be preserved in the
        final result. This function is used to prevent errors in text processing by the model.</p>
      <NButton class="mt-5  w-full text-center text-white" type="primary" @click="voiceGeneratedFn" :disabled="loading">
        Enviar</NButton>

    </NForm>



    <template v-if="voiceGenerate.length > 0">
      <div class=" mt-20 text-white capitalize" v-for="(voice, index) in voiceGenerate" :key="index">
        <p class="text-2xl font-bold ">Trascription</p>
        <p class="mb-3">{{ voice.tts }} </p>
        <audio class=" block w-full mb-3 " controls>
          <source class="bg-red-500" :src="voice.path" type="audio/mpeg">
        </audio>

        <div class="flex justify-between">
          <div>
            <p class="text-xl font-semibold">Voice actor </p>
            <p class="mb-3">{{ voice.display_voice }}</p>
          </div>
          <div>
            <p class="text-xl font-semibold">Initial created</p>
            <p class="mb-3">{{ dateFormater(voice.started_at) }}</p>
          </div>
          <div>
            <p class="text-xl font-semibold">Final created </p>
            <p>{{ dateFormater(voice.finished_at) }}</p>
          </div>
        </div>

      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import axios from 'axios'
import { useTssStore } from '@/store/tssStore'
import { storeToRefs } from 'pinia'
import { NSpace, NSelect, NInput, NForm, NFormItem, NButton, useNotification, NP, NH2 } from 'naive-ui'
import { dateFormater } from '@/helpers/formaters'
definePageMeta({
  title: 'Texto to speech',
  description: 'TTS',
  keywords: 'TTS',
})
const { dataVoice, loading, prompt, selectedVoice, voiceGenerate, listLangs, langSelected } = storeToRefs(useTssStore())
//
const RULES = {
  voice: [
    {
      required: true,
      message: 'Please select a voice',
      trigger: 'blur'
    }
  ],
  prompt: [
    {
      required: true,
      message: 'Please enter a prompt',
      trigger: 'blur'
    }
  ]
}
onMounted(() => {
  getVoices()
})




const notification = useNotification()
//Para garantizar la precisión del procesamiento, eliminamos automáticamente cualquier carácter especial o acento del texto que ingreses. De esta manera, solo se conservarán letras y números en el resultado final. Esta función se utiliza para evitar errores en el procesamiento de texto por parte del modeloPara garantizar la precisión del procesamiento, eliminamos automáticamente cualquier carácter especial o acento del texto que ingreses. De esta manera, solo se conservarán letras y números en el resultado final. Esta función se utiliza para evitar errores en el procesamiento de texto por parte del modelo
const getVoices = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/voices/all-voice?mode=tts-basic&lang=${langSelected.value}`)
    dataVoice.value = response.data

  } catch (error) {
    console.log(error)
  }
}

const voiceGeneratedFn = async () => {
  loading.value = true
  if (prompt.value === "" || selectedVoice.value === "" || selectedVoice.value === null) {
    notification.info({
      title: 'Warning',
      description: 'Please fill in all the fields',
      duration: 3000,
    })
    loading.value = false
    return
  }
  try {

    const urlBase = "http://localhost:3000/api/voices/voice"
    const response = await axios.post(urlBase, {
      voice: selectedVoice.value?.split('|')[0].trim(),
      tts: prompt.value,
      display_voice: selectedVoice.value?.split('|')[1].trim(),
    })
    console.log(response.data)
    voiceGenerate.value = [...voiceGenerate.value, response.data]
    notification.success({
      title: 'Success',
      description: 'Success',
      duration: 3000,
    })
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

const voicesList = computed(() => {
  return dataVoice.value.map((voice) => {
    return {
      label: voice.display_name,
      value: `${voice.name} | ${voice.display_name}`
    }
  })
})

const langList = computed(() => {
  return listLangs.value.map((lang) => {
    return {
      label: lang.label,
      value: lang.value
    }
  })
})

watch(prompt, (newValue) => {
  prompt.value = newValue.replace(/[^a-zA-Z0-9 ]/gi, '')
})
</script>

<style scoped>
audio {
  width: 100%;
  max-width: 500px;
  height: 50px;
}

audio::-webkit-media-controls-panel {
  background-color: #acb1bb;
}
</style>