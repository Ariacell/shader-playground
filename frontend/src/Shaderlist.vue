<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const shader_entry_list = ref(``)


  onMounted(() => {
    axios
      .get('http://localhost:80/read_db.php')
      .then(response => (shader_entry_list.value = response))
  })
const count = ref(0)
</script>

<template>
  <button @click="count++">You clicked this {{ count }} times.</button>
    <div id="list">
    {{ shader_entry_list.valueOf() }}
    </div>
</template>