<template>
    <template v-if="isVisibleModalAdd">
        <ModalConfirmacionAdd :isVisible="isVisibleModalAdd" :id="route.params.id" :cantAdd="cantidadAumentar"
            :isSub="isSub" :mensaje="mensaje" @cerrarModal="cerrarModalAdd" @confirmar="confirmarActualizacion">
        </ModalConfirmacionAdd>
    </template>
    <h1 class="text-white absolute top-0 right-0 mr-2   text-xl font-semibold text-left mt-3">EXISTENCIAS</h1>
    <template v-if="!loading">
        <div @click="clickEnDiv" class="flex flex-col items-center p-4  w-full h-full md:h-full">
            <div class="flex flex-row w-full h-32  mt-3 rounded-lg overflow-hidden" @click="goEditProduct">
                <div class="w-5/12 bg-bgGray rounded-lg h-full">
                    <div class="p-3 h-full w-full">
                        <svg class="w-full h-full" width="400" height="400" viewBox="0 0 200 200" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <mask id="mask0_254_273" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                                width="200" height="200">
                                <rect width="200" height="200" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_254_273)">
                                <path
                                    d="M41.6667 175C37.0833 175 33.1597 173.368 29.8958 170.104C26.6319 166.84 25 162.917 25 158.333V41.6667C25 37.0833 26.6319 33.1597 29.8958 29.8958C33.1597 26.6319 37.0833 25 41.6667 25H158.333C162.917 25 166.84 26.6319 170.104 29.8958C173.368 33.1597 175 37.0833 175 41.6667V158.333C175 162.917 173.368 166.84 170.104 170.104C166.84 173.368 162.917 175 158.333 175H41.6667ZM50 104.792L83.3333 71.4583L116.667 104.792L150 71.4583L158.333 79.7917V41.6667H41.6667V96.4583L50 104.792ZM41.6667 158.333H158.333V103.333L150 95L116.667 128.333L83.3333 95L50 128.333L41.6667 120V158.333ZM41.6667 158.333V103.333V120V41.6667V158.333Z"
                                    fill="#1C1B1F" />
                            </g>
                        </svg>

                    </div>
                </div>
                <div class="flex flex-col w-7/12 pt-3">
                    <div class="flex flex-row w-full">
                        <p class=" font-semibold text-lg ml-3 mr-2">{{ producto.nombre }}</p>
                    </div>
                    <div class="w-full pl-3">
                        <p class=" font-semibold text-lg">{{ producto.presentacion }}</p>
                    </div>
                    <div class="w-full px-4 pt-4">
                        <button @click="goEditar" class="bg-bgPurple rounded-xl  text-white w-full">Editar</button>
                    </div>

                </div>

            </div>
            <div class="w-full text-lg">
                <div class="flex flex-row">
                    <p class="w-2/3 font-semibold">Cantidad en inventario</p>
                    <p class="w-1/3">{{ producto.cantidad }}</p>
                </div>
                <div class="flex flex-row">
                    <p class="w-2/3 font-semibold">Precio público</p>
                    <p class="w-1/3">{{ precioPublico }}</p>
                </div>
                <div class="flex flex-row">
                    <p class="w-2/3 font-semibold">Precio detalle</p>
                    <p class="w-1/3">{{ precioDetalle }}</p>
                </div>
                <div class="flex flex-row">
                    <p class="w-2/3 font-semibold">Precio mayorista</p>
                    <p class="w-1/3">{{ precioMayorista }}</p>
                </div>

            </div>

            <div class="w-full mt-3">
                <p class="w-full text-lg font-semibold text-center">Modificar inventario</p>
                <div class="flex flex-row  h-16 items-center justify-center w-full ">

                    <div class="w-1/4 h-full flex flex-row py-2 text-red-900 justify-end" @click="dismuir">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-minus-square h-full w-auto">
                            <rect width="18" height="18" x="3" y="3" rx="2" />
                            <path d="M8 12h8" />
                        </svg>
                    </div>
                    <div class="w-2/4">
                        <input v-model="cantidadAumentar" class="w-full rounded-lg" />
                    </div>
                    <div class="w-1/4 py-2 h-full text-green-900" @click="aumentar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-plus-square h-full w-auto">
                            <rect width="18" height="18" x="3" y="3" rx="2" />
                            <path d="M8 12h8" />
                            <path d="M12 8v8" />
                        </svg>
                    </div>
                </div>

            </div>

            <div class="w-full mt-10">
                <ButtonX color="red" @click="regresar">Regresar</ButtonX>
            </div>




        </div>
    </template>
    <template v-else>
        <div>
            <div class="w-full h-96 flex flex-col items-center justify-center">
                <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-bgBlue"></div>
                <p class="text-xl font-bold text-gray-900">Cargando...</p>
            </div>

        </div>

    </template>
