<template>
    <div>
        <div class="flex flex-row w-full bg-gray-400 mt-3  rounded-t-lg h-10 items-center">
            <div class="w-1/3"></div>
            <p class="w-1/3 text-center text-white font-semibold ">DETALLES</p>
            <div class="p-2 w-1/3 flex flex-row justify-end">
                <TinyButtonX @click="emitEliminarVenta" type="delete"></TinyButtonX>
            </div>
            
        </div>

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
                <div class="w-full border-b border-gray-500">{{ '$' + sale.total }}</div>
                <div class="w-full border-b border-gray-500">{{ '$' + sale.abonado }}</div>
                <div class="w-full border-b border-gray-500">{{ '$' + restante }}</div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, onMounted, ref } from 'vue';
import TinyButtonX from '@/components/utilities/TinyButtonX.vue';


const restante = ref(0);
const emit = defineEmits(['eliminarVenta'])

const props = defineProps({
    sale: {
        type: Object,
        required: true
    }
});
const emitEliminarVenta =() =>{
    emit('eliminarVenta')
}



onMounted(() => {

    restante.value = props.sale.total - props.sale.abonado;
    //direccion.value = props.cliente.direcciones[0];
});


</script>