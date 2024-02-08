<template>
    <div @click="clickOut" class="modal fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
        <div class="bg-gray-100 h-fit pb-10 rounded-lg  w-full md:w-2/4 mx-4 z-50">
            <p class="bg-bgBlue h-12 rounded-t-lg text-lg font-semibold text-white w-full text-center">{{ titulo }}</p>
            <div class="p-3">
                <p class="w-full text-center font-semibold">{{ mensaje }}</p>
                <template v-if="isError">
                    <div class="w-full flex justify-center mt-2">
                        <img src="@/assets/dogError.svg" width="100" height="100" alt="Descripción de la imagen">
                    </div>
                </template>
                <template v-else>
                    <div class="w-full flex justify-center mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="currentFill" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-check-check w-16 h-auto text-green-600 fill-gray-100">
                            <path d="M18 6 7 17l-5-5" />
                            <path d="m22 10-7.5 7.5L13 16" />
                        </svg>
                    </div>
                </template>
                <div class="flex flex-row justify-center w-full mt-3">
                    <template v-if="isError">
                        <ButtonX color="red" @click="emitirAceptar">Aceptar</ButtonX>
                    </template>
                    <template v-else>
                        <ButtonX color="blue" @click="emitirAceptar">Aceptar</ButtonX>
                    </template>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue';
import ButtonX from './ButtonX.vue';


const emit = defineEmits(['aceptar']);

const props = defineProps({
    isError: {
        type: Boolean,
        default: false
    },
    titulo: String,
    mensaje: String,
});


const emitirAceptar = () => {
    emit('aceptar');
};

const clickOut = () => {
    emitirAceptar();
};

</script>
