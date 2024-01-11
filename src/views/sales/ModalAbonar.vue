<template>
    <div @click="clickOut" v-if="isVisible"
        class="modal fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
        <div class="bg-gray-100 h-[90vh] rounded-lg  w-full mx-4 z-50 overflow-scroll">

            <template v-if="!requestSent">
                <p class="w-full h-14 text-center text-white font-semibold bg-bgBlue rounded-t-lg pt-4">Agrega un abono</p>
                <div class="w-full p-4 h-[80vh]">
                    <p>Los productos de la venta son: </p>
                    <div class="w-full h-[40vh] border border-gray-400 rounded-lg mt-3 p-3 overflow-scroll">

                        <template v-if="loadingProducts">
                            <div class="w-full h-[40vh] flex flex-col items-center justify-center">
                                <div role="status">
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
                                <p class="text-xl font-bold text-bgBlue">Cargando...</p>
                            </div>
                        </template>

                        <p>Productos comprados</p>
                        <ProductoVentaRow v-for="product in productos" :key=product.id :producto="product">
                        </ProductoVentaRow>
                    </div>
                    <p class="font-semibold">{{ 'Cliente: ' + sale.cliente.nombre }}</p>
                    <p class="text-bgBlue">{{ 'Total: $' + sale.total }}</p>
                    <p class="text-green-600">{{ 'Abonado: $' + sale.abonado }}</p>
                    <p class="text-red-600">{{ 'Restante: $' + restante }}</p>

                    <template v-if="!sale.pagado">
                        <div class="flex flex-row w-full h-10  items-center">
                            <label class="text-gray-700 mr-10 text-xl" for="checkbox">Finiquitar restante</label>
                            <input type="checkbox" v-model="finiquitarRestante"
                                class="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500" id="checkbox">
                        </div>
                        <div class="flex flex-row w-full  border-bgBlue items-center space-x-2 pt-2">
                            <p class="font-semibold w-1/2">Monto del Abono</p>
                            <div class="w-1/2 text-right pr-2">
                                <input class="h-14 border border-gray-200 rounded-lg px-2 w-28"
                                    :disabled="finiquitarRestante" v-model="abono">
                            </div>
                        </div>

                        <div class="flex flex-row w-full mt-3">
                            <div class="w-1/2 pr-1">
                                <ButtonX color="red" @click="cerrarModal">Cerrar</ButtonX>
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
                            <ButtonX color="blue" @click="cerrarModal">Regresar</ButtonX>
                        </div>
                    </template>


                </div>
            </template>
            <template v-else>
                <div class="w-full h-[90vh] flex justify-center items-center">
                    <template v-if="loading">
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
                                    <ButtonX color="blue">Aceptar</ButtonX>
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



        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, onMounted, ref, watch } from 'vue';
import ButtonX from '@/components/utilities/ButtonX.vue';
import { getVentaProductosDetalles } from '@/api/api.js';
import ProductoVentaRow from './ProductoVentaRow.vue';




const requestSent = ref(false);
const loading = ref(false);

const error = ref(false);
const errorMessage = ref('');

const productos = ref([]);
const restante = ref(0);

const cliente = ref({});

const abono = ref(0);

const finiquitarRestante = ref(false);

const loadingProducts = ref(false);


const cleanComponent = () => {
    requestSent.value = false;
    loading.value = false;
    error.value = false;
    errorMessage.value = '';
    productos.value = [];
    restante.value = 0;
    cliente.value = {};
    abono.value = 0;
    finiquitarRestante.value = false;
};

const emit = defineEmits(['confirmarAbono', 'cerrarConfirmarAbono']);
const props = defineProps({
    isVisible: Boolean,
    sale: Object,
});

const cerrarModal = () => {
    cleanComponent();
    emit('cerrarConfirmarAbono');
};

const registrarAbono = () => {
    construirPayload();
    //emit('confirmarAbono');
    // requestSent.value = true;
    // loading.value = true;
    // error.value = false;
    // errorMessage.value = '';

    // let abono = {
    //     venta_id: props.sale.id,
    //     abono: props.sale.abono,
    // };

    // postAbono(abono);
};


watch(
    () => props.sale,
    () => {
        let restanteFloat = props.sale.total - props.sale.abonado;
        restante.value = restanteFloat.toFixed(2);
        console.log('Cambio la venta', props.sale);
        cliente.value = props.sale.cliente;
        console.log('El cliente es: ', cliente.value);
        construirPayload();

    }
);

watch(
    () => finiquitarRestante.value,
    () => {
        if (finiquitarRestante.value) {
            abono.value = restante.value;
        }



        console.log('Cambio el checkbox', finiquitarRestante.value);
    }

);











const construirPayload = () => {
    let idsProductos = [];
    props.sale.productos.forEach((producto) => {
        idsProductos.push(producto.producto);
    });


    let payload = {
        productos: idsProductos,
        tipoCliente: props.sale.cliente.tipoCliente,
    };

    console.log('El payload es: ', payload);

    getProductos(payload);

    //productos.value = props.sale.productos;
};

const getProductos = async (payload) => {
    try {
        loadingProducts.value = true;
        const { data } = await getVentaProductosDetalles(props.sale.id);
        productos.value = data;
        console.log('Los productos son: ', productos.value);
        loadingProducts.value = false;
    } catch (error) {
        loadingProducts.value = false;
        console.log(error);
    }
};



const clickOut = () => {
    if (props.isCancelable) {
        emit('cerrarConfirmarCompra');
    }
};




</script>
