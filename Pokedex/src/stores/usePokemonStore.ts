import { defineStore } from "pinia";
import axios from "axios";
import { type PokemonDetails, type PokemonType, SortingOrderPokemon, type PokemonSpecies, type EvolutionChain } from "@/types/pokemonTypes";
import { idFromUrl } from "@/utils/pokemonUtils";

export const usePokemonStore = defineStore('pokemon', {
    state: () => ({ 
        pokemon: [] as PokemonDetails[],
        pokemonTypes: [] as PokemonType[],
        favourites: new Set() as Set<number>
    }),

    getters: {
        getPokemonList: (state) => {
            return (sortingOrder: SortingOrderPokemon = SortingOrderPokemon.NUM_ASC, searchText: string = "") => 
                state.pokemon.filter((p) => {
                    searchText = searchText.toLowerCase()
                    return p.id.toString().includes(searchText) || p.name.toLowerCase().includes(searchText)
                })
                .sort(sortingOrder.orderingFunction)
        },
        getPokemonTypesList: (state) => state.pokemonTypes,
        
        getPokemonByIds: (state) => {
            return (ids: number[]) => { 
                return state.pokemon.filter((p) => ids.includes(p.id)) 
            }
        },
        getPokemonTypeByName: (state) => {
            return (name: string) => {
                //Return PokemonType with given name from pokemonTypes list
                return state.pokemonTypes.find((pokemonType) => pokemonType.name == name.toLowerCase())
            }
        },
        getFavouritePokemon: (state) => {
            return state.pokemon.filter((p) => state.favourites.has(p.id))
        },
        getFavouritesCount: (state) => {
            return state.favourites.size
        },
        isFavouritePokemon: (state) => {
            return (favPokemon: PokemonDetails) => { 
                return state.favourites.has(favPokemon.id)
            }
        }
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
                    return detail;
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
                        id: idFromUrl(pokemonType.url),
                        name: pokemonType.name,
                    }
                })
            }
            catch (error) {
                console.log(error)
            }
        },
        addFavourite(pokemonDetails: PokemonDetails) {
            this.favourites.add(pokemonDetails.id)
        },
        removeFavourite(pokemonDetails: PokemonDetails) {
            this.favourites.delete(pokemonDetails.id)
        }
    }
})