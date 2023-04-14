<script setup lang="ts">
import PrimeVueButton from 'primevue/button'
</script>

<template>
    <nav class="absolute flex flex-row justify-between sticky top-0 backdrop-filter backdrop-blur z-50 text-white m-0 p-2">
        <PrimeVueButton icon="pi pi-chevron-left text-black bg-transparent" text rounded severity="secondary" @click="$router.back()"/>
        <slot name="bar"></slot>
    </nav>
</template>