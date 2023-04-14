<script setup lang="ts">
import { usePokemonStore } from '@/stores/usePokemonStore'
import { useUserDataStore } from '@/stores/useUserDataStore';
import { SortingOrderPokemon } from "@/types/pokemonTypes";
import { storeToRefs } from 'pinia'
import PokemonListItem from './PokemonListItem.vue';
import LargeColoredButton from './LargeColoredButton.vue';
import { onBeforeMount, onMounted, ref } from 'vue'
import PopUpSelection from './PopUpSelection.vue';
import PrimeVueButton from 'primevue/button'

const pokemonStore = usePokemonStore();
const { getPokemonList } = storeToRefs(pokemonStore)

const userDataStore = useUserDataStore();
const { getFavouritesCount } = storeToRefs(userDataStore)

const sortingOrder = ref(SortingOrderPokemon.NUM_ASC);
const searchText = ref("");

function updateSortingOrder(so:any) {
    sortingOrder.value = so
}
</script>

<template>
    <div class="bg-white text-black p-4 flex gap-2 flex-col min-h-screen">
        <div class="block text-right">
            <PrimeVueButton icon="pi pi-filter text-black bg-transparent" text rounded severity="secondary"/>
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
            <LargeColoredButton class="bg-teal-400 flex-auto" @click="$router.push('/favourites')">
                <template v-slot:title>
                    Favorieten
                </template>
                <template v-slot:subTitle>
                    {{ getFavouritesCount }} pokemon
                </template>
            </LargeColoredButton>
        </div>
        <div class="w-full flex flex-col gap-1">
            <PokemonListItem v-for="p of getPokemonList(sortingOrder, searchText)" :key="p.id" :pokemon="p"/>
        </div>
    </div>
</template>
