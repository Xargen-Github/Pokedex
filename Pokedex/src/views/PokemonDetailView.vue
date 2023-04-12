<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import axios from 'axios'
import type { PokemonDetails } from '@/types/pokemonTypes'
import Card from 'primevue/card';
import ProgressBar from 'primevue/progressbar';
import Tag from 'primevue/tag';

export default defineComponent({
    components: {
        Card,
        ProgressBar,
        Tag
    },
    data() {
        return {
            pokemon: Object as PropType<PokemonDetails>
        }
    },
    beforeMount() {
        this.fetchPokemon()
    },
    methods: {
        async fetchPokemon() {
            try {
                //Fetch pokemon data
                const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.$route.params.id}`)
                this.pokemon = data.data;
                console.log(this.pokemon);
            } catch (error) {
                console.log(error)
            }
        },

    },
})
</script>

<template>
    <div class="bg-green-300 text-black p-4 min-h-screen">
        <h1>Details: {{ $route.params.id }}</h1>
        <h2 class="text-white">About</h2>
        <Card>
            <template #content>
                <p class="text-sm text-black">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
                    quas!
                </p>
                <div class="grid grid-cols-2 gap-4">
                    <div class="contents">
                        <div class="flex-1 text-gray-500">Nummer</div>
                        <div class="flex-1">001</div>
                    </div>
                </div>
            </template>
        </Card>
        
        <h2 class="text-white">Statistieken</h2>
        <Card>
            <template #content>
                <div class="grid grid-cols-3 gap-4">
                    <div class="contents">
                        <div class="flex-1 text-gray-500">HP</div>
                        <div class="flex-1 text-black">50</div>
                        <div class="flex-1">
                            <ProgressBar :value="50" :show-value="false"></ProgressBar>
                        </div>
                    </div>
                </div>
            </template>
        </Card>
        
        <h2 class="text-white">Moveset</h2>
        <Card>
            <template #content>
                <div class="grid grid-cols-2 gap-4">
                    <div class="flex flex-row">
                        <Tag value="Level 1" rounded></Tag>
                        <div class="flex-1 text-black">Tackle</div>
                    </div>
                    <div class="flex flex-row">
                        <Tag value="Level 3" rounded></Tag>
                        <div class="flex-1 text-black">Vine whip</div>
                    </div>
                </div>
            </template>
        </Card>
        
        <h2 class="text-white">Evolutie</h2>
        <Card>
            <template #content>
                Pokemonlistitems
            </template>
        </Card>
    </div>
</template>
