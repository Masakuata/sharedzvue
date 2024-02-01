<template>
    <div class="modal fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
        <div class="bg-gray-100 h-fit rounded-lg  w-full mx-4 z-50">
            <p class="bg-bgBlue h-12 rounded-t-lg text-lg font-semibold text-white w-full text-center justify-center">Sesión
                expirada</p>
            <div class="p-4">
                <p class="text-lg font-semibold mb-2">Su sesión ha expirado, porfavor, inicie sesión nuevamente.</p>
                <ButtonX color="blue" @click="aceptar">Aceptar</ButtonX>
            </div>

        </div>
    </div>
</template>

<script setup>
import { limpiarSesion } from '@/utils/SessionManager';
import ButtonX from './ButtonX.vue';

const aceptar = () => {
    limpiarSesion();
};

</script>
