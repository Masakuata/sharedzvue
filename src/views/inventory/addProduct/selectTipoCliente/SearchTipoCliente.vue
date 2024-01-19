<template>
    <template v-if="isVisibleModal">
        <ModalPrecio :mensaje="mensaje" :is-edit="isEdit" :is-visible="isVisibleModal" :tipo="tipoSelected" @confirmar="agregarTipoCliente"
            @cerrarModal="cerrarModal" @editar="editarEmit"  ></ModalPrecio>
    </template>

    <template v-if="isVisibleModalConfirmacion">
        <ModalConfirmationX :mensaje="mensajeConfirmacion" :isImportant="true" :is-visible="isVisibleModalConfirmacion" :titulo="titulo"
            :textoRealizar="mensajeButtonOk" :textoCancelar="mensajeButtonCancel" @cancelar="cerrarModalConfirmacion"
            @realizar="eliminarTipoCliente"></ModalConfirmationX>

    </template>
    <div class="mt-3" :class="[{'relative' : !isVisibleModal && !isVisibleModalConfirmacion}]">

        <div @click="isOpen = !isOpen"
            class="w-full bg-bgBlue p-1 rounded-t-lg text-white font-semibold text-center items-center">
            <p>SELECCIONAR TIPO DE CLIENTE</p>
            <div class="w-full flex flex-row justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-chevron-down">
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </div>

        </div>
        <!-- Contenido del desplegable -->
        <div v-show="isOpen" class="absolute  w-full bg-gray-100 shadow-xl rounded max-h-40 overflow-scroll " :class="{'pb-3' : isOpen}">
            <div class="flex flex-col">
                <!-- Iteramos sobre el array de tipos de cliente -->
                <div v-for="tipo in tiposCliente" :key="tipo.id"
                    class="p-1  cursor-pointer border border-gray-600 rounded-lg mt-1" @click="selectItem(tipo)">
                    {{ tipo.tipoCliente }}
                </div>
            </div>
        </div>
    </div>

    <p class="h-8 bg-[#3d5a80] rounded-t-lg text-white font-semibold mt-3 text-center w-full">$Precios seleccionados$</p>
    <div class="w-full max-h-40 rounded-b-lg pb-2 border-l border-b border-r border-gray-500 overflow-scroll px-2">
        <template v-if="tiposClientesSeleccionados.length == 0">
            <p class="w-full text-center font-semibold">Aún no se ha seleccionado ningun precio</p>
        </template>
        <div v-for="tipoSeleccionado in tiposClientesSeleccionados" :key="tipoSeleccionado.id"
            class="mt-1 px-2 py-1 rounded-lg flex flex-row border border-gray-600">
            <p @click="editarPrecio(tipoSeleccionado)" class=" font-semibold w-6/12">{{ tipoSeleccionado.tipoCliente }}</p>
            <p @click="editarPrecio(tipoSeleccionado)" class="font-semibold w-5/12">{{ 'Precio: $' + tipoSeleccionado.precio }}</p>
            <div class="w-1/12 flex flex-row items-center text-center justify-center text-red-700"
                @click="mostrarModalConfirmacion(tipoSeleccionado)">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-x-circle">
                    <circle cx="12" cy="12" r="10" />
                    <path d="m15 9-6 6" />
                    <path d="m9 9 6 6" />
                </svg>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted, defineProps } from 'vue';
import ModalPrecio from './ModalPrecio.vue';
import ModalConfirmationX from '@/components/utilities/ModalConfirmationX.vue';

const mensajeConfirmacion = ref('¿Está seguro de eliminar este precio?');

const mensajeButtonOk = ref('Eliminar precio');
const mensajeButtonCancel = ref('Regresar');


const titulo = ref('Confirmar eliminar precio');
const isVisibleModalConfirmacion = ref(false);
const tipoEliminar = ref(null);

const ID_PUBLICO = 1;

const cerrarModalConfirmacion = () => {
    isVisibleModalConfirmacion.value = false;
}

const mostrarModalConfirmacion = (tipo) => {
    tipoEliminar.value = tipo;
    isVisibleModalConfirmacion.value = true;
}   


