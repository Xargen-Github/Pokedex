<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import Tag from 'primevue/tag';
import type { PokemonType } from '@/types/pokemonTypes';

export default defineComponent({
    components: {
        Tag
    },
    props: {
        pokemonType: { type: Object as PropType<PokemonType>, required: true }
    }
})
//text-white rounded-full bg-sky-500 px-3 py-1
</script>

<template>
    <Tag :value="pokemonType.name" rounded></Tag>
</template>