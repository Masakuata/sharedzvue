<template>
    <div @click="clickOut" class="modal fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
        <div class="bg-gray-100 h-fit pb-10 rounded-lg  w-full md:w-6/12 mx-4 z-50">
            <p class="w-full h-14 text-center text-white font-semibold bg-bgBlue rounded-t-lg pt-4">{{ titulo }}</p>
            <div class="w-full px-3">
                <p class="mt-4 text-lg font-semibold text-black w-full text-center">{{ mensaje }}</p>
                <AlertX :flag="alerVisible" message='Ingresa una dirección válida por favor.'></AlertX>
                <div class="w-full flex flex-row justify-center">

                    <input v-model="valor" 
                        class="block w-full p-4 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                        required>



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
import { filtrarEntrada } from '@/utils/validator.js';


const valor = ref('');

const alerVisible = ref(false);


const emit = defineEmits(['cerrarModal', 'confirmar', 'editar']);

const props = defineProps({
    titulo: String,
    mensaje: String,
    isEdit: Boolean,
    id: Number,
    value: String,
});

const emitirEditar = () => {
    if (valor.value.trim() === '') {
        alerVisible.value = true;
        return;
    }
    let nuevaDireccion = {
        id: props.id,
        valor: valor.value,
    };

    emit('editar', nuevaDireccion);
};

const emitirConfirmar = () => {

    if (props.isEdit) {
        emitirEditar();
        return;
    }

    if (valor.value.trim() === '') {
        alerVisible.value = true;
        return;
    }

    emit('confirmar', valor.value);
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
    () => valor.value,
    () => {
        alerVisible.value = false;
    }
);


onMounted(() => {
    if (props.isEdit) {
        valor.value = props.value;
    }


})


</script>
