<template>
    <div @click="clickOut" v-if="isVisible"
        class="modal fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
        <div class="bg-gray-100 h-[90vh] rounded-lg p-4 max-w-xs w-full z-50">


            <p class="text-center text-xl font-semibold">Producto repetido</p>
            <ProductoVenderRow :producto="productoRepetido"></ProductoVenderRow>
            <p class="text-center text-xl font-semibold">Producto en la lista</p>
            <ProductoVenderRow :producto="productoEnLista"></ProductoVenderRow>
            <div class="flex flex-col">
                <p class="text-center text-xl font-semibold">Cantidad total en caso de sumar</p>
                <p>{{ 'Cantidad disponible: ' + productoRepetido.cantidad }}</p>
                <p>{{ 'Cantidad total que deseas comprar es:' + cantidadTotalCompra }}</p>

            </div>



            <div v-if="!cantidadExedida" class="flex flex-col justify-center  mt-4">
                <button @click="sumarCantidades" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl mt-2">
                    Sumar cantidades
                </button>
                <button @click="sustituirProducto" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl mt-2">
                    Remplazar producto
                </button>
                <button v-if="isCancelable" @click="cancel"
                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-xl mt-2">
                    Cancelar
                </button>
            </div>
            <p v-if="cantidadExedida">La cantidad ha sido excedida</p>
            <button v-if="cantidadExedida" @click="cancel" class="bg-bgBlue text-white font-semibold w-full rounded-xl">Aceptar</button>
        </div>
    </div>
</template>
  
<script setup>
import {defineProps, defineEmits, onMounted, ref, watch} from 'vue';
import ProductoVenderRow from './ProductoVenderRow.vue';

const emit = defineEmits(['sumarCantidades', 'sustituirProducto', 'cancel']);
const cantidadTotalCompra = ref(0);
const cantidadExedida = ref ( false)

const props = defineProps({
    isVisible: Boolean,
    isCancelable: Boolean,
    productoEnLista: Object,
    productoRepetido: Object
});

const calcularCantidadtotalCompra = () => {
    cantidadTotalCompra.value = props.productoEnLista.cantidadCompra + props.productoRepetido.cantidadCompra;
    if ( cantidadTotalCompra.value > props.productoEnLista.cantidad){
      cantidadExedida.value = true;
    }
};

const clickOut = () => {
    if (props.isCancelable) {
        emit('cancel');
    }
    cantidadExedida.value = false;
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

watch(
    () => props.isVisible,
    () => {
      calcularCantidadtotalCompra();
    }
)

onMounted(() => {
    calcularCantidadtotalCompra();
});

</script>

<style>
.modal {
    z-index: 9999 !important;
}
</style>