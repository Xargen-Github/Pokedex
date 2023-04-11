import { defineStore } from "pinia";
import axios from "axios";
import type { PokemonDetails, PokemonType, SortingOrderPokemon } from "@/types/pokemonTypes";

export const usePokemonStore = defineStore('pokemon', {
    state: () => ({ 
        pokemon: [] as PokemonDetails[],
        pokemonTypes: [] as PokemonType[]
    }),

    getters: {
        getPokemonList: (state) => {
            return (sortingOrder: SortingOrderPokemon) => state.pokemon.sort(sortingOrder.orderingFunction)
        },
        getPokemonTypesList: (state) => state.pokemonTypes
    },
    
    actions: {
        async fetchPokemon() {
            try {
                //Fetch pokemon data
                const data = await axios.get('https://stoplight.io/mocks/appwise-be/pokemon/57519009/pokemon')
                //Convert data into list of PokemonDetails
                this.pokemon = data.data.map((detail: any): PokemonDetails => {
                    //Convert data into map with slot number as key and PokemonType as value
                    const typeMap = new Map<number, PokemonType>();
                    detail.types.forEach((pokemonType: { slot: number; type: { name: string; }; }) => {
                        //Get PokemonType by name
                        const foundPokemonType = this.getPokemonTypeByName(pokemonType.type.name);
                        if (foundPokemonType !== undefined) {
                            typeMap.set(pokemonType.slot, foundPokemonType);
                        }
                    });
                    //Return PokemonDetails
                    return {
                        id: detail.id,
                        name: detail.name,
                        types: typeMap,
                        sprites: detail.sprites
                        }
                    })
            }
            catch (error) {
                console.log(error)
            }
        },
        async fetchPokemonTypes() {
            try {
                //Fetch pokemon type data
                const data = await axios.get('https://pokeapi.co/api/v2/type')
                
                //Convert data into list of PokemonType
                this.pokemonTypes= data.data.results.map((pokemonType: { url: string; name: string; }): PokemonType => {
                    //Return PokemonType
                    return {
                        //Retrieve id from url
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
            //Return PokemonType with given name from pokemonTypes list
            return this.pokemonTypes.find((pokemonType) => pokemonType.name == name.toLowerCase())
        }
    }
})