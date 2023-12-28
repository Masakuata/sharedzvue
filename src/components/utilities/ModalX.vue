<template>
    <div @click="clickOut" v-if="isVisible"
        class="modal fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
        <div class="bg-white rounded-lg p-4 max-w-xs w-full z-50">
            <slot name="header">
                <!-- Contenido predeterminado del encabezado -->
                Encabezado del Modal
            </slot>

            <slot>
                <!-- Contenido predeterminado del cuerpo -->
                Contenido del Modal
            </slot>

            <div class="flex justify-center space-x-3 mt-4">
                <button v-if="isCancelable" @click="cancel"
                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                    Cancelar
                </button>

                <button @click="confirm" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r">
                    Aceptar
                </button>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { defineProps, defineEmits } from 'vue';

const emit = defineEmits(['confirm', 'cancel']);

const props = defineProps({
    isVisible: Boolean,
    isCancelable: Boolean
});

const clickOut = () => {
    if (props.isCancelable) {
        emit('cancel');
    } else {
        emit('confirm');
    }
};

const confirm = () => {
    emit('confirm');
};

const cancel = () => {
    emit('cancel');
};
</script>

<style>
.modal {
    z-index: 9999 !important;
}
</style>