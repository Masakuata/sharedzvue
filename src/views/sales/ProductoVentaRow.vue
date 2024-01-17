<template>
    <div class="flex flex-row w-full bg-white rounded-lg shadow-lg mt-3 overflow-hidden">
        <div @click="showDetails" class="flex flex-col w-full">
            <div class="flex flex-row w-full text-white bg-bgBlue px-2 pt-1">
                <p class="mr-2 w-1/2  font-semibold truncate">{{ producto.nombre }}</p>
                <p class="w-1/2 font-semibold truncate">{{ producto.presentacion }}</p>
            </div>

            <div class="flex flex-row w-full items-center bg-bgProduct pt-1 px-2">
                <p class="w-3/12  text-xs">{{ cantidadFormat }}</p>
                <p class="mr-2 w-4/12 overflow-hidden  text-xs">{{ precioFormat }}</p>
                <p class="w-5/12 truncate font-bold  text-sm">{{ subtotalFormat }}</p>
            </div>
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
    console.log('formatInfo');

    cantidadFormat.value = `Cantidad: ${props.producto.cantidad}`;
    precioFormat.value = `IUV: $${props.producto.precio}`;
    subtotalFormat.value = `Subt: $${props.producto.subtotal}`;
};


const props = defineProps({
    producto: Object,
    isDeletable: Boolean
});




const calcularSubtotal = () => {
    console.log('calcularSubtotal');
    let subtotalLargo = props.producto.cantidad * props.producto.precio;  
    let subtotal = subtotalLargo.toFixed(2);
    let subtotalFloat = parseFloat(subtotal);  
    props.producto.subtotal = subtotalFloat;
    formatInfo();
};



watch(
    () => props.producto.cantidad,
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
    calcularSubtotal();
    formatInfo();
});

</script>