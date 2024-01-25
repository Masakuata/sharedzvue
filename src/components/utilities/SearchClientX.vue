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
                <div class="flex flex-row w-full h-14 bg-bgBlue  rounded-t-lg overflow-hidden">

                    <div class="flex flex-col w-11/12">

                        <div class="flex flex-row w-full mt-2">
                            <p class="text-white font-semibold text-lg ml-3 mr-2">{{ selectedItem.nombre }}</p>
                        </div>
                    </div>
                    <div class="flex flex-row w-1/12 h-full items-center justify-center">
                        <svg @click="unselectItem" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" class="lucide lucide-x-circle text-red-400">
                            <circle cx="12" cy="12" r="10" />
                            <path d="m15 9-6 6" />
                            <path d="m9 9 6 6" />
                        </svg>
                    </div>

                </div>
                <div class="w-full">
                    <template v-if="selectedItem.direcciones.length > 0">
                        <SelectXDirecciones :elementos="selectedItem.direcciones" @select-item="seleccionarDireccion"></SelectXDirecciones>
                    </template>
                </div>
            </div>
        </template>
    </div>
</template>
  
<script setup>
import { ref, watch, defineEmits, defineProps } from 'vue';
import { getClientesBusqueda } from '@/api/api.js';
import AlertX from './AlertX.vue';
import LoadingIcon from './LoadingIcon.vue';
import SelectXDirecciones from './SelectXDirecciones.vue';

const props = defineProps({
    reload: Boolean,
});

const direccionesFormat = ref([]);

const searchQuery = ref('');
const selectedItem = ref({});
const isSelected = ref(false);
const noResults = ref(false);

const loading = ref(false);


const emit = defineEmits(['select-item', 'unselect-item']);



const items = ref([]);


const seleccionarDireccion = (direccion) => {
    selectedItem.value.direccionSelected = direccion;
    console.log(selectedItem.value);
    selectItem(selectedItem.value);
};

const selectItem = (item) => {
    selectedItem.value = item;
    searchQuery.value = item.nombre;
    isSelected.value = true;

    

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
    () => searchQuery.value,
    () => {
        getClientes();
    }
)

watch(
    () => props.reload,
    () => {
        selectedItem.value = null;
        searchQuery.value = '';
        isSelected.value = false;
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
        const clientes = await getClientesBusqueda(searchQuery.value);
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
    }


};


</script>
