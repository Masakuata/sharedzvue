<template>
    <div class="w-full py-3 border border-gray-400 rounded-lg">
        <p class="w-full text-lg font-semibold text-left ml-3">Detalles del producto</p>
        <div class="flex flex-col px-3">
            <template v-if="producto">

                <div class="flex flex-row">
                    <p class="mr-2">Nombre: </p>
                    <p>{{ producto.nombre }}</p>
                </div>
                <div class="flex flex-row">
                    <p class="mr-2">Tipo de mascota:</p>
                    <p>{{ producto.tipoMascota }}</p>
                </div>
                <div class="flex flex-row">
                    <p class="mr-2">Raza:</p>
                    <p>{{ producto.raza }}</p>
                </div>
                <div class="flex flex-row">
                    <p class="mr-2">Precio:</p>
                    <p>{{ producto.precio }}</p>
                </div>
                <div class="flex flex-row">
                    <p class="mr-2">Presentación:</p>
                    <p>{{ producto.presentacion }}</p>
                </div>
                <div class="flex flex-row">
                    <p class="mr-2">Disponibilidad:</p>
                    <p class="text-green-600">{{ producto.cantidad }}</p>
                </div>
                <div class="flex flex-row">
                    <p class="mr-2">Peso:</p>
                    <p>{{ producto.peso + ' KG'}}</p>
                </div>

            </template>


        </div>

    </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';

const props = defineProps({
    producto: Object,
});


</script>