const mensaje = ref('Ingrese el precio');



const props = defineProps({
    tiposClientesSeleccionados: {
        type: Array,
        required: true
    }
});



import { getTiposCliente } from '@/api/api.js';



const tipoSelected = ref(0);

const isVisibleModal = ref(false);



const isEdit = ref(false);

const tiposCliente = ref([
]);

const obtenerTiposCliente = async () => {
    
    try {
        const response = await getTiposCliente();


        tiposCliente.value = response.data;
        
        
        ordenarTiposCliente();

        eliminarPrecioPublicoClientesSeleccionados();
        eliminarTiposSeleccionados();

    } catch (error) {
        console.log('obtenerTiposCliente', error);
    }

}

const eliminarPrecioPublicoClientesSeleccionados = () => {
    props.tiposClientesSeleccionados.forEach((item, index) => {
        if (item.id === ID_PUBLICO) {
            props.tiposClientesSeleccionados.splice(index, 1);
        }
    });
}

const eliminarTiposSeleccionados = () => {
    eliminarTipoClienteId(ID_PUBLICO);
    props.tiposClientesSeleccionados.forEach((itemFor, index) => {
        let id = itemFor.id;
        
        eliminarTipoClienteId(id);
    });
}

//const tiposClientesSeleccionados = ref([]);

// Estado para manejar la visibilidad del desplegable
const isOpen = ref(false);

const cerrarModal = () => {
    isVisibleModal.value = false;
}



const selectItem = (tipo) => {
    tipoSelected.value = tipo;
    mensaje.value = `Ingrese el precio para el tipo de cliente ${tipo.tipoCliente}`;

    isVisibleModal.value = true;

    isOpen.value = false;
}

const eliminarTipoClienteId = (id) => {
    //Eliminar elemento de la lista de tipos de cliente
    

    tiposCliente.value = tiposCliente.value.filter(item => item.id !== id);

    
}

const agregarTipoCliente = (nuevoTipo) => {

    

    //Eliminar elemento de la lista de tipos de cliente
    tiposCliente.value = tiposCliente.value.filter(item => item.id !== nuevoTipo.id);

    //Agregar elemento a la lista de tipos de cliente seleccionados
    props.tiposClientesSeleccionados.push(nuevoTipo);

    //tiposClientesSeleccionados.value.push(nuevoTipo);

    ordenarTiposClienteSeleccionados();

    isVisibleModal.value = false;
}

const eliminarTipoCliente = () => {

    

    props.tiposClientesSeleccionados.forEach((item, index) => {

        if (item.id === tipoEliminar.value.id) {
            props.tiposClientesSeleccionados.splice(index, 1);
            tiposCliente.value.push(item);
        }
    });
    ordenarTiposCliente();
    cerrarModalConfirmacion();
}


const editarPrecio = (tipo) => {
    isEdit.value = true;
    tipoSelected.value = tipo;

    mensaje.value = `Ingrese el nuevo precio para el tipo de cliente ${tipo.tipoCliente}`;

    isVisibleModal.value = true;
}

const editarEmit = (nuevoTipo) => {
    

    //Eliminar elemento de la lista de tipos de cliente seleccionados
    //tiposClientesSeleccionados.value = tiposClientesSeleccionados.value.filter(item => item.id !== nuevoTipo.id);
    

    props.tiposClientesSeleccionados.forEach((item, index) => {
        if (item.id === nuevoTipo.id) {
            item.precio = nuevoTipo.precio;
        }
    });



    ordenarTiposClienteSeleccionados();

    isEdit.value = false;
    isVisibleModal.value = false;
}




const ordenarTiposCliente = () => {
    tiposCliente.value.sort((a, b) => a.tipoCliente.localeCompare(b.tipoCliente));
}

const ordenarTiposClienteSeleccionados = () => {
    //tiposClientesSeleccionados.value.sort((a, b) => a.tipoCliente.localeCompare(b.tipoCliente));
    props.tiposClientesSeleccionados.sort((a, b) => a.tipoCliente.localeCompare(b.tipoCliente));
}

onMounted(() => {
    obtenerTiposCliente();
    
    
});

</script>
  

  