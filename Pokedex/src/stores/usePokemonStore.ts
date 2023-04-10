import { defineStore } from "pinia";
import axios from "axios";

interface PokemonDetails {
    id: number,
    name: string,
    types: Map<number, PokemonType>
}

interface PokemonType {
    id: number,
    name: string
}

export const usePokemonStore = defineStore('pokemon', {
    state: () => ({ 
        pokemon: [] as PokemonDetails[],
        pokemonTypes: [] as PokemonType[]
    }),

    getters: {
        getPokemonList: (state) => state.pokemon,
        getPokemonTypesList: (state) => state.pokemonTypes
    },
    
    actions: {
        async fetchPokemon() {
            try {
                const data = await axios.get('https://stoplight.io/mocks/appwise-be/pokemon/57519009/pokemon')
                this.pokemon = data.data.map((detail: any): PokemonDetails => {
                    const typeMap = new Map<number, PokemonType>();
                    detail.types.forEach((pokemonType: { slot: number; type: { name: string; }; }) => {
                        const foundPokemonType = this.getPokemonTypeByName(pokemonType.type.name);
                        if (foundPokemonType !== undefined) {
                            typeMap.set(pokemonType.slot, foundPokemonType);
                        }
                    });
                    return {
                        id: detail.id,
                        name: detail.name,
                        types: typeMap,
                        }
                    })
            }
            catch (error) {
                console.log(error)
            }
        },
        async fetchPokemonTypes() {
            try {
                const data = await axios.get('https://pokeapi.co/api/v2/type')

                this.pokemonTypes= data.data.results.map((pokemonType: { url: string; name: string; }): PokemonType => {
                    return {
                        id: Number(pokemonType.url.split("/").at(-2)),
                        name: pokemonType.name,
                    }
                })
            }
            catch (error) {
                console.log(error)
            }
        },
        getPokemonTypeByName(name: string) {
            return this.pokemonTypes.find((pokemonType) => pokemonType.name == name.toLowerCase())
        }
    }
})