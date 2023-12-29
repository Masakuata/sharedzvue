<template>
    <div class="w-full">
        <template v-if="!isSelected">
            <input type="text" v-model="searchQuery" placeholder="Buscar..." class="border rounded w-full h-10 px-2" />
            <ul v-if="searchQuery" class=" bg-gray-100  border-r border-l border-b border-gray-200">
                <li v-for="item in items" :key="item.id" class="flex flex-row border-b p-2" @click="selectItem(item)">
                    <p class="w-1/2 text-left text-lg">{{ item.nombre }}</p>
                    <p class="w-1/2  text-right bg-b text-sm">{{ item.presentacion }}</p>
                </li>
            </ul>
        </template>
        <template v-else>
            <p>Producto seleccionado:</p>
            <div class="flex flex-row w-full h-14 items-center shadow-lg rounded-lg px-3">
                <p class="w-full text-lg">{{ selectedItem.nombre}}</p>
                <p class="w-full ">{{ presentacion }}</p>
                <div class="flex flew-row w-10 justify-end">
                    <svg  @click="unselectItem" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-circle text-red-700"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                </div>
                
            </div>
        </template>
    </div>


</template>

<script setup>
import { ref,  watch } from 'vue';
import {getProductosBusqueda} from '@/api/api.js';



const searchQuery = ref('');
const selectedItem = ref({});
const presentacion = ref('');
const isSelected = ref(false);   



const items = ref([]);


const selectItem = (item) => {
    presentacion.value = item.presentacion;
    selectedItem.value = item;
    searchQuery.value = item.nombre;
    isSelected.value = true;
};
const unselectItem = () => {
    selectedItem.value = null;
    searchQuery.value = '';
    isSelected.value = false;
};

watch(
    () => searchQuery.value,
    () => {
        getProductos();
    }
)

const getProductos = async () => {
    if (searchQuery.value.length < 1) {
        return;
    }
    console.log('El search clietes es: ', searchQuery.value);
    console.log('Se ejecuta getClientes');
    const productos = await getProductosBusqueda(searchQuery.value);
    console.log(productos);
    items.value = productos.data;
};


</script>