<script setup lang="ts">
defineProps<{
  title: string
  number: number
}>()
</script>

<template>
    <div class="shader-list-entry">
        #{{ number }} : {{ title }} 
    </div>
</template>