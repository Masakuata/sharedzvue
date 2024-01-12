<template>

<h1 class="text-white absolute top-0 right-0 mr-2   text-xl font-semibold text-left mt-3" >INICIO</h1>
    <div @click="clickEnDiv" class="flex flex-col items-center p-4  w-full h-full md:h-full">
        
        <div class="flex text-left w-full">
          <p @click="getProductosFormat" class="text-white bg-bgBlue p-1 rounded-sm w-fit">Heriberto Sandoval Machuca</p>
        </div>

        <input
          type="date"
          name="startDate"
          :value="startDate && startDate.toISOString().split('T')[0]"
          @input="startDate = getDateClean($event.target.valueAsDate)"
          autocomplete="off"
          class="form-control rounded-lg w-full"
        />

        
        
        

    </div>




</template>

<script setup>
import { ref, onMounted } from 'vue';
import {toggleSidebar} from '@/utils/sidebarManager.js';
import ButtonX from '@/components/utilities/ButtonX.vue';
import {getProductos} from './precios.js';
import { resgistrarProductos} from '@/api/api.js'

const elemento = ref(null);

const startDate = ref(null);

const getProductosFormat = () => {
  let productos = getProductos();
  resgistrarProductos(productos);
  console.log( 'Los productos formateados son:',productos);
};

const desplazarHaciaElemento = () => {
  const elemento = document.getElementById('menuButton');
  if (elemento) {
    elemento.scrollIntoView({ behavior: 'smooth' });
  }
};

const clickEnDiv = () => {   
    toggleSidebar();
};

const getDateClean = (currDate) => {
  // need to convert to UTC to get working input filter
  console.log( 'El date que retorna el datepicker', currDate);


  let month = currDate.getUTCMonth() + 1;

  console.log( 'El mes es:', month);

  if (month < 10) month = "0" + month;

  let day = currDate.getUTCDate();

  console.log( 'El dia es:', day);

  if (day < 10) day = "0" + day;

  const dateStr =
    currDate.getUTCFullYear() + "-" + month + "-" + day + "T00:00:00";
  console.log(dateStr);
  const d = new Date(dateStr);
  console.log(d);
  return d;
  }

onMounted(() => {
  //desplazarHaciaElemento();
});


</script>