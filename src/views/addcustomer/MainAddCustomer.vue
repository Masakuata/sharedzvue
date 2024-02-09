<template>
    <template v-if="sessionExpired">
        <ModalSesionExpiredVue></ModalSesionExpiredVue>
    </template>
    
    <h1 class="text-white absolute top-0 right-0 mr-2   text-xl font-semibold text-left mt-3 md:invisible">CLIENTES</h1>
    <div @click="clickEnDiv" class="flex flex-col items-center p-4  w-full h-full md:h-full">
        <template v-if="!internalError">
            <AlertX :flag="noResults" message="No se encontraron resultados"></AlertX>
            <input type="text" v-model="searchQuery" placeholder="Buscar..." class="border rounded w-full h-10 px-2" />
            <div class="w-full mt-3">
                <ButtonX color="purple" :isSlim="true" @click="agregarCliente">Agregar cliente</ButtonX>
            </div>
            <template v-if="!loading && noClientes">
                <div class="w-full h-24 flex flex-col items-center justify-center">
                    <p class="text-xl font-bold text-gray-900">No hay más resultados</p>
                </div>
            </template>
            <template v-else>
                <template v-if="loading">
                    <div class="w-full h-96 flex flex-col items-center justify-center">
                        <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-bgBlue"></div>
                        <p class="text-xl font-bold text-gray-900">Cargando...</p>
                    </div>
                </template>
                <div class="w-full h-[80vh] md:grid md:grid-cols-3 overflow-scroll mt-2">
                    <div v-for="cliente in clientes" :key="cliente.id" class="md:p-3 w-full">
                        <CustomerRow  :cliente="cliente"></CustomerRow>
                    </div>
                    
                    <template v-if="isThereMoreResults">
                        <div class="w-full mt-2">
                            <ButtonX :isLoading="loadingaddItems" @click="addItems" :isSlim="true" color="green">Cargar más
                                clientes</ButtonX>
                        </div>
                    </template>
                    <template v-else>
                        <div v-if="!loadingaddItems" class="w-full h-24 flex flex-col items-center justify-center">
                            <p class="text-xl font-bold text-gray-900">No hay más resultados</p>
                        </div>
                    </template>
                </div>
            </template>
        </template>
        <template v-else>
            <ErrorX @aceptar="getClientes"></ErrorX>
        </template>
    </div>
</template>
    
<script setup>
import { ref, onMounted, watch } from 'vue';
import { toggleSidebar } from '@/utils/sidebarManager.js';
import ButtonX from '@/components/utilities/ButtonX.vue';
import { getClientesBusqueda } from '@/api/api.js';
import CustomerRow from './CustomerRow.vue';
import { useRouter } from 'vue-router';
import AlertX from '@/components/utilities/AlertX.vue';
import ErrorX from '@/components/utilities/ErrorX.vue';
import ModalSesionExpiredVue from '@/components/utilities/ModalSesionExpired.vue';

//
const internalError = ref(false);

//variables del buscador
const searchQuery = ref('');
const noResults = ref(false);
const page = ref(0);
const isThereMoreResults = ref(false);

const loadingaddItems = ref(false);

watch(
    () => searchQuery.value,
    () => {
        page.value = 0;
        getClientes();
    }
)


const router = useRouter();
const noClientes = ref(false);


const clientes = ref([]);
const loading = ref(false);

const sessionExpired = ref(false);



const getClientes = async () => {

    try {
        loading.value = true;
        clientes.value = [];
        page.value = 0;
        let query = {
            nombre: searchQuery.value,
            pag: page.value,
        }
        const response = await getClientesBusqueda(query);
        internalError.value = false;
        clientes.value = response.data;
        if (clientes.value.length == 0) {
            noClientes.value = true;
        } else if (clientes.value.length == 10) {
            isThereMoreResults.value = true;
            noClientes.value = false;
        } else {
            noClientes.value = false;
        }
        loading.value = false;

    } catch (error) {
        loading.value = false;
        console.log(error);
        noClientes.value = true;

        if (!error.response) {
            internalError.value = true;
            return;
        }

        if (error.response.status == 500) {
            internalError.value = true;
            return;
        }
        if (error.response.status == 406) {
            sessionExpired.value = true;
            return;
        }

    }

};
const addItems = async () => {

    try {
        loadingaddItems.value = true;
        page.value = page.value + 1;
        let query = {
            nombre: searchQuery.value,
            pag: page.value,
        }
        const { data } = await getClientesBusqueda(query);


        if (data.length === 10) {
            isThereMoreResults.value = true;
        } else {
            isThereMoreResults.value = false;
        }
        clientes.value = [...clientes.value, ...data];
        loadingaddItems.value = false;
        internalError.value = false;

    } catch (error) {
        loadingaddItems.value = false;
        console.log(error);

        if (!error.response) {
            internalError.value = true;
            return;
        }

        if (error.response.status == 500) {
            internalError.value = true;
            return;
        }
        if (error.response.status == 406) {
            sessionExpired.value = true;
            return;
        }
    }
}



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