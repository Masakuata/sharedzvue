<template>
  <h1 class="text-white absolute top-0 right-0 mr-2   text-xl font-semibold text-left mt-3 md:invisible bg-bgBlue">INICIO
  </h1>
  <div @click="clickEnDiv" class="flex flex-col items-center p-4  w-full h-full md:h-full">
    <p class="text-xl font-semibold">¡Bienvenido!</p>
    <p class="text-lg font-semibold w-full text-left">{{ 'Las notas de hoy ' + hoy + ' son:' }}</p>
    <SearchSales :is-from-home="true"></SearchSales>


  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { toggleSidebar } from '@/utils/sidebarManager.js';
import SearchSales from '../sales/SearchSales.vue';
import { getHoyString } from '@/utils/validator';


const hoy = ref("");








const clickEnDiv = () => {
  toggleSidebar();
};



onMounted(() => {
  hoy.value = getHoyString();
  hoy.value = hoy.value.replace(/,/g, '');
});


</script>