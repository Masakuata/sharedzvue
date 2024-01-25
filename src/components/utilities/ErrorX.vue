<template>
    <div class="w-full">
        <div class="w-full">
            <p class="text-2xl font-semibold text-center text-[#BA1A1A]">{{ message }}</p>
            <div class="w-full flex justify-center mt-2">
                <img src="@/assets/dogError.svg" width="100" height="100" alt="Descripción de la imagen">
            </div>


            <div class="p-2 w-full">
                <ButtonX color="redLite" @click="emitirAceptar">{{ buttonMessage }}</ButtonX>
            </div>

        </div>


    </div>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';
import ButtonX from './ButtonX.vue';
const props = defineProps({
    message: {
        type: String,
        default: 'Error... Algo ha ocurrido. Inténtelo más tarde!'
    },
    buttonMessage: {
        type: String,
        default: 'Aceptar'
    }
});

const emit = defineEmits(['aceptar']);

const emitirAceptar = () => {
    emit('aceptar');
}


</script>