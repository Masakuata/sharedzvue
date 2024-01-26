<template>

    <div class="flex flex-col  w-full bg-bgProduct h-32 rounded-lg overflow-hidden mt-3" @click="goDetails">
        <div class="flex flex-row w-full">
            <div class="w-1/3 h-10 text-center p-2">{{ fecha }}</div>
            <div class="w-2/3 bg-bgBlue h-10 text-white p-2 rounded-bl-lg text-center  font-bold truncate"> {{  sale.cliente.nombre }}</div>
        </div>
        <div class="flex flex-row h-full w-full pt-5">
            <div class="flex flex-col h-full w-1/3">
                <p class="text-xl w-full text-center">Total</p>
                <p class="text-xl font-bold w-full text-center">{{ '$' + sale.total }}</p>
            </div>
            <div class="flex flex-col h-full w-1/3">
                <p class="text-xl w-full text-center">Abonado</p>
                <p class="text-xl font-bold w-full text-center">{{ '$' + sale.abonado }}</p>
            </div>
            <div class="flex flex-col h-full w-1/3">
                <p class="text-xl w-full text-center">Restante</p>
                <p class="text-xl font-bold w-full text-center">{{ '$' + restante }}</p>
            </div>
        </div>

    </div>
</template>

<script setup>

import { ref, onMounted, defineProps } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();



const restante = ref(0);
const fecha = ref('');

const props = defineProps({
    sale: {
        type: Object,
        required: true,
        default: () => ({
            id: 0,
            cliente: 'Cliente',
            fecha: 'Fecha',
            total: 0,
            abonado: 0,
            restante: 0,
        })
        
        
    }
})

const formatearCampos = () => {
    let restanteFloat = props.sale.total - props.sale.abonado

    restante.value = restanteFloat.toFixed(2);


    fecha.value = props.sale.fecha.substring(0, 10);
};



const goDetails = () => {
    router.push({ name: 'salesdetails', params: { id: props.sale.id } });
    //showSaleModal();
}




onMounted(() => {
    formatearCampos();
});




</script>


