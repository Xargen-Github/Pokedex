<script lang="ts">
import { ref, type PropType } from "vue";
import PrimeVueButton from 'primevue/button';
import PrimeVueDialog from 'primevue/dialog'
import PrimeVueListBox from 'primevue/listbox'
import type MenuItem from 'primevue/menuitem';
import { defineComponent } from 'vue'

export default defineComponent({
    components: {
        PrimeVueButton,
        PrimeVueDialog,
        PrimeVueListBox,
    },
    props: {
        initial: {
            type: Object as PropType<any>,
            required: true
        },
        items: { type: Array as PropType<typeof MenuItem[]>, required: true },
        modelValue: {
            type: Object as PropType<any>,
            required: true
        },
    },
    emits: ["update:modelValue"],
    data() {
        return {
            value: this.initial,
            position: ref('bottom'),
            visible: ref(false),
        };
    },
    methods: {
        toggle() {
            this.visible = !this.visible;
        },
        open() {
            this.visible = true;
        },
        close() {
            this.visible = false;
        },
        test() {
            console.log("etest");
        }
    }
})
</script>

<template>
    <div class="w-6 h-6 inline">
        <PrimeVueButton icon="pi pi-sort-alt text-black bg-transparent" @click="toggle()" text rounded
            severity="secondary" />
            
        <PrimeVueDialog class="bg-white text-black" v-model:visible="visible" header="Sorteren op"
            :style="{ width: '100vw' }" position="bottom" :modal="false" :draggable="false">
            <PrimeVueListBox :value=modelValue :options="items" optionLabel="title" class="w-full p-listbox-list"
                listStyle="max-height:250px" @change="$emit('update:modelValue', $event.value)">
                <template #option="slotProps">
                    <div class="flex align-items-center p-listbox-item">
                        <i :alt="slotProps.option.title" :class="slotProps.option.icon" style="width: 18px"></i>
                        <div>{{ slotProps.option.title }}</div>
                    </div>
                </template>
            </PrimeVueListBox>
        </PrimeVueDialog>
    </div>
</template>