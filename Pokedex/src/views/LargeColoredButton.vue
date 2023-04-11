<script lang="ts">
    import { defineComponent } from 'vue'
    
    export default defineComponent({
    })
</script>

<template>
    <button class="h-24 p-2 rounded-lg text-left flex flex-col justify-end box-border">
        <span class="text-white font-bold">
            <slot name="title"></slot>
        </span>
        <span class="text-white text-opacity-60">
            <slot name="subTitle"></slot>
        </span>
    </button>
</template>