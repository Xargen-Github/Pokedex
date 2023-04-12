<script lang="ts">
    import { defineComponent } from 'vue'
    import type { PropType } from 'vue'
    import type { PokemonDetails } from "@/types/pokemonTypes"
    
    export default defineComponent({
        props: {
            pokemon: { type: Object as PropType<PokemonDetails>, required: true }
        }
    })
</script>

<template>
    <router-link :to="`/details/${pokemon.id}`" :key="pokemon.id">
        <div class="w-full p-2 shadow-md bg-white rounded-lg flex flex-row h-16">
            <div class="flex-none">
                <img class="h-full w-auto" :src="pokemon.sprites.front_default"/>
            </div>
            <div class="flex-none">
                <h2 class="capitalize font-bold">{{ pokemon.name }}</h2>
                <p class="text-slate-400">Nr. {{ pokemon.id }}</p>
            </div>
            <div class="flex-1 text-right">
                <span class="text-white rounded-full bg-sky-500 px-3 py-1" v-for="[pokemonTypeKey, pokemonType] in pokemon.types" :key="pokemonTypeKey">
                    {{ pokemonType.name }}
                </span>
            </div>
            <div class="flex-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-slate-400">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </div>
        </div>
    </router-link>
</template>