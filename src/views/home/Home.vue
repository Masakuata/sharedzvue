<template>
    <div @click="clickEnDiv" class="flex flex-col items-center pl-4  w-full h-full md:h-full">
        <h1 class="text-xl font-semibold w-full text-left" >Bienvenido</h1>
        <div class="flex text-left w-full">
          <p class="text-white bg-bgBlue p-1 rounded-sm w-fit">Heriberto Sandoval Machuca</p>
        </div>
        
        

    </div>




</template>

<script setup>
import { ref, onMounted } from 'vue';
import {toggleSidebar} from '@/utils/sidebarManager.js';
import ButtonX from '@/components/utilities/ButtonX.vue';

const elemento = ref(null);

const desplazarHaciaElemento = () => {
  const elemento = document.getElementById('menuButton');
  if (elemento) {
    elemento.scrollIntoView({ behavior: 'smooth' });
  }
};

const clickEnDiv = () => {
    console.log('click en div');    
    toggleSidebar();
};

onMounted(() => {
  //desplazarHaciaElemento();
});


</script>