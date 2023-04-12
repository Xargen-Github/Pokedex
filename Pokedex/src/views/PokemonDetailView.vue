<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import axios from 'axios'
import type { PokemonDetails } from '@/types/pokemonTypes'

export default defineComponent({
    data() {
        return {
            pokemon: Object as PropType<PokemonDetails>
        }
    },
    methods: {
        async fetchPokemon() {
            try {
                //Fetch pokemon data
                const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.$route.params.id}`)
                this.pokemon = data.data;
            } catch (error) {
                console.log(error)
            }
        }
    }
})
</script>

<template>
    <h1>Details: {{ $route.params.id }}</h1>
</template>
