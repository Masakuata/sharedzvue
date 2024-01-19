<template>
    <div @click="clickOut" v-if="isVisible"
        class="modal fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
        <div class="bg-gray-100 h-fit pb-10 rounded-lg  w-full mx-4 z-50">
            <p class="bg-bgBlue h-12 rounded-t-lg text-lg font-semibold text-white w-full text-center">{{ titulo }}</p>
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
