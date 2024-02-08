<template>
    <div @click="clickOut" v-if="isVisible"
        class="modal fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
        <div class="bg-gray-100 h-fit pb-10 rounded-lg  w-full md:w-1/4 mx-4 z-50">
            <div class="bg-bgBlue h-12 rounded-t-lg flex flex-row items-center">
                <p class=" text-lg font-semibold text-white w-full text-center">Confirmar cancelar
                venta</p>
            </div>
            
            <div class="p-3">
                <p class="w-full text-center font-semibold">¿Está seguro de cancelar esta esta venta?</p>
                <p class="w-full text-center">La lista de productos será borrada</p>
                <div class="flex flex-row w-full mt-3">
                    <div class="w-1/2 px-3">
                        <button class="w-full rounded-lg h-12 text-white font-semibold bg-bgBlue"
                            @click="emitirCerrarConfirmarVenta">Regresar</button>
                    </div>
                    <div class="w-1/2 px-3">
                        <button @click="emitirCancelarVenta" class="w-full rounded-lg h-12 text-white font-semibold bg-red-600">Cancelar Venta</button>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineEmits, defineProps} from 'vue';


const emit = defineEmits(['cancelarVenta', 'cerrarModalCancelarVenta']);

const props = defineProps({
    isVisible: Boolean,
});


const emitirCancelarVenta= () => {
    emit('cancelarVenta');
};

const emitirCerrarConfirmarVenta = () => {
    emit('cerrarModalCancelarVenta');
};



const clickOut = () => {
    if (props.isCancelable) {
        emit('cerrarModalCancelarVenta');
    }
};

</script>
