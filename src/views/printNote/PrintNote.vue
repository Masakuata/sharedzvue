<template>

    <h1 class="text-white absolute top-0 right-0 mr-2   text-xl font-semibold md:invisible text-left mt-3" >IMPRIMIR NOTA</h1>
        <div @click="clickEnDiv" class="flex flex-col items-center p-4  w-full h-full md:h-full">
            
    
    
            
    
    
        </div>
    
    
    
    
    </template>
    
    <script setup>
    import { ref, onMounted } from 'vue';
    import {toggleSidebar} from '@/utils/sidebarManager.js';
    import ButtonX from '@/components/utilities/ButtonX.vue';
    import { useRoute, useRouter } from 'vue-router';

    const route = useRoute();
    const router = useRouter();


    
    const clickEnDiv = () => {   
        toggleSidebar();
    };
    


    onMounted(() => {
    });
    
    
    </script>