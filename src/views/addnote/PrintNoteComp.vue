<template>
    <div class="w-80 border border-black p-10">
        <div v-for="producto in productos" class="flex felx-row w-full items-end">
            <p class="w-6/12">{{ producto.nombre }}</p>
            <p class="w-1/12">{{ producto.cantidadCompra }}</p>
            <p class="w-2/12">${{ producto.precio }}</p>
            <p class="w-3/12 text-right">${{ producto.subtotal }}</p>
        </div>
    </div>

</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue'
import DetalleVenta from '../sales/DetalleVenta.vue';

const props = defineProps({
    productos: Array,
    total: Number,
    cliente: Object,
    abono: String,
})


onMounted(() => {
    console.log(props.productos);
    console.log(props.total);
    console.log(props.cliente);
})
</script>