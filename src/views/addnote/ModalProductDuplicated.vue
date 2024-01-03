<template>
    <div @click="clickOut" v-if="isVisible"
        class="modal fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
        <div class="bg-white rounded-lg p-4 max-w-xs w-full z-50">
            <p class="text-center text-xl font-semibold">Producto repetido</p>
            <ProductoVenderRow :producto="productoRepetido"></ProductoVenderRow>
            <p class="text-center text-xl font-semibold">Producto en la lista</p>
            <ProductoVenderRow :producto="productoEnLista"></ProductoVenderRow>

            <div class="flex justify-center space-x-3 mt-4">
                <button v-if="isCancelable" @click="cancel"
                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                    Cancelar
                </button>

                <button @click="sumarCantidades" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r">
                    Sumar cantidades
                </button>
                <button @click="sustituirProducto" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r">
                    Remplazar producto
                </button>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { defineProps, defineEmits } from 'vue';
import ProductoVenderRow from './ProductoVenderRow.vue';

const emit = defineEmits(['sumarCantidades', 'sustituirProducto', 'cancel']);

const props = defineProps({
    isVisible: Boolean,
    isCancelable: Boolean,
    productoEnLista: Object,
    productoRepetido: Object
});

const clickOut = () => {
    if (props.isCancelable) {
        emit('cancel');
    } 
};

const sumarCantidades = () => {
    emit('sumarCantidades');
};

const sustituirProducto = () => {
    emit('sustituirProducto')
}

const cancel = () => {
    emit('cancel');
};
</script>

<style>
.modal {
    z-index: 9999 !important;
}
</style>