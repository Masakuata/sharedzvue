<template>
    <div class="relative w-full">
        <template v-if="!isSelected">
            <input type="text" v-model="searchQuery" placeholder="Buscar..." class="border rounded w-full h-10 px-2" />
            <ul v-if="searchQuery" class=" absolute z-10 bg-gray-100  border-r border-l border-b border-gray-200 max-h-[50vh] overflow-scroll w-full">
                <li v-for="item in items" :key="item.id" class="flex flex-row border-b p-2" @click="selectItem(item)">
                    <div class="w-1/2 flex flex-row pr-2">
                        <p class="text-left text-md">{{ item.nombre }}</p>
                    </div>
                    
                    <div class="flex flex-col w-1/2">
                        <p class="w-full bg-b text-sm">{{ item.presentacion }}</p>
                        <p class="text text-sm" :class="{'text-green-600': item.cantidad > 0 , 'text-red-700': item.cantidad == 0}">{{ 'Qty: ' + item.cantidad }}</p>
                    </div>
                    
                </li>
            </ul>
        </template>
        <template v-else>
            <p>Producto seleccionado:</p>
            <div class="flex flex-row w-full h-14 items-center shadow-lg rounded-lg px-3 border border-gray-500">
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
import { ref,  watch, defineEmits, defineProps } from 'vue';
import {getProductosBusqueda} from '@/api/api.js';


const pros = defineProps({
    tipoCliente: {
        default: 0,
        type: Number,
    }
});


const searchQuery = ref('');
const selectedItem = ref({});
const presentacion = ref('');
const isSelected = ref(false);
const cantidad = ref(0);
const cantidadDisponible = ref(false);



const emit = defineEmits(['selectProduct']);

const items = ref([]);


const selectItem = (item) => {
    presentacion.value = item.presentacion;
    selectedItem.value = item;
    searchQuery.value = item.nombre;
    cantidad.value = item.cantidad;
    cantidadDisponible.value =  cantidad.value > 0 ? true : false; 
    isSelected.value = true;
    emit('selectProduct', item);
};
const unselectItem = () => {
    selectedItem.value = null;
    searchQuery.value = '';
    isSelected.value = false;
    emit('selectProduct', null);

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

    try {
        const productos = await getProductosBusqueda(searchQuery.value, pros.tipoCliente);
        items.value = productos.data;
    } catch (error) {
        console.log(error);
    }
};


</script>