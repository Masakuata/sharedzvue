<template>
    <template v-if="isVisibleModalInfo">
        <ModalInfoX mensaje="Cliente eliminado exitosamente" titulo="Eliminación cliente" @aceptar="cerrarModalInfo">
        </ModalInfoX>
    </template>

    <template v-if="isVisibleModalDelete">
        <ModalConfirmationX :isVisible="isVisibleModalDelete" :mensaje="mensajeModalDelete" titulo="Eliminar producto"
            @cancelar="cerrarModalDelete" @realizar="confirmarEliminar" :is-important="true" texto-cancelar="Regresar"
            texto-realizar="Eliminar">
            >
        </ModalConfirmationX>
    </template>
    <template v-if="sessionExpired">
        <ModalSesionExpiredVue></ModalSesionExpiredVue>
    </template>


    <h1 class="text-white absolute top-0 right-0 mr-2   text-xl font-semibold text-left mt-3">DETALLE CLIENTE</h1>
    <div @click="clickEnDiv" class="flex flex-col items-center p-4  w-full">
        <template v-if="!internalError">
            <template v-if="loadingInfoCliente">
                <div class="w-full h-40 flex flex-col items-center justify-center">
                    <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-bgBlue"></div>
                    <p class="text-xl font-bold text-gray-900">Cargando...</p>
                </div>
            </template>
            <template v-else="!loadingInfoCliente && !error">
                <div class="flex flex-row w-full  mt-3 rounded-lg overflow-hidden">
                    <div class="w-4/12 rounded-lg h-full">
                        <div class="p-3 h-full w-full">
                            <svg class="h-24" width="100" height="100" viewBox="0 0 200 200" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <mask id="mask0_259_34" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                                    width="200" height="200">
                                    <rect width="200" height="200" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_259_34)">
                                    <path
                                        d="M66.8748 150H91.8748V141.667H75.2081V133.333H91.8748V108.333H66.8748V116.667H83.5415V125H66.8748V150ZM125.208 150H133.541V108.333H125.208V125H116.875V108.333H108.541V133.333H125.208V150ZM175.208 92.0833V158.333C175.208 162.917 173.576 166.84 170.312 170.104C167.048 173.368 163.125 175 158.541 175H41.8748C37.2915 175 33.3679 173.368 30.104 170.104C26.8401 166.84 25.2081 162.917 25.2081 158.333V92.0833C22.0137 89.1667 19.5484 85.4167 17.8123 80.8333C16.0762 76.25 16.0415 71.25 17.7081 65.8333L26.4581 37.5C27.5692 33.8889 29.5484 30.9028 32.3956 28.5417C35.2429 26.1806 38.5415 25 42.2915 25H158.125C161.875 25 165.139 26.1458 167.916 28.4375C170.694 30.7292 172.708 33.75 173.958 37.5L182.708 65.8333C184.375 71.25 184.34 76.1806 182.604 80.625C180.868 85.0694 178.403 88.8889 175.208 92.0833ZM118.541 83.3333C122.291 83.3333 125.139 82.0486 127.083 79.4792C129.028 76.9097 129.791 74.0278 129.375 70.8333L124.791 41.6667H108.541V72.5C108.541 75.4167 109.514 77.9514 111.458 80.1042C113.403 82.2569 115.764 83.3333 118.541 83.3333ZM81.0415 83.3333C84.2359 83.3333 86.8401 82.2569 88.854 80.1042C90.8679 77.9514 91.8748 75.4167 91.8748 72.5V41.6667H75.6248L71.0415 70.8333C70.4859 74.1667 71.2151 77.0833 73.229 79.5833C75.2429 82.0833 77.847 83.3333 81.0415 83.3333ZM43.9581 83.3333C46.4581 83.3333 48.6456 82.4306 50.5206 80.625C52.3956 78.8194 53.5415 76.5278 53.9581 73.75L58.5415 41.6667H42.2915L33.9581 69.5833C33.1248 72.3611 33.5762 75.3472 35.3123 78.5417C37.0484 81.7361 39.9304 83.3333 43.9581 83.3333ZM156.458 83.3333C160.486 83.3333 163.403 81.7361 165.208 78.5417C167.014 75.3472 167.43 72.3611 166.458 69.5833L157.708 41.6667H141.875L146.458 73.75C146.875 76.5278 148.021 78.8194 149.896 80.625C151.771 82.4306 153.958 83.3333 156.458 83.3333ZM41.8748 158.333H158.541V99.5833C157.847 99.8611 157.396 100 157.187 100H156.458C152.708 100 149.41 99.375 146.562 98.125C143.715 96.875 140.903 94.8611 138.125 92.0833C135.625 94.5833 132.778 96.5278 129.583 97.9167C126.389 99.3055 122.986 100 119.375 100C115.625 100 112.118 99.3055 108.854 97.9167C105.59 96.5278 102.708 94.5833 100.208 92.0833C97.847 94.5833 95.104 96.5278 91.979 97.9167C88.854 99.3055 85.4859 100 81.8748 100C77.847 100 74.2012 99.3055 70.9373 97.9167C67.6734 96.5278 64.7915 94.5833 62.2915 92.0833C59.3748 95 56.4929 97.0486 53.6456 98.2292C50.7984 99.4097 47.5692 100 43.9581 100H43.0206C42.6734 100 42.2915 99.8611 41.8748 99.5833V158.333Z"
                                        fill="#1C1B1F" />
                                </g>
                            </svg>

                        </div>
                    </div>
                    <div class="flex flex-col w-8/12  py-3">

                        <div class="flex flex-row w-full items-center">
                            <p class=" font-semibold text-lg ml-3 mr-2 w-10/12">{{ cliente.nombre }}</p>
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
                            <p class="text-lg">{{ tipoCliente }}</p>
                        </div>
                        <div class="w-full px-4">
                            <button @click="goEditCliente"
                                class="bg-bgPurple rounded-xl mt-1 text-white w-full">Editar</button>
                        </div>

                    </div>

                </div>
                <div class="w-full px-2 text-lg ">
                    <div class="flex flex-row w-full items-center mt-2">
                        <div class="w-2/12">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                class="lucide lucide-phone">
                                <path
                                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                        </div>
                        <p class="w-2/3">{{ numero }}</p>
                    </div>

                    <div class="flex flex-row w-full items-center mt-2 h-fit">
                        <div class="w-2/12">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                class="lucide lucide-mail">
                                <rect width="20" height="16" x="2" y="4" rx="2" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>
                        </div>
                        <p class="w-10/12 break-words">{{ correo }}</p>
                    </div>

                    <div class="flex flex-col w-full mt-2 h-fit">
                        <div class="w-full">
                            <div v-for="direccionFor in cliente.direcciones" :key="direccionFor.id" class="flex flex-row">

                                <div class="w-2/12">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="lucide lucide-map-pinned">
                                        <path d="M18 8c0 4.5-6 9-6 9s-6-4.5-6-9a6 6 0 0 1 12 0" />
                                        <circle cx="12" cy="8" r="2" />
                                        <path
                                            d="M8.835 14H5a1 1 0 0 0-.9.7l-2 6c-.1.1-.1.2-.1.3 0 .6.4 1 1 1h18c.6 0 1-.4 1-1 0-.1 0-.2-.1-.3l-2-6a1 1 0 0 0-.9-.7h-3.835" />
                                    </svg>
                                </div>

                                <p class="text-gray-900 w-10/12">{{
                                    direccionFor.direccion }}</p>
                            </div>
                        </div>
                    </div>


                    <!-- <div class="flex flex-row w-full mt-2">
                <p class="w-1/3 font-semibold">Adeudo</p>
                <p class="w-2/3">{{ adeudo }}</p>
            </div> -->
                </div>
                <div class="w-full mt-3">
                    <ButtonX color="blue" @click="regresar">Regresar</ButtonX>
                </div>

                <div class="w-full mt-3">
                    <SearchSales :id-cliente="cliente.id" :is-from-cliente="true" :is-in-details="true"></SearchSales>
                </div>


            </template>
        </template>
        <template v-else>
            <ErrorX @aceptar="regresar"></ErrorX>
        </template>







    </div>
