<template>
    <template v-if="sessionExpired">
        <ModalSesionExpired></ModalSesionExpired>
    </template>

    <h1 class="text-white absolute top-0 right-0 mr-2   text-xl font-semibold text-left md:invisible mt-3">INVENTARIO</h1>
    <div @click="closeSidebar" class="flex flex-col items-center p-4  w-full h-full md:h-full">

        <AlertX :flag="noResults" message="No se encontraron resultados"></AlertX>

        <template v-if="internalError">
            <ErrorX @aceptar="intentarDeNuevo" buttonMessage="Intentar de nuevo">
            </ErrorX>
        </template>
        <template v-else>
            <input type="text" v-model="searchQuery" placeholder="Buscar..." class="border rounded w-full h-10 px-2 mb-3" />
            <ButtonX color="purple" :isSlim="true" @click="goAddProduct"> Agregar producto</ButtonX>
        </template>


        <div class="w-full h-[80vh] overflow-scroll mt-2">
            <template v-if="loadingItems">
                <div class="w-full h-96 flex flex-col items-center justify-center">
                    <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-bgBlue"></div>
                    <p class="text-xl font-bold text-gray-900">Cargando...</p>
                </div>

            </template>
            <template v-else>
                <div class="w-full md:grid md:grid-cols-2 xl:grid-cols-3">
                    <div class="md:px-2" v-for="item in items" :key="item.id">
                        <ProductinventoryItem :producto="item" @click="onGo">
                        </ProductinventoryItem>
                    </div>

                    <template button v-if="isThereMoreResults">
                        <div class="w-full mt-2">
                            <ButtonX :isLoading="loadingaddItems" @click="addItems" :isSlim="true" color="green">Cargar más
                                productos</ButtonX>
                        </div>
                    </template>
                    <div v-else-if="!isThereMoreResults" class="w-full h-24 flex flex-col items-center justify-center">
                        <p class="text-xl font-bold text-gray-900">No hay más resultados</p>
                    </div>
                </div>




            </template>
        </div>


    </div>
</template>
    
<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { toggleSidebar } from '@/utils/sidebarManager.js';
import ProductinventoryItem from './ProductinventoryItem.vue';
import AlertX from '@/components/utilities/AlertX.vue';
import { getProductosInventario } from '@/api/api.js';
import ButtonX from '@/components/utilities/ButtonX.vue';
import { useRouter } from 'vue-router';
import { useMyStore } from '@/stores/store.js';
import ErrorX from '@/components/utilities/ErrorX.vue'
import ModalSesionExpired from '@/components/utilities/ModalSesionExpired.vue';
import { get } from 'firebase/database';


const searchQuery = ref('');
const items = ref([]);
const noResults = ref(false);
const page = ref(0);
const loadingaddItems = ref(false);
const isThereMoreResults = ref(false);

const loadingItems = ref(false);
const router = useRouter();
const store = useMyStore();

const isPushed = ref(false);

const internalError = ref(false);
const sessionExpired = ref(false);


watch(
    () => searchQuery.value,
    () => {
        page.value = 0;
        getProductos();
    }
)


const getProductos = async () => {

    try {
        let query = {
            nombre: searchQuery.value,
            pag: page.value,
        }
        loadingItems.value = true;
        const productos = await getProductosInventario(query);
        items.value = productos.data;
        loadingItems.value = false;
        internalError.value = false;

        if (productos.data.length === 10) {
            isThereMoreResults.value = true;
        } else {
            isThereMoreResults.value = false;
        }

        if (items.value.length == 0) {
            noResults.value = true;
        } else {
            noResults.value = false;
        }
    } catch (error) {
        console.log(error)
        loadingItems.value = false;

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
        const { data } = await getProductosInventario(query);
        loadingaddItems.value = false;
        internalError.value = false;

        if (data.length === 10) {
            isThereMoreResults.value = true;
        } else {
            isThereMoreResults.value = false;
        }
        items.value = [...items.value, ...data];
    } catch (error) {
        console.log(error)
        loadingaddItems.value = false;

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

const goAddProduct = () => {
    store.setQueryInventory({ page: page.value, searchQuery: searchQuery.value });
    router.push({ name: 'addproduct' })
}

const closeSidebar = () => {
    toggleSidebar();
};

const onGo = () => {
    isPushed.value = true;
}

const guardarQuery = () => {

    let queryAux = {
        page: page.value,
        query: searchQuery.value,
    }

    store.setQueryInventory(queryAux);
}

onUnmounted(() => {

    if (isPushed.value) {
        guardarQuery();
    } else {
        let queryAux = {
            page: -1,
            query: '',
        }
        store.setQueryInventory(queryAux);
    }

});

const cargarQuery = async () => {
    searchQuery.value = store.getQueryInventory.query;

}

const intentarDeNuevo = () => {
    internalError.value = false;
    getProductos();
}


onMounted(() => {
    if (store.getQueryInventory.page != -1) {
        cargarQuery();
    }
    getProductos();
});


</script>