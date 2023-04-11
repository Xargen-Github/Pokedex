import { SortingOrder } from "./searchTypes";

export interface PokemonDetails {
    id: number,
    name: string,
    types: Map<number, PokemonType>,
    sprites: PokemonSprites
}

export interface PokemonType {
    id: number,
    name: string
}

export interface PokemonSprites {
    back_default: string | undefined,
    back_female: string | undefined,
    back_shiny: string | undefined,
    back_shiny_female: string | undefined,
    front_default: string | undefined,
    front_female: string | undefined,
    front_shiny: string | undefined,
    front_shiny_female: string | undefined
}

export class SortingOrderPokemon extends SortingOrder {
    static readonly ALFA_ASC  = new SortingOrder('Alfabetisch oplopend', (a, b) => {
        if (a.name < b.name) {
            return -1;
        }

        if (a.name > b.name) {
            return 1;
        }

        return 0;
    });
    static readonly ALFA_DESC = new SortingOrder('Alfabetisch aflopend',  (a, b) => {
        if (a.name < b.name) {
            return 1;
        }

        if (a.name > b.name) {
            return -1;
        }
        
        return 0;
    });
    static readonly NUM_ASC  = new SortingOrder('Numeriek oplopend',  (a, b) => {
        if (a.id < b.id) {
            return -1;
        }

        if (a.id > b.id) {
            return 1;
        }
        
        return 0;
    });
    static readonly NUM_DESC  = new SortingOrder('Numeriek aflopend', (a, b) => {
        if (a.id < b.id) {
            return 1;
        }

        if (a.id > b.id) {
            return -1;
        }
        
        return 0;
    });
    constructor(title: string, orderingFunction: (a: PokemonDetails, b: PokemonDetails) => number) {
        super(title, orderingFunction)
    }
}