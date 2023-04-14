<script setup lang="ts">
import {ref, computed} from 'vue'
import {NSelect} from 'naive-ui'

definePageMeta({
  title: 'test',
  description: 'Hola desde /test',
  keywords: 'hola, /hola, test',
  // // Open Graph
  // ogTitle: 'Hola',
  // ogDescription: 'Hola desde /hola',
  // ogImage: 'https://example.com/hola.png',
  // ogUrl: 'https://example.com/hola',

  // // Twitter
  // twitterTitle: 'Hola',
  // twitterDescription: 'Hola desde /hola',
  // twitterImage: 'https://example.com/hola.png',
  // twitterCard: 'summary_large_image',
})

const songsDataUser = [
  {
    id:1,
    name: "Everybody's Got Something to Hide Except Me and My Monkey",
  },
  {
    id:2,
    name: "Drive My Car",
  },
  {
    id:3,
    name: "Norwegian Wood",
  },
  {
    id:4,
    name: "You Won't See",
  },
  {
    id:6,
    name: "You Won't See 2",
  }
]
const allSongs = [  {
    id:1,
    name: "Everybody's Got Something to Hide Except Me and My Monkey",
  },
  {
    id:2,
    name: "Drive My Car",
  },
  {
    id:3,
    name: "Norwegian Wood",
  },
  {
    id:4,
    name: "You Won't See",
  },
  {
    id:12,
    name: "miss you ",
  },
  {
    id:13,
    name: "miss you 2",
  },
  {
    id:14,
    name: "miss you 3",
  },
  {
    id:15,
    name: "miss you 4",
  },
]

const dataSongs = computed(() => {
  return songsDataUser.map((song) => {
    return {
      label: song.name,
      value: song.id,
    }
  })
})

const dataAllSongs = computed(() => {
  return allSongs.map((song) => {
    return {
      label: song.name,
      value: song.id,
    }
  })
})



// const  options = [
//         {
//           label: "Everybody's Got Something to Hide Except Me and My Monkey",
//           value: "song0",
//           disabled: true
//         },
//         {
//           label: "Drive My Car",
//           value: "song1"
//         },
//         {
//           label: "Norwegian Wood",
//           value: "song2"
//         },
//         {
//           label: "You Won't See",
//           value: "song3",
//         },
// ]

const songs = ref([] as any)

//new

const setSongs = async () => {
  // reduce((acc: any, song: any) => {
  //       acc.push(song.value)
  //       return acc
  //     }, [])
 return new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(
      songs.value = dataSongs.value.map((song) => {
        return song.value
      })
    )
  }, 3000)
})
}

// console.log(await setSongs() )

  

</script>

<template>
  <div class="bg-gray-900 h-screen">

    <NSelect
      v-model:value="songs"
      :options="dataAllSongs"
      multiple
      placeholder="Select multiple"
      style="width: 300px"
    />

  </div>
</template>



<style scoped>

</style>