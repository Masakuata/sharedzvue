<template>
    <div v-if="isVisible" class="modal fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center ">
        <div class="bg-white rounded-lg mx-4 max-h-[80vh] md:w-6/12   w-full z-50">
            <div class="bg-bgBlue w-full py-2 flex flex-row items-center rounded-t-lg ">
                <p class=" text-white text-xl w-full text-center ">Selecciona un producto y
                agrégalo a
                la lista de compra</p>
            </div>
            


            <div class="p-4 overflow-scroll h-[60vh]">
                <SearchProduct @select-product="selectProduct" :tipo-cliente="props.tipoCliente"></SearchProduct>
                <template v-if="isProductSelected">
                    <div class="mt-3">
                        <ProductDetails :producto="producto"></ProductDetails>
                    </div>

                    <template v-if="isDisponible">
                        <div v-if="errorCantidadMayor"
                            class="flex flex-row py-1 mt-2 h-fit border-2 border-orange-500 rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                class="lucide lucide-alert-triangle w-10 h-auto mx-2">
                                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                                <path d="M12 9v4" />
                                <path d="M12 17h.01" />
                            </svg>
                            <p>La cantidad no puede ser mayor que la de inventario</p>
                        </div>
                        <div v-if="errorCantidadCero"
                            class="flex flex-row py-1 mt-2 h-fit border-2 border-orange-500 rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                class="lucide lucide-alert-triangle w-10 h-auto mx-2">
                                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                                <path d="M12 9v4" />
                                <path d="M12 17h.01" />
                            </svg>
                            <p>La cantidad no puede ser 0</p>
                        </div>

                        <div v-if="!isProductInList" class="flex flex-row items-center text-right">
                            <p class="w-full text-left pr-3">Selecciona la cantidad</p>
                            <input ref="refInputCantidad"  v-model="cantidad" @keyup.enter="confirm"
                                class="w-20 h-10 border border-gray-400 rounded-lg mt-2 px-2">
                        </div>

                        <div v-if="isProductInList" class="w-full">
                            <p class="text-bgBlue text-center">Este producto ya se encuentra en la lista de venta. ¿Desea
                                modificar
                                la cantidad de venta?</p>
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
                                    <input v-model="nuevaCantidad" @keyup.enter="confirm" class="w-20 h-10 border border-gray-400 rounded-lg px-2">
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
                        <div class="flex flex-col" id="contenedorRegresar">
                            <p class="text-center text-xl">Este producto no se encuentra disponible</p>
                            <button @click="cancel"
                                class="w-full text-white text-lg font-semibold h-12  bg-red-500 rounded-lg">Regresar</button>
                        </div>
                    </template>

                </template>
                <template v-else>
                    <div class="flex  flex-col  h-[50vh]" id="contenedorRegresar">
                        <div class="mt-auto">
                            <ButtonX color="red" @click="cancel" >Regresar</ButtonX>
                        </div>
                        
                        
                    </div>
                </template>
            </div>


        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch, onMounted, nextTick } from 'vue';
import SearchProduct from '@/components/utilities/SearchProduct.vue';
import ProductDetails from '@/components/utilities/ProductDetails.vue';
import { toast } from 'vue3-toastify';
import ButtonX from '@/components/utilities/ButtonX.vue';

const refInputCantidad = ref(null);

const errorCantidadCero = ref(false);
const errorCantidadMayor = ref(false);

const productoEnLista = ref(null);

const isDisponible = ref(true);

const emit = defineEmits(['confirmAddProduct', 'cancelAddProduct', 'editProduct']);
const producto = ref(null);


const isProductSelected = ref(false);
const cantidad = ref('');
let cantidadDisponible = 0;

const isProductInList = ref(false);
const editCantidadMode = ref(false);

const nuevaCantidad = ref('0');

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
        validarProductoEnLista();

    } else {
        isProductSelected.value = false
        isProductInList.value = false;
        editCantidadMode.value = false;
        producto.value = null;
    }

};





