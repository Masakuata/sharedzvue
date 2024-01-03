<template>
    <div v-if="isVisible" class="modal fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center ">
        <div class="bg-white rounded-lg mx-4 h-[90vh] w-full z-50">
            <p class="bg-bgBlue text-center text-white text-xl h-fit p-2 rounded-t-lg">Selecciona un producto y agrégalo a
                la lista de compra</p>


            <div class="p-4">
                <SearchProduct @select-product="selectProduct"></SearchProduct>
                <template v-if="isProductSelected">
                    <div class="mt-3">
                        <ProductDetails :producto="producto"></ProductDetails>
                    </div>
                    <div class="flex flex-row items-center text-right">
                        <p class="w-full text-left pr-3">Selecciona la cantidad</p>
                        <input  v-model="cantidad" class="w-20 h-10 border border-gray-400 rounded-lg mt-2 px-2">
                    </div>


                    <div class="flex justify-center space-x-3 mt-4">
                        <ButtonX @click="cancel" color="red" >Cancelar</ButtonX>
                        <ButtonX @click="confirm" color="blue" >Agregar producto</ButtonX>
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
const cantidad = ref('1');
let cantidadDisponible = 0;

const props = defineProps({
    isVisible: Boolean,
});

const selectProduct = (item) => {
    if (item != null) {
        isProductSelected.value = true
        producto.value = item;
        cantidadDisponible = item.cantidad;
    } else {
        isProductSelected.value = false
        producto.value = null;
    }

};



const clearComponent = () => {
    producto.value = null;
    isProductSelected.value = false;
    cantidad.value = '1';
};

const confirm = () => {
    if (producto.value != null) {
        let cantidadInt = parseInt(cantidad.value);
        producto.value.cantidadCompra =  cantidadInt;
        let subtotal = cantidadInt * producto.value.precio;
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
        if (cantidadInt  > cantidadDisponible) {
            cantidad.value = producto.value.cantidad.toString();
            notify();
        }
    }
)

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