</template>
    
<script setup>
import { ref, onMounted } from 'vue';
import { toggleSidebar } from '@/utils/sidebarManager.js';
import ButtonX from '@/components/utilities/ButtonX.vue';
import { useRoute, useRouter } from 'vue-router';
import { getCliente, getTiposCliente, eliminarCliente } from '@/api/api.js';
import ModalConfirmationX from '@/components/utilities/ModalConfirmationX.vue';
import { getVentas } from '@/api/api.js';
import SearchSales from '../sales/SearchSales.vue';
import { toast } from 'vue3-toastify';
import ModalInfoX from '@/components/utilities/ModalInfoX.vue';
import ModalSesionExpiredVue from '@/components/utilities/ModalSesionExpired.vue';
import ErrorX from '@/components/utilities/ErrorX.vue';

const sessionExpired = ref(false);
const internalError = ref(false);


const isVisibleModalInfo = ref(false);

const cerrarModalInfo = () => {
    isVisibleModalInfo.value = false;
    router.go(-1);
};


const loadingInfoCliente = ref(false);
const loadingVentas = ref(false);

const error = ref(false);


const numero = ref('Sin número');
const direccion = ref('Sin dirección');
const correo = ref('Sin correo');
//const adeudo = ref('Sin adeudo');
const tipoCliente = ref('Sin tipo de cliente');