const emitEditProduct = () => {
    let nuevaCantidadInt = parseInt(nuevaCantidad.value);
    if (nuevaCantidadInt == 0 || nuevaCantidad.value == '') {
        toast("No puedes editar un producto con cantidad 0", {
            type: 'warning',
            autoClose: 2000,
        });
        errorCantidadCero.value = true;
        return;
    }
    let subtotal = nuevaCantidadInt * producto.value.precio;

    subtotal = subtotal.toFixed(2);
    subtotal = parseFloat(subtotal);

    let pesoTotal = nuevaCantidadInt * producto.value.peso;



    let productoEmit = {
        nombre: producto.value.nombre,
        presentacion: producto.value.presentacion,
        tipoMascota: producto.value.tipoMascota,
        raza: producto.value.raza,
        precio: producto.value.precio,
        cantidad: producto.value.cantidad,
        cantidadCompra: nuevaCantidadInt,
        id: producto.value.id,
        peso: producto.value.peso,
        pesoTotal: pesoTotal,
        subtotal: subtotal,
    }

    emit('editProduct', productoEmit);
}

const confirm = () => {
    if (producto.value != null) {
        if (isProductInList.value) {
            emitEditProduct();
            return;
        } else {
            if (cantidad.value == '0' || cantidad.value == '') {
                toast("No puedes agregar un producto con una cantidad de 0", {
                    type: 'warning',
                    autoClose: 2000,
                });
                errorCantidadCero.value = true;
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

    let pesoTotal = producto.value.cantidadCompra * producto.value.peso;

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
        peso: producto.value.peso,
        pesoTotal: pesoTotal,
    }

    if (productoEmit.cantidad === 0) {
        toast("No puedes agregar un producto con cantidad 0", {
            type: 'warning',
            autoClose: 2000,
        });
        return;
    }

    if (productoEmit.cantidadCompra > productoEmit.cantidad) {
        notifyCantidadExcedida();
        return;
    }

    emit('confirmAddProduct', productoEmit);
};

const cancel = () => {
    emit('cancelAddProduct');
};

watch(
    () => cantidad.value,
    () => {

        if (producto.value == null) {
            return;
        }

        cantidad.value = cantidad.value.replace(/\D/g, '');
        let cantidadInt = parseInt(cantidad.value);

        if (cantidadInt != 0) {
            errorCantidadCero.value = false;
        }


        if (cantidadInt > cantidadDisponible) {
            errorCantidadMayor.value = true;
        } else {
            errorCantidadMayor.value = false;
        }
    }
)

const calcularNuevaCantidad = () => {
    if (!isProductInList.value) {
        return;
    }

    nuevaCantidad.value = nuevaCantidad.value.replace(/\D/g, '');
    let nuevaCantidadInt = parseInt(nuevaCantidad.value);

    if (nuevaCantidadInt != 0) {
        errorCantidadCero.value = false;
    }

    if (nuevaCantidadInt > productoEnLista.value.cantidad) {
        //nuevaCantidad.value = productoEnLista.value.cantidad.toString();
        //notifyCantidadExcedida();
        errorCantidadMayor.value = true;
    } else {
        errorCantidadMayor.value = false;
    }
}



const toggleEditCantidadMode = () => {
    editCantidadMode.value = !editCantidadMode.value;
}









const notifyCantidadExcedida = () => {
    toast("No puedes vender mas artículos de los que tienes en stock", {
        type: 'warning',
        autoClose: 2000,
    });
}

const validarProductoEnLista = () => {
    if (producto.value != null) {

        isDisponible.value = producto.value.cantidad > 0;

        let productoAux = props.productosLista.find(item => item.id == producto.value.id);

        if (productoAux) {
            isProductInList.value = true;
            productoEnLista.value = productoAux;
        } else {
            isProductInList.value = false;
        }
    }
    selecceionarInputCantidad();
}

const selecceionarInputCantidad = () => {
    if (refInputCantidad.value) {
        refInputCantidad.value.focus();
    }else{
        console.log('no hay ref');
    }
}




onMounted(() => {
});



</script>

<style>
.modal {
    z-index: 9999 !important;
}
</style>
