<template>
    <div v-if="flag" class="flex flex-row py-1 my-2 h-fit border-2 border-orange-500 rounded-xl">
        <div class="flex flex-row items-center text-orange-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-alert-triangle w-6 h-auto mx-2 ">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
            </svg>
        </div>

        <div class="flex flex-row items-center justify-center h-10 ">
            <p>{{ message }}</p>
        </div>

    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    flag: {
        type: Boolean,
        default: false

    },
    message: {
        type: String,
        default: 'Alerta',
    }
})


</script> 