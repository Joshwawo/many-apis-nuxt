import { ref } from "vue";
import { defineStore } from "pinia";
import type { AllVoices, ResVoices } from "@/types/tss";

export const useTssStore = defineStore("tts", () => {
  const selectedVoice = ref<string| null>(null);
  const langSelected = ref("english");
  const listLangs = ref([
    {
      label: "English",
      value: "english",
    },
    {
      label: "Spanish",
      value: "spanish",
    },
    {
      label: "Polish",
      value: "polish",
    },
    {
      label: "Portuguese",
      value: "portuguese",
    },
    {
      label: "Dutch",
      value: "dutch",
    }
  ]);
  const prompt = ref<string>("".replace(/[^a-zA-Z0-9\s]/g, ""));
  const dataVoice = ref<AllVoices[]>([]);
  const voiceGenerate = ref<ResVoices[]>([]);
  const loading = ref(false);
  return {
    selectedVoice,
    langSelected,
    prompt,
    dataVoice,
    voiceGenerate,
    loading,
    listLangs,
  };
});
