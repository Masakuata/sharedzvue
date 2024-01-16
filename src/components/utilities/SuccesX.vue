<template>
    <div class="w-full">
        <p class="text-2xl font-semibold text-center text-bgBlue">{{ message }}</p>
        <div class="w-full flex justify-center mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentFill"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-check-check w-16 h-auto text-green-600 fill-gray-100">
                <path d="M18 6 7 17l-5-5" />
                <path d="m22 10-7.5 7.5L13 16" />
            </svg>
        </div>
        <div class="p-2 w-full">
            <ButtonX color="blue" @click="emitirAceptar">{{ buttonMessage }}</ButtonX>
        </div>

    </div>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';
import ButtonX from '@/components/utilities/ButtonX.vue';

const props = defineProps({
    message: {
        type: String,
        default: 'Éxito...!'
    },
    buttonMessage: {
        type: String,
        default: 'Aceptar'
    }
});

const  emit  = defineEmits(['aceptar']);

const emitirAceptar = () => {
    emit('aceptar');
}

</script>