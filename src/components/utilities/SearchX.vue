<template>
    <div class="w-full">
        <template v-if="!isSelected">
            <input type="text" v-model="searchQuery" placeholder="Buscar..." class="border rounded w-full h-10 px-2" />
            <ul v-if="searchQuery" class=" bg-gray-100  border-r border-l border-b border-gray-200">
                <li v-for="item in filteredList" :key="item" class="border-b p-2" @click="selectItem(item)">
                    {{ item.nombre }}
                </li>
            </ul>
        </template>
        <template v-else>
            <p>Cliente seleccionado:</p>
            <div class="flex flex-row w-full h-10 items-center shadow-lg rounded-lg px-3">
                <p>{{ selectedItem.nombre }}</p>
                <div class="flex flew-row w-full justify-end">
                    <svg  @click="unselectItem" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-circle text-red-700"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                </div>
                
            </div>
        </template>


    </div>
</template>
  
<script setup>
import { ref, computed, watch } from 'vue';
import {getClientesBusqueda} from '@/api/api.js';
import { PresentationChartLineIcon } from '@vue-hero-icons/outline';


const searchQuery = ref('');
const selectedItem = ref({});
const isSelected = ref(false);   

//const items = ref(['Apple', 'Banana', 'Orange', 'Pineapple', 'Strawberry']);

const items = ref([]);

const filteredList = computed(() => {
    if (items.value.length < 1) {
        return;
    }

    return items.value.filter(item =>
        item.nombre.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

const selectItem = (item) => {
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
        getClientes();
    }
)

const getClientes = async () => {
    if (searchQuery.value.length < 1) {
        return;
    }
    console.log('El search clietes es: ', searchQuery.value);
    console.log('Se ejecuta getClientes');
    const clientes = await getClientesBusqueda(searchQuery.value);
    console.log(clientes);
    items.value = clientes.data;
};


</script>
  
<style>
/* Estilos adicionales si son necesarios */
</style>
  