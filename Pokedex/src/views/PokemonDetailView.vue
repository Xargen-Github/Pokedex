<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import axios from 'axios'
import type { PokemonDetails } from '@/types/pokemonTypes'
import Card from 'primevue/card';

export default defineComponent({
    components: {
        Card
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
        <Card>
            <template #title> Simple Card </template>
            <template #content>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
                    quas!
                </p>
            </template>
        </Card>
    </div>
</template>
