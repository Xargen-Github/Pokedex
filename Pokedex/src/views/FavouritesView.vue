<script setup lang="ts">
    import TopBar from './TopBar.vue';
    import { usePokemonStore } from '@/stores/usePokemonStore';
    import { storeToRefs } from 'pinia'
    import PokemonListItem from './PokemonListItem.vue';

    const store = usePokemonStore();
    const { getFavouritePokemon } = storeToRefs(store)
</script>

<template>
    <div class="bg-teal-400 text-white min-h-screen ">
        <TopBar></TopBar>
        <div class="p-4 flex gap-2 flex-col">
            <h1 class="text-white text-3xl font-bold capitalize">Favorieten</h1>
            <div class="w-full flex flex-col gap-1">
                <PokemonListItem v-for="p of getFavouritePokemon" :key="p.id" :pokemon="p"/>
            </div>
        </div>
    </div>
</template>