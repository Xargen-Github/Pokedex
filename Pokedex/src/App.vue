<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import SearchView from './views/SearchView.vue';
// import { usePokemonStore } from '@/stores/usePokemonStore'
// import { storeToRefs } from 'pinia'
// const store = usePokemonStore();
// const { getPokemonList, getPokemonTypesList } = storeToRefs(store)

// store.fetchPokemonTypes();
// store.fetchPokemon();
</script>

<template>
  <SearchView />

  <!-- <RouterView /> -->
</template>