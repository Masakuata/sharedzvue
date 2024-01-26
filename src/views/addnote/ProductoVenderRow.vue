<template>
    <div class="flex flex-row w-full bg-white p-2 rounded-lg shadow-lg mt-2">
        <div @click="showDetails" class="flex flex-col w-11/12">
            <div class="flex flex-row w-full">
                <p class="mr-2 w-6/12 truncate">{{ producto.nombre }}</p>
                <p class="w-3/12 truncate text-xs">{{ producto.presentacion }}</p>
                <p class="mr-2 w-3/12 overflow-hidden text-bgBlue text-xs">{{ precioFormat }}</p>
            </div>

            <div class="flex flex-row w-full items-center">
                <p class="w-3/12 text-bgBlue text-xs">{{ cantidadFormat }}</p>
                <p class="w-5/12 truncate text-green-600  text-sm">{{ subtotalFormat }}</p>
                <p class="w-4/12 text-xs">{{ 'PesoTotal ' + producto.pesoTotal + 'KG' }}</p>
            </div>
        </div>

        <div v-if="isDeletable" class="flex flew-row w-1/12 justify-end items-center">
            <svg @click="unselectItem" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-x-circle text-red-700">
                <circle cx="12" cy="12" r="10" />
                <path d="m15 9-6 6" />
                <path d="m9 9 6 6" />
            </svg>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted, defineProps, watch, defineEmits } from 'vue';
//nombre, presentacion, tipoMascota, raza, precio, canrtidad, id

const cantidadFormat = ref('QTY: 13');
const precioFormat = ref('IUV: $1000');
const subtotalFormat = ref('Subt: $13000');



const formatInfo = () => {
    cantidadFormat.value = `QTY: ${props.producto.cantidadCompra}`;
    precioFormat.value = `IUV: $${props.producto.precio}`;
    subtotalFormat.value = `Subt: $${props.producto.subtotal}`;
};


const props = defineProps({
    producto: Object,
    isDeletable: Boolean
});
const emit = defineEmits(['unselectItem', 'showDetails']);

const unselectItem = () => {
    emit('unselectItem', props.producto);
};

const calcularSubtotal = () => {
    let subtotalLargo = props.producto.cantidadCompra * props.producto.precio;  
    let subtotal = subtotalLargo.toFixed(2);
    let subtotalFloat = parseFloat(subtotal);  
    props.producto.subtotal = subtotalFloat;
    formatInfo();
};

const showDetails = () => {
    emit('showDetails', props.producto);
};

watch(
    () => props.producto.cantidadCompra,
    () => {
        calcularSubtotal();
    }
);

watch(
    () => props.producto.precio,
    () => {
        calcularSubtotal();
    }
);


onMounted(() => {
    formatInfo();
});

</script>