<template>
    <div @click="clickOut" v-if="isVisible"
        class="modal fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
        <div class="bg-gray-100 h-fit pb-10 rounded-lg  w-full md:w-2/4 mx-4 z-50">
            <div class="w-full flex flex-row h-12 bg-bgBlue rounded-t-lg text-white justify-center items-center">
                <p class="text-lg font-semibold text-white w-full text-center">{{ titulo }}</p>
            </div>
            
            <div class="p-3">
                <p class="w-full text-center font-semibold">{{ mensaje }}</p>
                <div class="flex flex-row w-full mt-3">
                    <div class="w-1/2 px-3">
                        <button class="w-full rounded-lg h-12 text-white font-semibold"
                        :class="[{'bg-bgBlue' : isImportant},{'bg-red-600' : !isImportant} ] "
                            @click="emitirCancelar">{{ textoCancelar }}</button>
                    </div>
                    <div class="w-1/2 px-3">
                        <button @click="emitirRealizar" class="w-full rounded-lg h-12 text-white font-semibold" :class="[{'bg-red-600' : isImportant},{'bg-bgBlue' : !isImportant} ] ">{{ textoRealizar }}</button>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>

    <!-- <ModalConfirmationX :isVisible="isVisibleModalDelete" :mensaje="mensajeModalDelete" titulo="Eliminar producto"
            @cancelar="cerrarModalDelete" @realizar="confirmarEliminar" :is-important="true"
            texto-cancelar="Regresar" texto-realizar="Eliminar">
            >
        </ModalConfirmationX> -->
</template>

<script setup>
import { defineEmits, defineProps} from 'vue';


const emit = defineEmits(['cancelar', 'realizar']);

const props = defineProps({
    isVisible: Boolean,
    isImportant: Boolean,
    titulo: String,
    textoRealizar: String,
    textoCancelar: String,
    mensaje: String,
});


const emitirCancelar = () => {
    emit('cancelar');
};

const emitirRealizar = () => {
    emit('realizar');
};

const clickOut = () => {
    emit('cancelar');
};

</script>
