<template>
    <h1 class="text-white absolute top-0 right-0 mr-2   text-xl font-semibold text-left mt-3 md:invisible ">DETALLES DE VENTA</h1>
    <div @click="clickEnDiv" class="flex flex-col items-center p-4  w-full h-full md:h-full">
        <template v-if="!loading">
            <template v-if="!requestSent">

                <div class="w-full">
                    <p class="w-full text-center font-semibold bg-gray-400 text-white rounded-t-lg ">PRODUCTOS DE LA VENTA </p>
                    <div class="w-full h-[40vh] border border-gray-400 rounded-b-lg p-3 overflow-scroll">
                
                        <ProductoVentaRow v-for="product in productos" :key=product.id :producto="product">
                        </ProductoVentaRow>
                    </div>

                    <ClienteDetailRow :cliente="cliente"></ClienteDetailRow>


                    <template v-if="sale">
                        <DetallesVentaRow :sale="sale"></DetallesVentaRow>
                    </template>


                    <template v-if="!sale.pagado">
                        <div class="flex flex-row w-full h-10  items-center bg-blueLetters rounded-lg px-2 mt-2"
                            @click="togleFiniquitarRestante">
                            <div class="w-3/4">
                                <label class="text-white mr-10 text-xl" for="checkbox">Finiquitar restante</label>
                            </div>
                            <div class="w-1/4 flex flex-row  justify-end">
                                <input type="checkbox" v-model="finiquitarRestante"
                                    class="w-6 h-6 text-bgBlue border-gray-300 rounded focus:ring-blue-500" id="checkbox">
                            </div>


                        </div>
                        <AlertX :flag="errorAbono" :message="errorMessageAbono"></AlertX>
                       
                        <div class="flex flex-row w-full  border-bgBlue items-center space-x-2 pt-2">
                            <p class="font-semibold w-1/2">Monto del Abono</p>
                            <div class="w-1/2 text-right">

                                <div class="relative">
                                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" class="lucide lucide-dollar-sign">
                                            <line x1="12" x2="12" y1="2" y2="22" />
                                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                        </svg>
                                    </div>
                                    <input type="search" :disabled="finiquitarRestante" v-model="abono" id="default-search"
                                        class="block w-full p-4 ps-10 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500   "
                                        required>

                                </div>
                            </div>
                        </div>

                        


                        <div class="flex flex-row w-full mt-3">
                            <div class="w-1/2 pr-1">
                                <ButtonX color="red" @click="regresar">Regresar</ButtonX>
                            </div>
                            <div class="w-1/2 pl-1">
                                <ButtonX color="blue" @click="registrarAbono">Confirmar Abono</ButtonX>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="h-14 w-full rounded-lg text-center justify-center mt-5">
                            <p class="text-xl font-semibold text-green-800">
                                ¡Esta venta ya ha sido pagada!
                            </p>
                        </div>
                        <div class="w-full">
                            <ButtonX color="blue" @click="regresar">Regresar</ButtonX>
                        </div>
                    </template>


                </div>
            </template>
            <template v-else>
                <div class="w-full h-[90vh] flex justify-center items-center">
                    <template v-if="loadingSendAbono">
                        <div class="w-full">
                            <p class="text-2xl font-semibold text-center text-bgBlue">Registrando abono...</p>
                            <div class="w-full flex justify-center mt-2">
                                <svg aria-hidden="true"
                                    class="w-16 h-16 text-white animate-spin dark:text-gray-600 fill-bgBlue"
                                    viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor" />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill" />
                                </svg>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <template v-if="!error">
                            <div class="w-full">
                                <p class="text-2xl font-semibold text-center text-bgBlue">Abono registrado exitósamente</p>
                                <div class="w-full flex justify-center mt-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="currentFill" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="lucide lucide-check-check w-16 h-auto text-green-600 fill-gray-100">
                                        <path d="M18 6 7 17l-5-5" />
                                        <path d="m22 10-7.5 7.5L13 16" />
                                    </svg>
                                </div>
                                <div class="p-2 w-full">
                                    <ButtonX @click="aceptar" color="blue">Aceptar</ButtonX>
                                </div>

                            </div>

                        </template>

                        <template v-else>
                            <div class="w-full">
                                <p class="text-2xl font-semibold text-center text-bgBlue">Error al registrar el abono</p>
                                <p class="text-center text-red-600">{{ errorMessage }}</p>
                                <div class="w-full flex justify-center mt-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="lucide lucide-x-circle text-red-600 w-16 h-16">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="m15 9-6 6" />
                                        <path d="m9 9 6 6" />
                                    </svg>
                                </div>
                            </div>
                        </template>
                    </template>


                </div>



            </template>
        </template>
        <template v-else>
            <div class="w-full h-[40vh] flex flex-col items-center justify-center">
                <div role="status">
                    <svg aria-hidden="true" class="w-16 h-16 text-white animate-spin dark:text-gray-600 fill-bgBlue"
                        viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor" />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill" />
                    </svg>
                </div>
                <p class="text-xl font-bold text-bgBlue">Cargando...</p>
            </div>
        </template>








    </div>
