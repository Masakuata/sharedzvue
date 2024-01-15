<template>
    <h1 class="text-white absolute top-0 right-0 mr-2   text-xl font-semibold text-left mt-3">INVENTARIO</h1>
    <div @click="closeSidebar" class="flex flex-col items-center p-4  w-full h-full md:h-full">

        <AlertX :flag="noResults" message="No se encontraron resultados"></AlertX>
        <input type="text" v-model="searchQuery" placeholder="Buscar..." class="border rounded w-full h-10 px-2" />
        <button class="w-full h-10 mt-2 bg-bgPurple text-white font-semibold rounded-xl" @click="goAddProduct">Agregar producto</button>

        <div class="w-full h-[80vh] overflow-scroll mt-2">
            <template v-if="loadingItems">
                <div class="w-full h-96 flex flex-col items-center justify-center">
                    <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-bgBlue"></div>
                    <p class="text-xl font-bold text-gray-900">Cargando...</p>
                </div>

            </template>
            <template v-else>
                <ProductinventoryItem v-for="item in items" :key="item.id" :producto="item"></ProductinventoryItem>
                <template button v-if="isThereMoreResults">
                    <div class="w-full mt-2">
                        <ButtonX :isLoading="loadingaddItems" @click="addItems" color="green">Cargar más productos</ButtonX>
                    </div>

                </template>
                <div v-else-if="!isThereMoreResults" class="w-full h-24 flex flex-col items-center justify-center">
                    <p class="text-xl font-bold text-gray-900">No hay más resultados</p>
                </div>
            </template>


        </div>


    </div>
</template>
    
<script setup>
import { ref, onMounted, watch } from 'vue';
import { toggleSidebar } from '@/utils/sidebarManager.js';
import SearchProduct from '@/components/utilities/SearchProduct.vue';
import { postProducto } from '@/api/api.js';
import ProductinventoryItem from './ProductinventoryItem.vue';
import AlertX from '@/components/utilities/AlertX.vue';
import { getProductosInventario } from '@/api/api.js';
import ButtonX from '@/components/utilities/ButtonX.vue';
import { useRouter } from 'vue-router';


const searchQuery = ref('');
const items = ref([]);
const noResults = ref(false);
const page = ref(0);
const loadingaddItems = ref(false);
const isThereMoreResults = ref(false);

const loadingItems = ref(false);
const router = useRouter();


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
        loadingItems.value = false;
        console.log(error);
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

        if (data.length === 10) {
            isThereMoreResults.value = true;
        } else {
            isThereMoreResults.value = false;
        }
        items.value = [...items.value, ...data];
    } catch (error) {
        loadingaddItems.value = false;
        console.log(error);
    }
}

const goAddProduct = () => {
    router.push({ name: 'addproduct' })
}

const closeSidebar = () => {
    toggleSidebar();
};
onMounted(() => {
    console.log('Entro al mounted de inventory');
    getProductos();
});


</script>