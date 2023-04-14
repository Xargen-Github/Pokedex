import { defineStore } from "pinia";
import type { PokemonDetails } from "@/types/pokemonTypes";

export const useUserDataStore = defineStore('userData', {
    state: () => ({ 
        favourites: [] as number[]
    }),
    persist: true,
    getters: {
        getFavouritePokemonArray: (state) => {
            return state.favourites
            //return state.pokemon.filter((p) => state.favourites.has(p.id))
        },
        getFavouritesCount: (state) => {
            return state.favourites.length
        },
        isFavouritePokemon: (state) => {
            return (favPokemon: PokemonDetails) => { 
                return state.favourites.includes(favPokemon.id)
            }
        }
    },
    actions: {
        makeFavouritesUnique() {
            this.favourites = [...new Set(this.favourites)]
        },
        addFavourite(pokemonDetails: PokemonDetails) {
            this.favourites.push(pokemonDetails.id)
            this.makeFavouritesUnique()
        },
        removeFavourite(pokemonDetails: PokemonDetails) {
            this.favourites = this.favourites.filter((fav) => fav != pokemonDetails.id)
        }
    }
})