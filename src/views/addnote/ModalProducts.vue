<template>
    <div v-if="isVisible" class="modal fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center ">
        <div class="bg-white rounded-lg mx-4 h-[90vh] w-full z-50">
            <p class="bg-bgBlue text-center text-white text-xl h-fit p-2 rounded-t-lg">Selecciona un producto y agrégalo a
                la lista de compra</p>


            <div class="p-4">
                <SearchProduct @select-product="selectProduct" :tipo-cliente="props.tipoCliente"></SearchProduct>
                <template v-if="isProductSelected">
                    <div class="mt-3">
                        <ProductDetails :producto="producto"></ProductDetails>
                    </div>
                    <div v-if="!isProductInList" class="flex flex-row items-center text-right">
                        <p class="w-full text-left pr-3">Selecciona la cantidad</p>
                        <input v-model="cantidad" class="w-20 h-10 border border-gray-400 rounded-lg mt-2 px-2">
                    </div>

                    <div v-if="isProductInList" class="w-full">
                        <p class="text-red-500 text-center">Este producto ya se encuentra en la lista de compra. ¿Desea modificar
                            la cantidad de compra?</p>
                        <div class="flex  flex-row w-full  items-center border border-blue-500 rounded-lg px-3">
                            <p class="w-6/12 text-left h-fit">Cantidad en lista</p>
                            <div v-if="!editCantidadMode" class="flex flex-row w-6/12  h-10 items-center ">
                                <p class="w-full text-center h-fit pr-3">{{ productoEnLista.cantidadCompra }}</p>
                                <div class="w-10" @click="toggleEditCantidadMode">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="lucide lucide-pencil text-bgBlue">
                                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                                        <path d="m15 5 4 4" />
                                    </svg>
                                </div>

                            </div>
                            <div v-else class="flex flex-row items-center justify-center h-14 w-6/12">
                                <input v-model="nuevaCantidad" class="w-20 h-10 border border-gray-400 rounded-lg px-2">
                            </div>

                        </div>

                    </div>

                    <div class="flex justify-center space-x-3 mt-4">
                        <ButtonX @click="cancel" color="red">Cancelar</ButtonX>

                        <ButtonX v-if="isProductInList" @click="confirm" color="blue">Actualizar</ButtonX>
                        <ButtonX v-else="isProductInList" @click="confirm" color="blue">Agregar</ButtonX>
                    </div>
                </template>
                <template v-else>
                    <div class="flex  flex-col  h-[70vh] ">
                        <button @click="cancel"
                            class="w-full text-white text-lg font-semibold h-12 mt-auto bg-red-500 rounded-lg">Cancelar</button>
                    </div>
                </template>


            </div>


        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';
import SearchProduct from '@/components/utilities/SearchProduct.vue';
import ProductDetails from '@/components/utilities/ProductDetails.vue';
import { toast } from 'vue3-toastify';
import ButtonX from '@/components/utilities/ButtonX.vue';

const emit = defineEmits(['confirmAddProduct', 'cancelAddProduct']);
const producto = ref(null);
const isProductSelected = ref(false);
const cantidad = ref('0');
let cantidadDisponible = 0;

const productoEnLista = ref({});
const isProductInList = ref(false);
const editCantidadMode = ref(false);

const nuevaCantidad = ref(0);

const props = defineProps({
    isVisible: Boolean,
    productosLista: Array,
    venta: Object,
    tipoCliente: Number,
});

const selectProduct = (item) => {
    if (item != null) {
        isProductSelected.value = true
        producto.value = item;
        cantidadDisponible = item.cantidad;


    } else {
        isProductSelected.value = false
        isProductInList.value = false;
        editCantidadMode.value = false;
        producto.value = null;
    }

};



const clearComponent = () => {
    producto.value = null;
    isProductSelected.value = false;
    cantidad.value = '1';
    nuevaCantidad.value = 0;
    isProductInList.value = false;
    editCantidadMode.value = false;
    productoEnLista.value = null;
    cantidadDisponible = 0;
};

const confirm = () => {
    if (producto.value != null) {
        

        if (isProductInList.value) {
            if (nuevaCantidad.value === 0) {
                toast("No puedes editar un producto con cantidad 0", {
                    type: 'warning',
                    autoClose: 2000,
                });
                return;
            }
            producto.value.cantidadCompra = nuevaCantidad.value;
            let subtotal = nuevaCantidad.value * producto.value.precio;
            subtotal = subtotal.toFixed(2);
            subtotal = parseFloat(subtotal);
            producto.value.subtotal = subtotal;
        } else {
            if (cantidad.value == '0') {
                toast("No puedes agregar un producto con cantidad 0", {
                    type: 'warning',
                    autoClose: 2000,
                });
                return;   
            }
            let cantidadInt = parseInt(cantidad.value);
            producto.value.cantidadCompra = cantidadInt;
            let subtotal = cantidadInt * producto.value.precio;
            subtotal = subtotal.toFixed(2);
            subtotal = parseFloat(subtotal);
            producto.value.subtotal = subtotal;
        }

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

    if (productoEmit.cantidad === 0) {
        toast("No puedes agregar un producto con cantidad 0", {
            type: 'warning',
            autoClose: 2000,
        });
        return;
    }
    
    emit('confirmAddProduct', productoEmit);
    clearComponent();
};

const cancel = () => {
    clearComponent();
    emit('cancelAddProduct');
};

watch(
    () => cantidad.value,
    () => {
        cantidad.value = cantidad.value.replace(/\D/g, '');
        let cantidadInt = parseInt(cantidad.value);
        if (cantidadInt > cantidadDisponible) {
            if (producto.value!= null) {
                cantidad.value = cantidadDisponible.toString();
                notify();
            }
        }
    }
)

const validarProductoEnLista = () => {
    if (producto.value != null) {
        let productoAux = props.productosLista.find(item => item.id == producto.value.id);
        if (productoAux != null) {
            isProductInList.value = true;
            productoEnLista.value = productoAux;
        } else {
            isProductInList.value = false;
            productoEnLista.value = null;
        }
    }
}
const toggleEditCantidadMode = () => {
    editCantidadMode.value = !editCantidadMode.value;
}


watch(
    () => producto.value,
    () => {
        validarProductoEnLista();
    }
)

watch(
    () => productoEnLista.value,
    () => {
        if (productoEnLista.value != null) {
            nuevaCantidad.value = productoEnLista.value.cantidadCompra;
        }
    }
)
watch(
    () => nuevaCantidad.value,
    () => {
        calcularNuevaCantidad();
    }
)

const calcularNuevaCantidad = () => {
    if(productoEnLista.value == null){
        return;
    }
    if (nuevaCantidad.value > productoEnLista.value.cantidad) {
        nuevaCantidad.value = productoEnLista.value.cantidad;
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
