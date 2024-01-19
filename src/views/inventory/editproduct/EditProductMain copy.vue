<template>
    <h1 class="text-white absolute top-0 right-0 mr-2   text-xl font-semibold text-left mt-3">EDITAR PRODUCTO</h1>
    <div @click="clickEnDiv" class="flex flex-col items-center p-4  w-full h-full md:h-full">

        <div class="w-full" >
            <label for="nickname" class="block text-sm font-bold">Nombre del producto</label>
            <input type="text" id="nombreProducto" v-model="nombreProducto" @input="validateNickname"
                class="w-full mt-1 h-10 px-3 border border-solid border-blueLetters rounded-lg" />
            <template v-if="nombreProducto.length > 0">
                <p class="text-green-600" v-if="nombreProductoValid">Nombre Válido</p>
                <p v-else class="text-red-600">El nombre del producto no es válido</p>
            </template>
            <p v-else-if="faltaNombreProducto" class="text-red-600">El nombre del producto es un campo requerido</p>
        </div>

        <div class="w-full" >
            <ButtonX color="blue" >Actualizar Producto</ButtonX>
        </div>
        





    </div>
</template>
    
<script setup>
import { onMounted, ref } from 'vue';
import { toggleSidebar } from '@/utils/sidebarManager.js';
import ButtonX from '@/components/utilities/ButtonX.vue';
import { useRoute, useRouter } from 'vue-router';
import { getProductoId } from '@/api/api.js'



//Variables y métodos globales
const route = useRoute();
const router = useRouter();
let productoInicial = {};
const producto = ref({});

const clickEnDiv = () => {
    toggleSidebar();
};

const getProducto = async () => {
    const id = route.params.id;
    const response = await getProductoId(id);
    productoInicial = response.data;
    producto.value = response.data;
};

const actualizarProducto = async () => {
    
};


//Variables y métodos para el nombre del producto
const nombreProducto = ref('');
const faltaNombreProducto = ref(false);
const nombreProductoValid = ref(false);



const validateNombreProducto = () => {
    if (nombreProducto.value.length > 1) {
        nicknameValid.value = true;
    } else {
        nicknameValid.value = false;
    }
};








onMounted(() => {
    getProducto();
});


</script>