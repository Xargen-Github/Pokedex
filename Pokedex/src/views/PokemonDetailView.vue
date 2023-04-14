<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import axios from 'axios'
import type { PokemonDetails, PokemonSpecies, EvolutionChain } from '@/types/pokemonTypes'
import Card from 'primevue/card'
import ProgressBar from 'primevue/progressbar'
import Tag from 'primevue/tag'
import PokemonTypeTag from './PokemonTypeTag.vue'
import { usePokemonStore } from '@/stores/usePokemonStore'
import { useUserDataStore } from '@/stores/useUserDataStore'
import { storeToRefs } from 'pinia'
import PokemonListItem from './PokemonListItem.vue'
import {
    idFromUrl,
    getEvolutionChainRecursive,
    getIdsFromEvolutionChainRecursive
} from '@/utils/pokemonUtils'
import PrimeVueImage from 'primevue/image'
import PrimeVueButton from 'primevue/button'
import TopBar from './TopBar.vue'

export default defineComponent({
    setup() {
        const pokemonStore = usePokemonStore()
        const { getPokemonByIds } = storeToRefs(pokemonStore)
        
        const userDataStore = useUserDataStore();
        const { isFavouritePokemon } = storeToRefs(userDataStore)

        return { getPokemonByIds, isFavouritePokemon, pokemonStore, userDataStore, getIdsFromEvolutionChainRecursive }
    },
    components: {
        Card,
        ProgressBar,
        Tag,
        PokemonTypeTag,
        PokemonListItem,
        PrimeVueImage,
        PrimeVueButton,
        TopBar
    },
    data() {
        return {
            pokemon: {} as PokemonDetails,
            species: {} as PokemonSpecies
        }
    },
    created() {
        this.$watch(
            () => this.$route.params,
            async () => {
                this.fetchData()
            }
        )
    },
    async beforeMount() {
        this.fetchData()
    },
    methods: {
        async fetchPokemon() {
            try {
                //Fetch pokemon data
                const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.$route.params.id}`)
                this.pokemon = data.data
                console.log(this.pokemon.sprites.front_default)
            } catch (error) {
                console.log(error)
            }
        },
        async fetchPokemonSpecies(id: number) {
            const data = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
            const speciesData = data.data
            const species: PokemonSpecies = {
                name: speciesData.name,
                id: speciesData.id,
                evolution_chain: await this.fetchEvolutionChain(idFromUrl(speciesData.evolution_chain.url))
            }
            this.species = species
        },
        async fetchEvolutionChain(id: number) {
            const data = await axios.get(`https://pokeapi.co/api/v2/evolution-chain/${id}`)
            const evolutionChainData = data.data
            const evolutionChain: EvolutionChain = getEvolutionChainRecursive(evolutionChainData.chain)
            return evolutionChain
        },
        async fetchData() {
            await this.fetchPokemon()
            this.fetchPokemonSpecies(this.pokemon.id)
        }
    }
})
</script>

<template>
    <div class="bg-green-300 text-black min-h-screen">
        <TopBar>
            <template v-slot:bar>
                <span>{{ pokemon.name }}</span>
                <PrimeVueButton v-if="isFavouritePokemon(pokemon)" icon="pi pi-heart-fill text-black bg-transparent" text rounded severity="secondary" @click="userDataStore.removeFavourite(pokemon)"/>
                <PrimeVueButton v-else icon="pi pi-heart text-black bg-transparent" text rounded severity="secondary" @click="userDataStore.addFavourite(pokemon)"/>
            </template>
        </TopBar>
        <div class="p-4">
            <h1 class="text-white text-3xl font-bold capitalize">{{ pokemon.name }}</h1>
            <div v-if="pokemon.sprites != undefined" class="flex flex-row justify-center">
                <PrimeVueImage image-class="w-screen h-auto w-52 max-h-screen" :src="pokemon.sprites.front_default" preview />
            </div>
            <h2 class="text-white">About</h2>
            <Card>
                <template #content>
                    <p class="text-sm text-black">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error
                        repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa
                        ratione quam perferendis esse, cupiditate neque quas!
                    </p>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="contents">
                            <div class="flex-1 text-gray-500">Type</div>
                            <div class="flex-1">
                                <PokemonTypeTag v-for="pokemonTypeSlot in pokemon.types" :key="pokemonTypeSlot.slot"
                                    :pokemon-type="pokemonTypeSlot.type"></PokemonTypeTag>
                            </div>
                        </div>
                        <div class="contents">
                            <div class="flex-1 text-gray-500">Nummer</div>
                            <div class="flex-1">{{ pokemon.id }}</div>
                        </div>
                        <div class="contents">
                            <div class="flex-1 text-gray-500">Hoogte</div>
                            <div class="flex-1">{{ pokemon.height }}</div>
                        </div>
                        <div class="contents">
                            <div class="flex-1 text-gray-500">Gewicht</div>
                            <div class="flex-1">{{ pokemon.weight }}</div>
                        </div>
                        <div class="contents">
                            <div class="flex-1 text-gray-500">Categorie</div>
                            <div class="flex-1">Seed</div>
                        </div>
                        <div class="contents">
                            <div class="flex-1 text-gray-500">Geslacht</div>
                            <div class="flex-1">M/F</div>
                        </div>
                        <div class="contents">
                            <div class="flex-1 text-gray-500">Vaardigheden</div>
                            <div class="flex-1">Overgroeien</div>
                        </div>
                    </div>
                </template>
            </Card>

            <h2 class="text-white">Statistieken</h2>
            <Card>
                <template #content>
                    <div class="grid grid-cols-3 gap-4">
                        <div class="contents" v-for="pokemonStat in pokemon.stats" :key="pokemonStat.stat.name">
                            <div class="flex-1 text-gray-500">{{ pokemonStat.stat.name }}</div>
                            <div class="flex-1 text-black">{{ pokemonStat.base_stat }}</div>
                            <div class="flex-1">
                                <ProgressBar :value="pokemonStat.base_stat" :show-value="false"></ProgressBar>
                            </div>
                        </div>
                    </div>
                </template>
            </Card>

            <h2 class="text-white">Moveset</h2>
            <Card>
                <template #content>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="flex flex-row" v-for="pokemonType in pokemon.types" :key="pokemonType.slot">
                            <Tag value="Level 1" rounded></Tag>
                            <div class="flex-1 text-black">{{ pokemonType.type.name }}</div>
                        </div>
                    </div>
                </template>
            </Card>

            <h2 class="text-white">Evolutie</h2>
            <div v-if="species.evolution_chain != undefined" class="w-full flex flex-col gap-1">
                <PokemonListItem v-for="p of getPokemonByIds(getIdsFromEvolutionChainRecursive(species.evolution_chain))"
                    :key="p.id" :pokemon="p" />
            </div>
        </div>
    </div>
</template>
