<template>
    <div v-if="isVisible" class="modal fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center ">
        <div class="bg-white rounded-lg mx-4 w-full z-50">
            <p class="w-full text-white text-center font-semibold bg-bgBlue h-10 rounded-t-lg py-2">Detalles del produco</p>
            <div class="p-4">
                <div class="mt-3">
                    <ProductDetails :producto="producto"></ProductDetails>
                </div>
                <p class="text-bgBlue font-semibold my-3 text-center w-full">¿Desea actualizar la cantidad en lista?</p>
                <div v-if="errorCantidadMayor" class="flex flex-row py-1 my-2 h-fit border-2 border-orange-500 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-alert-triangle w-10 h-auto mx-2">
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                        <path d="M12 9v4" />
                        <path d="M12 17h.01" />
                    </svg>
                    <p>La cantidad no puede ser mayor que la de inventario</p>
                </div>
                <div v-if="errorCantidadCero" class="flex flex-row py-1 my-2 h-fit border-2 border-orange-500 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-alert-triangle w-10 h-auto mx-2">
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                        <path d="M12 9v4" />
                        <path d="M12 17h.01" />
                    </svg>
                    <p>La cantidad no puede ser 0</p>
                </div>
                <div class="flex  flex-row w-full  items-center border border-blue-500 rounded-lg px-3">
                    <p class="w-6/12 text-left h-fit">Cantidad en lista</p>
                    <div v-if="!editCantidadMode" class="flex flex-row w-6/12  h-10 items-center ">
                        <template v-if="producto">
                            <p class="w-full text-center h-fit pr-3">{{ producto.cantidadCompra }}</p>
                        </template>
                        
                        <div class="w-10" @click="toggleEditCantidadMode">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                class="lucide lucide-pencil text-bgBlue">
                                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                                <path d="m15 5 4 4" />
                            </svg>
                        </div>
                    </div>
                    <template v-else>
                        <div class="flex flex-row items-center justify-center h-14 w-6/12">
                            <input v-model="nuevaCantidad" class="w-20 h-10 border border-gray-400 rounded-lg px-2">
                        </div>
                    </template>

                </div>

                <div class="flex justify-center space-x-3 mt-4">
                    <ButtonX @click="cancel" color="red">Cancelar</ButtonX>
                    <ButtonX @click="confirm" color="blue">Actualizar</ButtonX>
                </div>

            </div>


        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch, onMounted } from 'vue';
import ProductDetails from '@/components/utilities/ProductDetails.vue';
import { toast } from 'vue3-toastify';
import ButtonX from '@/components/utilities/ButtonX.vue';

const emit = defineEmits(['confirmEditProduct', 'cancelEditProduct']);
const producto = ref(null);

const errorCantidadMayor = ref(false);
const errorCantidadCero = ref(false);


const editCantidadMode = ref(false);
const nuevaCantidad = ref('0');

const props = defineProps({
    isVisible: Boolean,
    producto: Object,
});



const clearComponent = () => {
    nuevaCantidad.value = '0';
    editCantidadMode.value = false;
};

const confirm = () => {

    let nuevaCantidadInt = parseInt(nuevaCantidad.value);

    if (producto.value != null) {
        producto.value.cantidadCompra = nuevaCantidadInt;
        let subtotal = nuevaCantidadInt * producto.value.precio;
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
        cantidadCompra: nuevaCantidadInt,
        id: producto.value.id,
        subtotal: producto.value.subtotal,
    }


    if (nuevaCantidadInt > producto.value.cantidad) {
        notifyCantidadMayor();
        return;
    }

    if (nuevaCantidadInt == 0 || nuevaCantidad.value == '') {
        notifyCantidadCero();
        return;
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
        
        nuevaCantidad.value = props.producto.cantidadCompra.toString();
        
    }
)




const calcularNuevaCantidad = () => {
    if (producto.value == null) {
        return;
    }
    nuevaCantidad.value = nuevaCantidad.value.replace(/\D/g, '');
    let nuevaCantidadInt = parseInt(nuevaCantidad.value);


    if (nuevaCantidad.value == '' || nuevaCantidadInt == 0) {
        

        errorCantidadCero.value = true;
        return;
    } else {
        errorCantidadCero.value = false;
    }


    if (nuevaCantidadInt > producto.value.cantidad) {
        errorCantidadMayor.value = true;
    } else {
        errorCantidadMayor.value = false;
    }
}



const notifyCantidadMayor = () => {
    toast("No puedes vender mas artículos de los que tienes en stock", {
        type: 'warning',
        autoClose: 2000,
    });
}

const notifyCantidadCero = () => {
    toast("La cantidad no puede ser 0", {
        type: 'warning',
        autoClose: 2000,
    });
}   

onMounted(() => {
    producto.value = props.producto;
    nuevaCantidad.value = props.producto.cantidadCompra.toString();
})

</script>

<style>
.modal {
    z-index: 9999 !important;
}
</style>