const cliente = ref({})

const route = useRoute();
const router = useRouter();

const ventasCliente = ref([]);


//variables del modal
const isVisibleModalDelete = ref(false);
const mensajeModalDelete = ref('');

const mostrarModalDelete = () => {
    isVisibleModalDelete.value = true;
    mensajeModalDelete.value = '¿Estás seguro de eliminar este cliente?';
};

const cerrarModalDelete = () => {
    isVisibleModalDelete.value = false;
};

const confirmarEliminar = () => {
    isVisibleModalDelete.value = false;
    deleteCliente();

};



const clickEnDiv = () => {
    toggleSidebar();
};

const obtenerCliente = async () => {
    try {
        loadingInfoCliente.value = true;
        const response = await getCliente(route.params.id);
        cliente.value = response.data;
        //castear un string a un int

        cliente.value.id = parseInt(cliente.value.id)
        obtenerTipoCliente();
        llenarCampos();
        obtenerVentas();
        loadingInfoCliente.value = false;
    } catch (error) {
        console.log(error);
        loadingInfoCliente.value = false;
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



const obtenerTipoCliente = async () => {
    try {
        const response = await getTiposCliente();
        const tiposClienteAux = response.data;
        tiposClienteAux.forEach((tipo) => {
            if (tipo.id == cliente.value.tipoCliente) {
                tipoCliente.value = tipo.tipoCliente;
            }
        });

    } catch (error) {
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

const regresar = () => {
    router.go(-1);
};

const obtenerVentas = async () => {
    try {
        loadingVentas.value = true;
        let payload = {
            cliente: cliente.value.nombre,
            page: 0,
        };
        const response = await getVentas(payload);
        ventasCliente.value = response.data;

        loadingVentas.value = false;
    } catch (error) {
        loadingVentas.value = false;
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
        console.log(error);
    }
};


const goEditCliente = () => {
    router.push({
        name: 'editcustomer',
        params: {
            id: route.params.id,
        },
    });
};

const llenarCampos = () => {
    if (cliente.value.telefono) {
        numero.value = cliente.value.telefono;
    }
    if (cliente.value.direcciones) {
        direccion.value = cliente.value.direcciones[0];
    }
    if (cliente.value.email) {
        correo.value = cliente.value.email;
    }
    // if (cliente.value.adeudo) {
    //     adeudo.value = cliente.value.adeudo;
    // }
    if (cliente.value.tipoCliente) {
        tipoCliente.value = cliente.value.tipoCliente;
    }
};

const deleteCliente = async () => {
    try {
        const response = await eliminarCliente(route.params.id);
        isVisibleModalInfo.value = true;
    } catch (error) {
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



onMounted(() => {
    obtenerCliente();
});


</script>