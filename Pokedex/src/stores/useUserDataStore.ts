import { defineStore } from 'pinia'
import type { PokemonDetails } from '@/types/pokemonTypes'

export const useUserDataStore = defineStore('userData', {
    state: () => ({
        favourites: [] as number[]
    }),
    persist: true,
    getters: {
        getFavouritePokemonArray: (state) => {
            return state.favourites
        },
        getFavouritesCount: (state) => {
            return state.favourites.length
        },
        isFavouritePokemon: (state) => {
            return (favPokemon: PokemonDetails) => {
                //Return true if favourites contains id of given PokemonDetails
                return state.favourites.includes(favPokemon.id)
            }
        }
    },
    actions: {
        makeFavouritesUnique() {
            //Makes all values in favourites unique
            this.favourites = [...new Set(this.favourites)]
        },
        addFavourite(pokemonDetails: PokemonDetails) {
            //Adds a favourite, then makes sure there are no duplicates
            this.favourites.push(pokemonDetails.id)
            this.makeFavouritesUnique()
        },
        removeFavourite(pokemonDetails: PokemonDetails) {
            //Removes a favourite
            this.favourites = this.favourites.filter((fav) => fav != pokemonDetails.id)
        }
    }
})
