<template>
  <div class="bg-blue-400 text-gray-100 py-3 px-6 shadow md:flex justify-between 
items-center ">
    <div class="flex items-start">
      <h1 class="text-2xl font-semibold">Sharedz</h1>

    </div>
    <ul class="md:flex md:items-center  md:px-0  md:pb-0 pb-10  md:static absolute bg-gray-900 md:w-auto w-full top-14 duration-700 ease-in" :class="[open ? 'left-0' : 'left-100']">
      <li class="md:mx-4 md:my-0 my-3 text-left ">
        <router-link to="/login" class="hover:text-green-500 font-semibold text-lg">Login</router-link>
      </li>
      <li class="md:mx-4 md:my-0 my-3 text-left ">
        <router-link to="/login" class="hover:text-green-500 font-semibold text-lg">Registrate</router-link>
      </li>
    </ul>

  </div>
</template>

<script setup>
import { ref } from 'vue';

const open = ref(false);



</script>