</template>
    
<script setup>
import { ref, onMounted, watch } from 'vue';
import { toggleSidebar } from '@/utils/sidebarManager.js';
import ButtonX from '@/components/utilities/ButtonX.vue';
import { useRoute, useRouter } from 'vue-router';
import { getProductoId } from '@/api/api.js'
import ModalConfirmacionAdd from './ModalConfirmacionAdd.vue';


const loading = ref(true);

const isVisibleModalAdd = ref(false);
const isSub = ref(false);
const mensaje = ref('');
const ID_PUBLICO = 1;
const ID_DETALLE = 2;
const ID_MAYORISTA = 3;

const route = useRoute();
const router = useRouter();
const producto = ref({});

const precioDetalle = ref('No definido');
const precioPublico = ref('No definido');
const precioMayorista = ref('No definido');

const cantidadAumentar = ref('0');




const confirmarActualizacion = (flag) => {
    if (flag) {
        isVisibleModalAdd.value = false;
        recargar();

    } else {
        isVisibleModalAdd.value = false;

    }

}
const mostrarModalAdd = () => {
    isVisibleModalAdd.value = true;
};

const aumentar = () => {
    if (cantidadAumentar.value === '' || cantidadAumentar.value === '0') {
        return;
    }
    mensaje.value = '¿Está seguro que desea agregar ' + cantidadAumentar.value + ' unidades al producto ' + producto.value.nombre + '?';
    isSub.value = false;
    mostrarModalAdd();
};
const dismuir = () => {
    if (cantidadAumentar.value === '' || cantidadAumentar.value === '0') {
        return;
    }
    mensaje.value = '¿Está seguro que desea disminuir ' + cantidadAumentar.value + ' unidades al producto ' + producto.value.nombre + '?';
    isSub.value = true;
    mostrarModalAdd();
};

const cerrarModalAdd = () => {
    isVisibleModalAdd.value = false;
};






watch(
    () => cantidadAumentar.value,
    () => {
        cantidadAumentar.value = cantidadAumentar.value.replace(/\D/g, '');
    }
);


const recargar = () => {
    cantidadAumentar.value = '0';
    getProducto();
};


const getProducto = async () => {
    const id = route.params.id;

    try {
        loading.value = true;
        const response = await getProductoId(id);
        producto.value = response.data;
        llenarPrecios();
        loading.value = false;

    } catch (error) {
        loading.value = false;
        console.log(error);
    }



};

const goEditar = () => {
    router.push({ name: 'editproduct', params: { id: producto.value.id } });
};

const llenarPrecios = () => {
    const precios = producto.value.precios;

    precioPublico.value = '$' + producto.value.precio;

    for (let i = 0; i < precios.length; i++) {
        const precio = precios[i];
        if (precio.id === ID_DETALLE) {
            precioDetalle.value = '$' + precio.precio;
        }
        if (precio.id === ID_MAYORISTA) {
            precioMayorista.value = '$' + precio.precio;
        }
    }

};

const regresar = () => {
    router.go(-1);
};


const clickEnDiv = () => {
    toggleSidebar();
};



onMounted(() => {
    getProducto();
});


</script>