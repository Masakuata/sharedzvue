<template>
    <template v-if="isVisibleModalDirecciones">
        <ModalAddFieldX :titulo="mensajeModal" :mensaje="mensajeModal" @cerrarModal="isVisibleModalDirecciones = false"
            @confirmar="agregrarDireccion" @editar="editarDireccion" :is-edit="isEdit" :id="direccionSeleccionada.id"
            :value="direccionSeleccionada.valor" />
    </template>

    <template v-if="isVisibleModalConfirmacion">
        <ModalConfirmationX titulo="¿Desea eliminar la siguiente dirección?" :is-visible="isVisibleModalConfirmacion"
            :is-important="true" :mensaje="mensajeModalConfirmacion" texto-realizar="Eliminar" texto-cancelar="Cancelar"
            @cancelar="cancelarEliminarDireccion" @realizar="eliminarDireccion" />
    </template>
    <div class="w-full p-4 border rounded-lg">
        <ButtonX color="purple" :is-slim="true" icon="add" @click="isVisibleModalDirecciones = true">Agregar direcciones
        </ButtonX>
        <div class="flex flex-col space-y-2 mt-2 max-h-52 overflow-scroll">

            <div v-if="direcciones.length === 0" class="flex flex-row justify-center items-center p-2">

                <p class="text-gray-900">No hay direcciones registradas</p>
            </div>

            <div v-for="direccion in direcciones" :key="direccion.id"
                class="flex flex-row p-2 border rounded-lg items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-map-pinned w-2/12 text-bgBlue">
                    <path d="M18 8c0 4.5-6 9-6 9s-6-4.5-6-9a6 6 0 0 1 12 0" />
                    <circle cx="12" cy="8" r="2" />
                    <path
                        d="M8.835 14H5a1 1 0 0 0-.9.7l-2 6c-.1.1-.1.2-.1.3 0 .6.4 1 1 1h18c.6 0 1-.4 1-1 0-.1 0-.2-.1-.3l-2-6a1 1 0 0 0-.9-.7h-3.835" />
                </svg>
                <p class="text-gray-900 w-9/12 truncate" @click="mostrarModalEditar(direccion)">{{ direccion.valor }}</p>
                <p class="w-1/12 text-red-700 font-bold" @click="mostrarModalEliminar(direccion)">X</p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineEmits, ref, defineProps, watch, onMounted } from 'vue';
import ModalAddFieldX from './ModalAddFieldX.vue';
import ButtonX from './ButtonX.vue';
import ModalConfirmationX from './ModalConfirmationX.vue';
import { toast } from 'vue3-toastify';
import { addDireccion } from '@/api/api.js'


const tituloModal = ref('Agregar Dirección');
const mensajeModal = ref('Agrega una de las direcciones del cliente');
const mensajeModalConfirmacion = ref('¿Desea eliminar la siguiente dirección?');
const isVisibleModalDirecciones = ref(false);
const isVisibleModalConfirmacion = ref(false);
const direcciones = ref([]);

let idDireccionEliminar = 0;

const isEdit = ref(false);
const direccionSeleccionada = ref({});

const props = defineProps({
    switch: Boolean,
    direcciones: Array,
    idCliente: String,
});

const emit = defineEmits(['updateItems' , 'deleleItem', 'actualizarDireccion']);

const agregrarDireccion = (direccion) => {
    let direccionFormateada = direccion.trim();

    if (verificarDireccionRepedida(direccionFormateada)) {
        isVisibleModalDirecciones.value = false;
        toast("La direccion ingresada ya existe", {
            type: 'error',
            autoClose: 2000,
        });
        return;
    }
    let direccionAux = {
        direccion: direccionFormateada,
    };

    registrarDireccion(direccionAux);
    //Aqui hacer la peticion
};

const registrarDireccion = async (direccion) => {
    try {
        const response = await addDireccion(props.idCliente, direccion);
        

        //eXTRAER EL ID Y DIRECCION DE LA RESPUSTA Y PUSHEARLO AL ARREGLO
        let direccionAux = {
            id: response.data.id,
            valor: response.data.direccion,
        };

        direcciones.value.push(direccionAux);
        isVisibleModalDirecciones.value = false;
        emit('updateItems', direcciones.value);

        return response;
    } catch (error) {
        console.log('El error es', error);
        return error;
    }
};


//
const eliminarDireccion = () => {
    
    //Se elimina la direccion que coincida con el id
    let direccionEliminar = direcciones.value.find((dir) => dir.id === idDireccionEliminar);

    //Se elimina la direccion del arreglo
    direcciones.value = direcciones.value.filter((dir) => dir.id !== idDireccionEliminar);

    emit('deleleItem',direccionEliminar);
    emit('updateItems', direcciones.value);
};


const cancelarEliminarDireccion = () => {
    isVisibleModalConfirmacion.value = false;
};
const mostrarModalEliminar = (direccion) => {
    mensajeModalConfirmacion.value = `¿Desea eliminar la siguiente dirección? ${direccion.valor}`;
    idDireccionEliminar = direccion.id;

    isVisibleModalConfirmacion.value = true;
};

const mostrarModalEditar = (direccion) => {
    isEdit.value = true;
    direccionSeleccionada.value = direccion;
    tituloModal.value = 'Editar Dirección';
    mensajeModal.value = 'Edita la dirección del cliente';

    isVisibleModalDirecciones.value = true;
};


//verificar la direccion repedita sin importar mayusculas
const verificarDireccionRepedida = (direccion) => {
    let direccionRepetida = direcciones.value.find((dir) => dir.valor.toLowerCase() === direccion.toLowerCase());
    return direccionRepetida;
};

//Verificar si la direccion es repetida y tiene diferente id
const verificarDireccionRepedidaConId = (direccion) => {

    let direccionRepetida = direcciones.value.find((dir) => dir.valor.toLowerCase() === direccion.valor.toLowerCase() && dir.id !== direccion.id);


    return direccionRepetida;
};

//Editar una direccion del arreglo por su id
const editarDireccion = (direccion) => {



    let direccionFormateada = direccion.valor.trim();
    let direccionAux = {
        id: direccion.id,
        valor: direccionFormateada,
    };

    if (verificarDireccionRepedidaConId(direccionAux)) {
        isVisibleModalDirecciones.value = false;
        toast("La direccion ingresada ya existe", {
            type: 'error',
            autoClose: 2000,
        });
        isEdit.value = false;
        return;
    }

    direcciones.value.forEach((dir) => {
        if (dir.id === direccion.id) {


            dir.valor = direccionFormateada;
        }
    });
    isEdit.value = false;
    emit('actualizarDireccion', direccionAux);
    isVisibleModalDirecciones.value = false;
};

watch(
    () => props.switch,
    () => {
        direcciones.value = [];
    }
)

onMounted(() => {
    direcciones.value = props.direcciones;
});

</script>