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