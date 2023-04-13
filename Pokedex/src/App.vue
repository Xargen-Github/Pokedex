<script setup lang="ts">
//import { RouterLink, RouterView } from 'vue-router'
import { usePokemonStore } from '@/stores/usePokemonStore'
import { onBeforeMount } from 'vue'
// import { storeToRefs } from 'pinia'
// const store = usePokemonStore();
// const { getPokemonList, getPokemonTypesList } = storeToRefs(store)

// store.fetchPokemonTypes();
// store.fetchPokemon();
const store = usePokemonStore();


onBeforeMount(() => {
    store.fetchPokemonTypes()
    store.fetchPokemon()
})
</script>

<template>
  <RouterView />
</template>