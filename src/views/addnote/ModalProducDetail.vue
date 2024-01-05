<template>
    <div v-if="isVisible" class="modal fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center ">
        <div class="bg-white rounded-lg mx-4 h-[60vh] w-full z-50">

            <div class="p-4">
                <div class="mt-3">
                    <ProductDetails :producto="producto"></ProductDetails>
                </div>
                <p class="text-bgBlue font-semibold my-3 text-center w-full">¿Desea actualizar la cantidad en lista?</p>
                <div class="flex  flex-row w-full  items-center border border-blue-500 rounded-lg px-3">
                    <p class="w-6/12 text-left h-fit">Cantidad en lista</p>
                    <div v-if="!editCantidadMode" class="flex flex-row w-6/12  h-10 items-center ">
                        <p class="w-full text-center h-fit pr-3">{{ producto.cantidadCompra }}</p>
                        <div class="w-10" @click="toggleEditCantidadMode">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                class="lucide lucide-pencil text-bgBlue">
                                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                                <path d="m15 5 4 4" />
                            </svg>
                        </div>

                    </div>
                    <div v-else class="flex flex-row items-center justify-center h-14 w-6/12">
                        <input v-model="nuevaCantidad" class="w-20 h-10 border border-gray-400 rounded-lg px-2">
                    </div>

                </div>

                <div class="flex justify-center space-x-3 mt-4">
                    <ButtonX @click="cancel" color="red">Cancelar</ButtonX>
                    <ButtonX  @click="confirm" color="blue">Actualizar</ButtonX>
                </div>

            </div>


        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';
import ProductDetails from '@/components/utilities/ProductDetails.vue';
import { toast } from 'vue3-toastify';
import ButtonX from '@/components/utilities/ButtonX.vue';

const emit = defineEmits(['confirmEditProduct', 'cancelEditProduct']);
const producto = ref(null);


const editCantidadMode = ref(false);
const nuevaCantidad = ref(0);

const props = defineProps({
    isVisible: Boolean,
    producto: Object,
});



const clearComponent = () => {
    nuevaCantidad.value = 0;
    editCantidadMode.value = false;
};

const confirm = () => {
    if (producto.value != null) {
        producto.value.cantidadCompra = nuevaCantidad.value;
        let subtotal = nuevaCantidad.value * producto.value.precio;
        subtotal = subtotal.toFixed(2);
        subtotal = parseFloat(subtotal);
        producto.value.subtotal = subtotal;
    }

    let productoEmit = {
        nombre: producto.value.nombre,
        presentacion: producto.value.presentacion,
        tipoMascota: producto.value.tipoMascota,
        raza: producto.value.raza,
        precio: producto.value.precio,
        cantidad: producto.value.cantidad,
        cantidadCompra: producto.value.cantidadCompra,
        id: producto.value.id,
        subtotal: producto.value.subtotal,
    }
    emit('confirmEditProduct', productoEmit);
    clearComponent();
};

const cancel = () => {
    clearComponent();
    emit('cancelEditProduct');
};



const toggleEditCantidadMode = () => {
    editCantidadMode.value = !editCantidadMode.value;
}


watch(
    () => nuevaCantidad.value,
    () => {
        calcularNuevaCantidad();
    }
)

watch(
    () => props.producto,
    () => {
        producto.value = props.producto;
        nuevaCantidad.value = props.producto.cantidadCompra;
    }
)




const calcularNuevaCantidad = () => {
    if (producto.value == null) {
        return;
    }
    if (nuevaCantidad.value > producto.value.cantidad) {
        nuevaCantidad.value = producto.value.cantidad;
        notify();
    }
}



const notify = () => {
    toast("No puedes vender mas artículos de los que tienes en stock", {
        type: 'warning',
        autoClose: 2000,
    });
}
</script>

<style>
.modal {
    z-index: 9999 !important;
}
</style>
