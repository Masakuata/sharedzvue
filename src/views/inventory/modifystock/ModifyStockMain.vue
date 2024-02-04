<template>
    <template v-if="isVisibleModalDelete">
        <ModalConfirmationX :isVisible="isVisibleModalDelete" :mensaje="mensajeModalDelete" titulo="Eliminar producto"
            @cancelar="cerrarModalDelete" @realizar="confirmarEliminar" :is-important="true" texto-cancelar="Regresar"
            texto-realizar="Eliminar">
            >
        </ModalConfirmationX>
    </template>
    <template v-if="isVisibleModalAdd">
        <ModalConfirmacionAdd :isVisible="isVisibleModalAdd" :id="route.params.id" :cantAdd="cantidadAumentar"
            :isSub="isSub" :mensaje="mensaje" @cerrarModal="cerrarModalAdd" @confirmar="confirmarActualizacion"
            @error="errorAlAgregar">
        </ModalConfirmacionAdd>
    </template>
    <template v-if="sessionExpired">
        <ModalSesionExpired></ModalSesionExpired>
    </template>
    <h1 class="text-white absolute top-0 right-0 mr-2   text-xl font-semibold text-left mt-3">EXISTENCIAS</h1>
    <template v-if="!internalError">
        <template v-if="!loading">
            <div @click="clickEnDiv" class="flex flex-col items-center pt-4 px-4  w-full">
                <div class="flex flex-row w-full mt-3 rounded-lg overflow-hidden">
                    <div class="w-5/12  rounded-lg h-full">
                        <div class="p-3 h-full w-full">
                            <template v-if="!imageUrl">
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
                            </template>
                            <template v-else>
                                <img :src="imageUrl" class="object-contain h-40 w-40  rounded-lg shadow-md" />
                            </template>

                        </div>
                    </div>
                    <div class="flex flex-col w-7/12 border py-3">

                        <div class="flex flex-row w-full items-center">
                            <p class=" font-semibold text-lg ml-3 mr-2 w-10/12">{{ producto.nombre }}</p>
                            <div class="w-2/12 h-10 text-red-600 flex flex-row pr-2" @click="mostrarModalDelete">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="lucide lucide-trash-2 h-auto">
                                    <path d="M3 6h18" />
                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                    <line x1="10" x2="10" y1="11" y2="17" />
                                    <line x1="14" x2="14" y1="11" y2="17" />
                                </svg>
                            </div>
                        </div>
                        <div class="w-full pl-3">
                            <p class=" font-semibold text-lg">{{ producto.presentacion }}</p>
                        </div>
                        <div class="w-full px-4">
                            <button @click="goEditar" class="bg-bgPurple rounded-xl mt-1 text-white w-full">Editar</button>
                        </div>

                    </div>

                </div>
                <div class="w-full text-lg">
                    <div class="flex flex-row">
                        <p class="w-2/3 font-semibold">Cantidad en inventario</p>
                        <p class="w-1/3 font-semibold"
                            :class="[{ 'text-green-800': producto.cantidad > 0 }, { 'text-red-800': producto.cantidad <= 0 }]">
                            {{ producto.cantidad }}</p>
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
                


                <div class="w-full flex flex-col justify-end ">
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
    <template v-else>
        <ErrorX @aceptar="getProducto"></ErrorX>

    </template>
</template>
    
<script setup>
import { ref, onMounted, watch } from 'vue';
import { toggleSidebar } from '@/utils/sidebarManager.js';
import ButtonX from '@/components/utilities/ButtonX.vue';
import { useRoute, useRouter } from 'vue-router';
import { getProductoId, getVentas } from '@/api/api.js'
import ModalConfirmacionAdd from './ModalConfirmacionAdd.vue';
import ModalConfirmationX from '@/components/utilities/ModalConfirmationX.vue';
import { eliminarProducto } from '@/api/api.js';
import { toast } from 'vue3-toastify';
import ModalSesionExpired from '@/components/utilities/ModalSesionExpired.vue';
import ErrorX from '@/components/utilities/ErrorX.vue';

import { storage } from '@/firebase.js';
import { ref as storageRef, getDownloadURL } from 'firebase/storage'



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

const imageUrl = ref('');
const hasUrl = ref(false);


const getImageUrl = (id) => {

    const path = process.env.VUE_APP_FIREBASE_PATH + id + '.png';

    getDownloadURL(storageRef(storage, path))
        .then((url) => {
            imageUrl.value = url;
            console.log('url', url);
        })
        .catch((error) => {
            console.log('no url');
        });
};





const cantidadAumentar = ref('0');

//variables del modal de connfirmacion al eliminar
const isVisibleModalDelete = ref(false);
const mensajeModalDelete = ref('');

const internalError = ref(false);
const sessionExpired = ref(false);

const errorAlAgregar = (error) => {
    isVisibleModalAdd.value = false;
    if (!error.response) {
        internalError.value = true;
        return;
    }
    if (error.response.status == 500) {
        internalError.value = true;
        return;
    }
    if (error.response.status == 406) {
        sessionExpired.value = true;
        return;
    }
};

const confirmarEliminar = () => {
    isVisibleModalDelete.value = false;
    eliminar();
};
const cerrarModalDelete = () => {
    isVisibleModalDelete.value = false;
};
const mostrarModalDelete = async () => {

    if (await hasVentas()) {
        mensajeModalDelete.value = 'El producto  ' + producto.value.nombre + ' tiene ventas registradas, ¿Estás seguro de eliminarlo?';
        isVisibleModalDelete.value = true;
        return;
    }

    mensajeModalDelete.value = '¿Está seguro que desea eliminar el producto ' + producto.value.nombre + '?';
    isVisibleModalDelete.value = true;
};

const eliminar = async () => {
    try {
        loading.value = true;
        await eliminarProducto(producto.value.id);
        loading.value = false;
        toast("Producto eliminado exitosamente", {
            type: 'success',
            autoClose: 2000,
        });
        router.go(-1);
    } catch (error) {
        loading.value = false;
        if (!error.response) {
            internalError.value = true;
            return;
        }
        if (error.response.status == 500) {
            internalError.value = true;
            return;
        }
        if (error.response.status == 406) {
            sessionExpired.value = true;
            return;
        }
        toast("No se pudo eliminar el producto", {
            type: 'error',
            autoClose: 2000,
        });

        console.log(error);
    }
};



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

const hasVentas = async () => {
    const id = route.params.id;
    try {
        const params = {
            'producto': id,
        };
        const response = await getVentas(params);
        const ventas = response.data;
        let longitud = ventas.length;

        if (longitud > 0) {
            return true;
        }


        return false;

    } catch (error) {
        console.log(error);
        return false;

    }
};


const getProducto = async () => {
    const idAux = route.params.id;
    const id = parseInt(idAux);

    try {
        loading.value = true;
        const response = await getProductoId(id);
        internalError.value = false;
        producto.value = response.data;
        producto.value.id = id;
        llenarPrecios();
        getImageUrl(id);
        loading.value = false;

    } catch (error) {
        loading.value = false;
        console.log(error);
        if (!error.response) {
            internalError.value = true;
            return;
        }
        if (error.response.status == 500) {
            internalError.value = true;
            return;
        }
        if (error.response.status == 406) {
            sessionExpired.value = true;
            return;
        }
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
const getImage = () => {
    obtenerUrl(producto.value.id);
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