<template>

<h1 class="text-white absolute top-0 right-0 mr-2   text-xl font-semibold text-left mt-3" >INICIO</h1>
    <div @click="clickEnDiv" class="flex flex-col items-center p-4  w-full h-full md:h-full">
        
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
    toggleSidebar();
};

onMounted(() => {
  //desplazarHaciaElemento();
});


</script>