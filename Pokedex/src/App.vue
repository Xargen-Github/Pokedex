<script setup lang="ts">
import { usePokemonStore } from '@/stores/usePokemonStore'
import { onBeforeMount } from 'vue'

const store = usePokemonStore()

onBeforeMount(() => {
  store.fetchPokemonTypes()
  store.fetchPokemon()
})
</script>

<template>
  <RouterView />
</template>
