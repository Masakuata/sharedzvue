<template>
    <div class="relative w-full">
        <template v-if="!isSelected">
            <AlertX :flag="noResults" message="No se encontraron resultados"></AlertX>
            <input type="text" ref="refInputSearch" v-model="searchQuery" placeholder="Buscar..."
                class="border rounded w-full h-10 px-2" />
            <ul v-if="searchQuery"
                class=" absolute z-10 bg-gray-100  border-r border-l border-b border-gray-200 max-h-[40vh] overflow-scroll w-full">
                <li v-for="item in items" :key="item.id" class="flex flex-row border-b p-2" @click="selectItem(item)">

                    <div class="w-1/2 flex flex-row pr-2">
                        <p class="text-left text-md">{{ item.nombre }}</p>
                    </div>

                    <div class="flex flex-col w-1/2">
                        <p class="w-full bg-b text-sm">{{ item.presentacion }}</p>
                        <p class="text text-sm"
                            :class="{ 'text-green-600': item.cantidad > 0, 'text-red-700': item.cantidad == 0 }">{{ 'Qty: '
                                +
                                item.cantidad }}</p>
                    </div>

                </li>
            </ul>
        </template>
        <template v-else>
            <p>Producto seleccionado:</p>
            <div class="flex flex-row w-full h-14 items-center shadow-lg rounded-lg px-3 border border-gray-500">
                <p class="w-7/12">{{ selectedItem.nombre }}</p>
                <p class="w-4/12 ">{{ presentacion }}</p>
                <div class="flex flew-row w-1/12 justify-end">
                    <svg @click="unselectItem" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-x-circle text-red-700">
                        <circle cx="12" cy="12" r="10" />
                        <path d="m15 9-6 6" />
                        <path d="m9 9 6 6" />
                    </svg>
                </div>

            </div>
        </template>
    </div>
</template>

<script setup>
import { ref, watch, defineEmits, defineProps, onMounted, nextTick } from 'vue';
import { getProductosBusqueda, getProductoId } from '@/api/api.js';
import AlertX from './AlertX.vue';





const pros = defineProps({
    tipoCliente: {
        default: 0,
        type: Number,
    }
});

const refInputSearch = ref(null);

const searchQuery = ref('');
const selectedItem = ref({});
const presentacion = ref('');
const isSelected = ref(false);
const cantidad = ref(0);
const cantidadDisponible = ref(false);



const emit = defineEmits(['selectProduct']);
const noResults = ref(false);

const items = ref([]);


const selectItem = async (item) => {
    presentacion.value = item.presentacion;
    selectedItem.value = item;
    searchQuery.value = item.nombre;
    cantidad.value = item.cantidad;
    cantidadDisponible.value = cantidad.value > 0 ? true : false;
    isSelected.value = true;

    

    let itemAux = await optenerProductoCompleto(item.id);
    

    itemAux.precioDefecto = itemAux.precio;

    itemAux.precio = item.precio
    itemAux.id = item.id;
    

    

    let nombrePrecio= obtenerPrecioVenta( itemAux, pros.tipoCliente)


    if (nombrePrecio.tipoCliente){
        itemAux.nombrePrecio = nombrePrecio.tipoCliente;
    }else{
        itemAux.nombrePrecio = 'Publico';
        itemAux.precio = itemAux.precioDefecto;
    }
    

    
    
    emit('selectProduct', itemAux);
};

const obtenerPrecioVenta = (producto, tipoCliente) => {
    let precioAux = {}
    producto.precios.forEach(precio => {
        ;
        if (precio.id === tipoCliente) {
            
            precioAux = precio;
        }
    });

    return precioAux;
};

const optenerProductoCompleto = async (id) => {
    try {
        const productoRespuesta = await getProductoId(id);
        
        return productoRespuesta.data;
    } catch (error) {
        console.log(error);
    }
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
        if (searchQuery.value == '') {
            noResults.value = false;
        }
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
        if (items.value.length == 0) {
            noResults.value = true;
        } else {
            noResults.value = false;
        }
    } catch (error) {
        console.log(error);
    }
};

onMounted(() => {
    nextTick(() => {
        if (refInputSearch.value) {
            refInputSearch.value.focus();
        }else{
            console.log('no se pudo hacer focus en el search');
        }
    });
});




</script>