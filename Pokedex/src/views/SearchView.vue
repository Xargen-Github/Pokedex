<script setup lang="ts">
import { usePokemonStore } from '@/stores/usePokemonStore'
import { SortingOrderPokemon } from "@/types/pokemonTypes";
import { storeToRefs } from 'pinia'
import PokemonListItem from './PokemonListItem.vue';
import LargeColoredButton from './LargeColoredButton.vue';
import { onBeforeMount, onMounted, ref } from 'vue'
import PopUpSelection from './PopUpSelection.vue';

const store = usePokemonStore();
const { getPokemonList } = storeToRefs(store)

const sortingOrder = ref(SortingOrderPokemon.NUM_ASC);
const searchText = ref("");

function updateSortingOrder(so:any) {
    sortingOrder.value = so
}
</script>

<template>
    <div class="bg-white text-black p-4 flex gap-2 flex-col min-h-screen">
        <div class="block text-right">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6 inline">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
            </svg>
            <PopUpSelection :modelValue="sortingOrder"
                @update:modelValue="updateSortingOrder" 
                :items="[
                    SortingOrderPokemon.ALFA_ASC,
                    SortingOrderPokemon.ALFA_DESC,
                    SortingOrderPokemon.NUM_ASC,
                    SortingOrderPokemon.NUM_DESC
                ]" 
                :initial="SortingOrderPokemon.ALFA_ASC"/>
        </div>
        <h1 class="text-3xl font-bold">Pokédex</h1>
        <form class="w-full bg-slate-100 rounded-lg box-border flex flex-row text-slate-400 h-8">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="grow-0 box-border pl-2 py-1 h-full">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input v-model="searchText" class="bg-inherit h-full px-2 py-1 flex-1" type="text" placeholder="Pokémon zoeken" />
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
            <PokemonListItem v-for="p of getPokemonList(sortingOrder, searchText)" :key="p.id" :pokemon="p"/>
        </div>
    </div>
</template>
