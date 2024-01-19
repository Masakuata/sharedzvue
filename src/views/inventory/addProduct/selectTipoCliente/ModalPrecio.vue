<template>
    <div @click="clickOut" v-if="isVisible"
        class="modal fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
        <div class="bg-gray-100 h-fit pb-10 rounded-lg  w-full mx-4 z-50">
            <p class="w-full h-14 text-center text-white font-semibold bg-bgBlue rounded-t-lg pt-4">Precios</p>
            <div class="w-full px-3">
                <p class="mt-4 text-lg font-semibold text-black w-full text-center">{{ mensaje }}</p>
                <AlertX :flag="alerVisible" message="El precio no puede ser 0"></AlertX>
                <div class="w-full flex flex-row justify-center">
                    <div class="relative">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                class="lucide lucide-dollar-sign">
                                <line x1="12" x2="12" y1="2" y2="22" />
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                        </div>
                        <input v-model="precio" id="default-search"
                            class="block w-full p-4 ps-10 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required>
                    </div>


                </div>
                <div class="flex flex-row space-x-3 mt-3">

                    <ButtonX color="red" @click="emitirCerrarModal">Cancelar</ButtonX>
                    <ButtonX color="blue" @click="emitirConfirmar">Agregar</ButtonX>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, onMounted, ref, watch } from 'vue';
import ButtonX from '@/components/utilities/ButtonX.vue';
import AlertX from '@/components/utilities/AlertX.vue';
import {filtrarEntrada} from '@/utils/validator.js';


const precio = ref('0');

const alerVisible = ref(false);


const emit = defineEmits(['cerrarModal', 'confirmar', 'editar']);
const props = defineProps({
    isVisible: Boolean,
    mensaje: String,
    isEdit: Boolean,
    tipo: Object,
});

const emitirEditar = () => {
    if (precio.value === '' || precio.value === '0') {
        alerVisible.value = true;
        return;
    }

    let nuevoTipo = {
        id: props.tipo.id,
        tipoCliente: props.tipo.tipoCliente,
        precio: precio.value,
    };
    emit('editar',  nuevoTipo);
};

const emitirConfirmar = () => {

    if (props.isEdit) {
        emitirEditar();
        return;
    }

    if (precio.value === '' || precio.value === '0') {
        alerVisible.value = true;
        return;
    }

    let nuevoTipo = {
        id: props.tipo.id,
        tipoCliente: props.tipo.tipoCliente,
        precio: precio.value,
    };
    emit('confirmar',  nuevoTipo);
};

const emitirCerrarModal = () => {
    emit('cerrarModal');
};
const clickOut = () => {
    if (props.isCancelable) {
        emit('cerrarModal');
    }
};

watch(
    () => precio.value,
    () => {

        alerVisible.value = false;
        if (precio.value ) {
            let precioString = precio.value.toString();
            precio.value = filtrarEntrada(precioString);
        }   
        
    }
)

onMounted(() => {
    if (props.isEdit) {
        precio.value = props.tipo.precio;
    }

    
})


</script>
