<template>
    <div>
        <p class="w-full text-center text-white font-semibold bg-gray-400 mt-3  rounded-t-lg">DETALLES</p>
    <div class="flex flex-row w-full h-fit  bg-bgBlue  rounded-b-lg overflow-hidden">
        <div class="w-1/2 bg-bgGray h-full p-2">
            <div class="h-full w-full flex flex-col  font-semibold">
                <div class="w-full border-b border-gray-500">
                    <p>Total de venta</p>
                </div>
                <div class="w-full border-b border-gray-500">
                    <p>Total Abonado</p>
                </div>
                <div class="w-full border-b border-gray-500">
                    <p>Restante</p>
                </div>
            </div>

        </div>
        <div class="flex flex-col p-2 w-1/2 text-white font-semibold">
            <div class="w-full border-b border-gray-500">{{ '$'+ sale.total }}</div>
            <div class="w-full border-b border-gray-500">{{ '$'+ sale.abonado }}</div>
            <div class="w-full border-b border-gray-500">{{ '$'+ restante }}</div>
        </div>

    </div>
    </div>
    
</template>

<script setup>
import { defineProps,  onMounted, ref } from 'vue';

const restante = ref(0);

const props = defineProps({
    sale: {
        type: Object,
        required: true
    }
});



onMounted(() => {

    restante.value = props.sale.total - props.sale.abonado;
    //direccion.value = props.cliente.direcciones[0];
});


</script>