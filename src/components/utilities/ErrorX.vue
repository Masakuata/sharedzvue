<template>
    <div class="w-full">
        <div class="w-full">
            <div class="w-full flex justify-center mt-2">
                <img src="@/assets/sad_dog.svg" class="h-40 w-auto" alt="">

            </div>
            <p class="w-full text-2xl text-center text-bgBlue font-semibold">{{ title }}</p>
            <p class="text-xl text-center text-bgBlue ">{{ message }}</p>

            <p v-if="showContact" class="w-full text-center font-semibold my-2">Si el error persiste, póngase en contacto con soporte técnico: contacto@xatal.com.mx</p>

            <div class="p-2 w-full">
                <ButtonX color="blue" @click="emitirAceptar">{{ buttonMessage }}</ButtonX>
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
        default: 'Algo ha ocurrido. Inténtelo más tarde!'
    },
    buttonMessage: {
        type: String,
        default: 'Intentar de nuevo'
    },
    title: {
        type: String,
        default: 'Error interno'
    },
    showContact: {
        type: Boolean,
        default: true
    },
});

const emit = defineEmits(['aceptar']);

const emitirAceptar = () => {
    emit('aceptar');
}


</script>