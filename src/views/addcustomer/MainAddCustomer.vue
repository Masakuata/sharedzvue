<template>
    <h1 class="text-white absolute top-0 right-0 mr-2   text-xl font-semibold text-left mt-3">INICIO</h1>
    <div @click="clickEnDiv" class="flex flex-col items-center p-4  w-full h-full md:h-full">

        <div class="w-full mt-3">
            <ButtonX color="purple" @click="agregarCliente">Agregar cliente</ButtonX>
        </div>

        <template v-if="noClientes">
            <div class="w-full mt-40">
                <p class="text-lg font font-semibold w-full text-center">Aún no hay clientes registrados, registra uno y
                    comienza a registrar sus compras</p>
            </div>
        </template>
        <template v-else>
            <template v-if="loading">
                <div class="w-full h-96 flex flex-col items-center justify-center">
                    <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-bgBlue"></div>
                    <p class="text-xl font-bold text-gray-900">Cargando...</p>
                </div>
            </template>
            <div class="w-full h-[80vh] overflow-scroll mt-2">
                <CustomerRow v-for="cliente in clientes" :key="cliente.id" :cliente="cliente"></CustomerRow>
            </div>
        </template>






    </div>
</template>
    
<script setup>
import { ref, onMounted } from 'vue';
import { toggleSidebar } from '@/utils/sidebarManager.js';
import ButtonX from '@/components/utilities/ButtonX.vue';
import { getAllClientes } from '@/api/api.js';
import CustomerRow from './CustomerRow.vue';
import { useRouter } from 'vue-router';


const router = useRouter();
const noClientes = ref(false);


const clientes = ref([]);
const loading = ref(false);


const getClientes = async () => {

    try {
        loading.value = true;
        const response = await getAllClientes();
        clientes.value = response.data;
        if (clientes.value.length == 0) {
            noClientes.value = true;
        }
        loading.value = false;

    } catch (error) {
        loading.value = false;
        console.log(error);
        noClientes.value = true;
    }

};

const clickEnDiv = () => {
    toggleSidebar();
};

const agregarCliente = () => {


    //routerpush by name
    router.push({ name: 'createcustomer' });

};

onMounted(() => {
    getClientes();
});


</script>