<template>

    <h1 class="text-white absolute top-0 right-0 mr-2   text-xl font-semibold text-left mt-3" >INVENTARIO</h1>
        <div @click="closeSidebar" class="flex flex-col items-center p-4  w-full h-full md:h-full">
            
            <SearchProduct></SearchProduct>
            
    
        </div>
    
    
    
    
    </template>
    
    <script setup>
    import { ref, onMounted } from 'vue';
    import {toggleSidebar} from '@/utils/sidebarManager.js';
    import SearchProduct from '@/components/utilities/SearchProduct.vue';
    import {postProducto} from '@/api/api.js';


    const closeSidebar= () => {    
        toggleSidebar();
    };
    onMounted(() => {
    });
    
    </script>