<script setup lang="ts">
import { usePokemonStore } from '@/stores/usePokemonStore'
import { storeToRefs } from 'pinia'
import PokemonListItem from './PokemonListItem.vue';
import LargeColoredButton from './LargeColoredButton.vue';
import { onBeforeMount } from 'vue'
const store = usePokemonStore();
const { getPokemonList } = storeToRefs(store)

onBeforeMount(() => {
    store.fetchPokemonTypes()
    store.fetchPokemon()
})
</script>

<template>
    <div class="bg-white text-black p-4 flex gap-2 flex-col">
        <div class="block text-right">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6 inline">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6 inline">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
            </svg>
        </div>
        <h1 class="text-3xl font-bold">Pokédex</h1>
        <form class="w-full bg-slate-100 rounded-lg box-border flex flex-row text-slate-400 h-8">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="grow-0 box-border pl-2 py-1 h-full">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input class="bg-inherit h-full px-2 py-1 flex-1" type="search" placeholder="Pokémon zoeken" />
        </form>
        <div class="flex gap-2">
            <LargeColoredButton class="bg-violet-800 flex-auto">
                <template v-slot:title>
                    Mijn team
                </template>
                <template v-slot:subTitle>
                    5 pokemons
                </template>
            </LargeColoredButton>
            <LargeColoredButton class="bg-teal-400 flex-auto">
                <template v-slot:title>
                    Favorieten
                </template>
                <template v-slot:subTitle>
                    12 pokemons
                </template>
            </LargeColoredButton>
        </div>
        <div class="w-full flex flex-col gap-1">
            <PokemonListItem v-for="pokemon of getPokemonList" :key="pokemon.id" :pokemon="pokemon"/>
        </div>
    </div></template>