</template>
    
<script setup>
import { onMounted, ref, watch } from 'vue';
import ButtonX from '@/components/utilities/ButtonX.vue';
import { getDetallesVenta, postAbono } from '@/api/api.js';
import ProductoVentaRow from './ProductoVentaRow.vue';
import AlertX from '@/components/utilities/AlertX.vue';
import { getHoyString } from '@/utils/validator.js'
import { useRoute, useRouter } from 'vue-router';
import { toggleSidebar } from '@/utils/sidebarManager.js';
import ClienteDetailRow from './ClienteDetailRow.vue';
import DetallesVentaRow from './DetallesVentaRow.vue';

const route = useRoute();
const router = useRouter();


const loadingSendAbono = ref(false);

const errorAbono = ref(false);
const errorMessageAbono = ref('');

const requestSent = ref(false);
const loading = ref(false);

const error = ref(false);
const errorMessage = ref('');

const productos = ref([]);
const restante = ref(0);

const cliente = ref({});
const sale = ref({});

const abono = ref('0');

const finiquitarRestante = ref(false);









watch(
    () => abono.value,
    () => {
        abono.value = filtrarEntrada(abono.value);

        let abonoFloat = parseFloat(abono.value);
        let restanteFloat = parseFloat(restante.value);

        if (abonoFloat > restanteFloat) {
            errorAbono.value = true;
            errorMessageAbono.value = 'El abono no puede ser mayor al restante';
        } else {
            errorAbono.value = false;
            errorMessageAbono.value = '';
        }
    }
);

const filtrarEntrada = (input) => {

    if (typeof input === 'number') {
        return '';
    }
    // Primero, quitar todos los caracteres que no sean dígitos o puntos
    let filtrado = input.replace(/[^\d.]/g, '');

    // Comprobar si hay más de un punto en la cadena
    if ((filtrado.match(/\./g) || []).length > 1) {
        // Dejar solo el primer punto y eliminar los demás
        let partes = filtrado.split('.');
        filtrado = partes.shift() + '.' + partes.join('');
    }

    return filtrado;
};

const registrarAbono = async () => {

    if (abono.value === '' || abono.value === '0') {
        errorAbono.value = true;
        errorMessageAbono.value = 'El abono no puede ser 0';
        return;
    }

    if (!errorAbono.value) {
        let payload = construirPayloadAbono();


        try {
            requestSent.value = true;
            loadingSendAbono.value = true;
            let response = await postAbono(route.params.id, payload);

            loadingSendAbono.value = false;
            abono.value = '';
        } catch (error) {
            loadingSendAbono.value = false;
            console.log(error);
        }

    }


};

const construirPayloadAbono = () => {

    let abonoFloat = parseFloat(abono.value);
    let hoy = getHoyString();

    let payload = {
        cantidad: abonoFloat,
        finiquito: finiquitarRestante.value,
        fecha: hoy,
    };



    return payload;
};



const aceptar = () => {
    requestSent.value = false;
    error.value = false;
    errorMessage.value = '';
    getDetailsVenta(route.params.id);
};



watch(
    () => finiquitarRestante.value,
    () => {
        if (finiquitarRestante.value) {


            abono.value = restante.value.toString();

        } else {
            abono.value = '0';
        }
    }

);

const togleFiniquitarRestante = () => {
    finiquitarRestante.value = !finiquitarRestante.value;
};

















const clickEnDiv = () => {
    toggleSidebar();
};

const getDetailsVenta = async (ventaId) => {

    try {

        loading.value = true;
        const { data } = await getDetallesVenta(ventaId);

        sale.value = data;
        cliente.value = data.cliente;
        cliente.value.direccion = sale.value.direccion
        productos.value = data.productos;




        restante.value = sale.value.total - sale.value.abonado;

        loading.value = false;

    } catch (error) {
        loading.value = false;
        console.log(error);

    }

};
const regresar = () => {
    router.go(-1)
};


onMounted(() => {
    const ventaId = route.params.id
    getDetailsVenta(ventaId);

});


</script>