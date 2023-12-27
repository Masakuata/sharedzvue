<template>
    <div class="flex flex-col items-center  w-full h-full md:h-full px-4">
        <p class="text-xl font-semibold">Inventario</p>
        <button class="w-full bg-bgBlue h-10 text-white font-semibold rounded-lg">Actualizar Inventario</button>
        <Product></Product>
    </div>
</template>

<script setup>
import Product from '@/components/Product.vue';

</script>