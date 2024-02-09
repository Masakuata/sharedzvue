<template>
    <div class="relative w-full">
        <template v-if="!isSelected">
            <AlertX :flag="noResults" message="No se encontraron clientes que coincidan"></AlertX>
            <input type="text" v-model="searchQuery" placeholder="Buscar cliente..."
                class="border rounded-lg w-full h-14 px-2" />
            <ul v-if="searchQuery"
                class="w-full absolute z-10 bg-gray-100  border-r border-l border-b border-gray-200 max-h-[50vh] overflow-scroll">
                <template v-if="loading">
                    <p class="w-full text-center text-sm font-semibold">Buscando...</p>
                    <div class="flex flex-row items-center justify-center w-full">
                        <LoadingIcon></LoadingIcon>
                    </div>
                </template>
                <li v-for="item in items" :key="item.id" class="border-b p-2" @click="selectItem(item)">
                    {{ item.nombre }}
                </li>
            </ul>
        </template>
        <template v-else>
            <div>
                <div class="flex flex-row w-full h-14 bg-gray-200 pt-2   overflow-hidden" :class="{'rounded-lg' : !showDirections , 'rounded-t-lg' : showDirections}">



                    <div class="flex flex-row w-11/12 items-center">
                        <div class="w-1/12 flex flex-row justify-end">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                class="lucide lucide-store">
                                <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
                                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                                <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
                                <path d="M2 7h20" />
                                <path
                                    d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
                            </svg>
                        </div>
                        <div class="w-10/12">
                            <p class="text-black font-semibold w-full text-lg ml-3 truncate">{{ selectedItem.nombre }}</p>
                            <p class="text-black  w-full  ml-3 truncate" v-if="tipoCliente">{{ tipoCliente }}</p>
                        </div>
                        
                    </div>

                    <div class="flex flex-row w-1/12 h-full items-center " @click="unselectItem">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-arrow-left">
                            <path d="m12 19-7-7 7-7" />
                            <path d="M19 12H5" />
                        </svg>
                    </div>

                </div>
                <div class="w-full">
                    <template v-if="selectedItem.direcciones.length > 0 && showDirections">

                        <SelectXDirecciones :elementos="selectedItem.direcciones" @select-item="seleccionarDireccion">
                        </SelectXDirecciones>
                    </template>
                </div>
            </div>
        </template>
    </div>
</template>
  
<script setup>
import { ref, watch, defineEmits, defineProps } from 'vue';
import { getClientesBusqueda, getTiposCliente } from '@/api/api.js';
import AlertX from './AlertX.vue';
import LoadingIcon from './LoadingIcon.vue';
import SelectXDirecciones from './SelectXDirecciones.vue';

const props = defineProps({
    reload: Boolean,
    showDirections: {
        type: Boolean,
        default: true
    }
});

const direccionesFormat = ref([]);

const searchQuery = ref('');
let debounceTimeout = null;

const selectedItem = ref({});
const isSelected = ref(false);
const noResults = ref(false);

const loading = ref(false);
const tipoCliente = ref(null);




const emit = defineEmits(['select-item', 'unselect-item', 'error']);



const items = ref([]);


const seleccionarDireccion = (direccion) => {
    selectedItem.value.direccionSelected = direccion;
    selectItem(selectedItem.value);
};

const obtenerTipoCliente = async () => {
    try {
        const tipos = await getTiposCliente();
        tipos.data.forEach(element => {
            if (element.id == selectedItem.value.tipoCliente) {
                //selectedItem.value.tipoCliente = element;
                tipoCliente.value = element.tipoCliente;
            }
        });
        
    } catch (error) {
        console.log(error);
    }
};

const selectItem = async (item) => {
    selectedItem.value = item;
    searchQuery.value = item.nombre;
    isSelected.value = true;
    await obtenerTipoCliente();


    let cliente = {
        id: item.id,
        nombre: item.nombre,
        telefono: item.telefono,
        direcciones: item.direcciones,
        email: item.email,
        rfc: item.RFC,
        tipoCliente: item.tipoCliente,
        direccionSelected: item.direccionSelected,
    };
    emit('select-item', cliente);
};
const unselectItem = () => {
    selectedItem.value = null;
    searchQuery.value = '';
    isSelected.value = false;
    emit('unselect-item');
};

watch(
    () => selectedItem.value,
    () => {
        if (selectedItem.value == null) {
            direccionesFormat.value = [];
        }
    }
);

watch(
    () => props.reload,
    () => {
        unselectItem();
    }
);

watch(
    () => searchQuery.value,
    () => {
        getClientes();
    }
)


const getClientes = async () => {
    if (searchQuery.value.length < 1) {
        noResults.value = false;
        return;
    }

    try {
        items.value = [];
        loading.value = true;
        let query = {
            nombre: searchQuery.value,
        }
        const clientes = await getClientesBusqueda(query);
        items.value = clientes.data;
        if (items.value.length == 0) {
            noResults.value = true;
        } else {
            noResults.value = false;
        }
        loading.value = false;

    } catch (error) {
        loading.value = false;
        console.log(error);
        if (!error.response) {
            emit('error');
            return;
        }

        if (error.response.status == 500) {
            emit('error');
            return;
        }

    }


};


</script>
