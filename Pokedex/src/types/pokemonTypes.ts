import { SortingOrder } from "./searchTypes";

export interface PokemonDetails {
    id: number,
    name: string,
    types: PokemonTypeSlot[],
    sprites: PokemonSprites,
    base_experience: number | undefined,
    height: number | undefined,
    weight: number | undefined,
    stats: PokemonStat[]
}

export interface PokemonTypeSlot {
    slot: number,
    type: PokemonType
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

export interface PokemonAbility {
    name: string | undefined,
}

export interface PokemonMove {
    name: string | undefined,
}

export interface PokemonStat {
    base_stat: number,
    stat: PokemonStatType
}

export interface PokemonStatType {
    name: string | undefined,
}

export class SortingOrderPokemon extends SortingOrder {
    static readonly ALFA_ASC  = new SortingOrder('Alfabetisch oplopend', 'pi pi-sort-alpha-down', (a, b) => {
        if (a.name < b.name) {
            return -1;
        }

        if (a.name > b.name) {
            return 1;
        }

        return 0;
    });
    static readonly ALFA_DESC = new SortingOrder('Alfabetisch aflopend', 'pi pi-sort-alpha-up', (a, b) => {
        if (a.name < b.name) {
            return 1;
        }

        if (a.name > b.name) {
            return -1;
        }
        
        return 0;
    });
    static readonly NUM_ASC  = new SortingOrder('Numeriek oplopend', 'pi pi-sort-numeric-down', (a, b) => {
        if (a.id < b.id) {
            return -1;
        }

        if (a.id > b.id) {
            return 1;
        }
        
        return 0;
    });
    static readonly NUM_DESC  = new SortingOrder('Numeriek aflopend', 'pi pi-sort-numeric-up', (a, b) => {
        if (a.id < b.id) {
            return 1;
        }

        if (a.id > b.id) {
            return -1;
        }
        
        return 0;
    });
    constructor(title: string, icon: string, orderingFunction: (a: PokemonDetails, b: PokemonDetails) => number) {
        super(title, icon, orderingFunction)
    }
}