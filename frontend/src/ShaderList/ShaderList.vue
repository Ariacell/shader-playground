<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import ShaderListEntry from './ShaderListEntry.vue'
import type { ShaderListDataEntry } from '@/models/ShaderListDataEntry'

const shader_entry_list = ref<ShaderListDataEntry[]>([])

const server_address = import.meta.env.VITE_SERVER_BASE_URL

onMounted(() => {
  axios
    .get(`${server_address}/read_db.php`)
    .then(response => {
      shader_entry_list.value = response.data
    })
})
const count = ref(0)

</script>

<template>
  <button @click="count++">You clicked this {{ count }} times.</button>
  <div>Available shaders to load:
  <!-- https://vuejs.org/guide/essentials/list was useful here, more to learn! -->
  <ShaderListEntry v-for="(item, index) in shader_entry_list" :number=index+1 :title="item.title" :index="index"
    :key="item.id" />
    </div>
</template>