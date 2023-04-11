<script setup lang="ts">
import { usePokemonStore } from '@/stores/usePokemonStore'
import { storeToRefs } from 'pinia'
const store = usePokemonStore();
const { getPokemonList, getPokemonTypesList } = storeToRefs(store)

store.fetchPokemonTypes();
store.fetchPokemon();
</script>

<template>
    <div class="bg-white text-black">
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
        <form>
            <input type="search" placeholder="Pokémon zoeken" />
        </form>
        <div>
            <button>
                Mijn team
            </button>
            <button>
                Favorieten
            </button>
        </div>
        <div class="w-full">
            <div class="w-5/6 shadow-xl m-8 bg-white rounded-lg" v-for="pokemon of getPokemonList">
                <img />
                <h2>{{ pokemon.name }}</h2>
                <p>Nr. {{ pokemon.id }}</p>
                <span v-for="[pokemonTypeKey, pokemonType] in pokemon.types">
                    {{ pokemonType.name }}
                </span>
            </div>
        </div>
    </div></template>
