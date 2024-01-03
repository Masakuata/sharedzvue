<template>
    <div class="w-full">
        <template v-if="!isSelected">
            <input type="text" v-model="searchQuery" placeholder="Buscar..." class="border rounded-lg w-full h-14 px-2" />
            <ul v-if="searchQuery" class=" bg-gray-100  border-r border-l border-b border-gray-200">
                <li v-for="item in items" :key="item.id" class="border-b p-2" @click="selectItem(item)">
                    {{ item.nombre }}
                </li>
            </ul>
        </template>
        <template v-else>
            <p>Cliente seleccionado:</p>
            <div class="flex flex-row w-full h-14 items-center shadow-lg rounded-lg px-3 border border-bgBlue">
                <p class="w-full">{{ selectedItem.nombre }}</p>
                <div class="flex flew-row w-10 justify-end">
                    <svg  @click="unselectItem" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-circle text-red-700"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                </div>
                
            </div>
        </template>
    </div>
</template>
  
<script setup>
import { ref,  watch } from 'vue';
import {getClientesBusqueda} from '@/api/api.js';



const searchQuery = ref('');
const selectedItem = ref({});
const isSelected = ref(false);   



const items = ref([]);


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
    const clientes = await getClientesBusqueda(searchQuery.value);
    items.value = clientes.data;
};


</script>
