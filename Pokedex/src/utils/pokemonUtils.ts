import type { EvolutionChain } from "@/types/pokemonTypes"

export function idFromUrl(url: string): number {
    return Number(url.split("/").at(-2))
}

export function getEvolutionChainRecursive(chain: any, prevChain: EvolutionChain | undefined = undefined): EvolutionChain {
    const newEvolutionChain: EvolutionChain = {
        prevChain: prevChain,
        chains: chain.evolves_to.map((nextChain: any) => getEvolutionChainRecursive(nextChain, prevChain)),
        species: {
            name: chain.species.name,
            id: idFromUrl(chain.species.url),
            evolution_chain: undefined
        }
    }

    newEvolutionChain.species.evolution_chain = newEvolutionChain
    return newEvolutionChain
}

export function getIdsFromEvolutionChainRecursive(chain: EvolutionChain, ids: number[] = []): number[] {
    ids.push(chain.species.id)
    chain.chains.forEach((nextChain) => ids.push(...getIdsFromEvolutionChainRecursive(nextChain)))
    return ids;
}