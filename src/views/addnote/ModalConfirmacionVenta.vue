<template>
    <div @click="clickOut" v-if="isVisible"
        class="modal fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
        <div class="bg-gray-100 h-[90vh] rounded-lg  w-full mx-4 z-50">

            <template v-if="!requestSent">
                <p class="w-full h-14 text-center text-white font-semibold bg-bgBlue rounded-t-lg pt-4">Confirmar la venta</p>
                <div class="w-full p-4 h-[80vh]">
                    <div class="w-full h-[50vh] border border-gray-400 rounded-lg mt-3 p-3 overflow-scroll">
                        <p>Productos a vender</p>
                        <ProductoVenderRow v-for="product in productos" :key=product.id :producto="product">
                        </ProductoVenderRow>
                    </div>
                    <p class="font-semibold">{{ 'Cliente: ' + cliente.nombre }}</p>
                    <p class="text-bgBlue">{{ 'Total: $' + total }}</p>
                    <p class="text-green-600">{{ 'Abono Inicial: $' + abonoInicial }}</p>

                    <div class="flex flex-row w-full mt-3">
                        <div class="w-1/2 pr-1">
                            <ButtonX color="red" @click="cerrarModal">Cerrar</ButtonX>
                        </div>
                        <div class="w-1/2 pl-1">
                            <ButtonX color="blue" @click="registrarVentaApi">Confirmar venta</ButtonX>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="w-full h-[90vh] flex justify-center items-center">
                    <template v-if="loading">
                        <div class="w-full">
                            <p class="text-2xl font-semibold text-center text-bgBlue">Registrando venta...</p>
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
                                <p class="text-2xl font-semibold text-center text-bgBlue">Venta registrada exitósamente</p>
                                <div class="w-full flex justify-center mt-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="currentFill" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="lucide lucide-check-check w-16 h-auto text-green-600 fill-gray-100">
                                        <path d="M18 6 7 17l-5-5" />
                                        <path d="m22 10-7.5 7.5L13 16" />
                                    </svg>
                                </div>
                                <div class="p-2 w-full"><ButtonX color="blue" @click="emitirConfirmarVenta">Aceptar</ButtonX></div>
                                
                            </div>

                        </template>

                        <template v-else>
                            <div class="w-full">
                                <ErrorX @aceptar="aceptarErrror" :message="errorMessage"></ErrorX>
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
import ProductoVenderRow from './ProductoVenderRow.vue';
import ErrorX from '@/components/utilities/ErrorX.vue';
import { postVenta } from '@/api/api.js';



const requestSent = ref(false);
const loading = ref(false);

const error = ref(false);
const errorMessage = ref('');
const errorObject = ref(null);

const limpiarComponente = () => {
    requestSent.value = false;
    loading.value = false;
    error.value = false;
    errorMessage.value = '';
};


const emit = defineEmits(['confirmarVenta', 'cerrarConfirmarVenta' , 'emitError']);
const props = defineProps({
    isVisible: Boolean,
    productos: Array,
    cliente: Object,
    abonoInicial: String,
    pagado: Boolean,
    total: Number,
});

const emitirConfirmarVenta = (bandera) => {
    emit('confirmarVenta', bandera);
    limpiarComponente();
};

const emitirCerrarConfirmarVenta = () => {
    emit('cerrarConfirmarVenta');
    limpiarComponente();
};

const emitirError = () => {
    emit('emitError', errorObject.value);
    limpiarComponente();
};

const aceptarErrror = () => {
    emitirError();
};



const construirVenta = () => {
    let productosAux = [];
    props.productos.forEach(producto => {
        let productoAux = {
            producto: producto.id,
            cantidad: producto.cantidadCompra,
        }
        productosAux.push(productoAux);
    });

    let abonoInicialFloat = parseFloat(props.abonoInicial);

    let hoy = new Date();
    let fecha =  hoy.getDate()+ '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();

    let venta = {
        cliente: props.cliente.id,
        direccion: props.cliente.direccionSelected.id,
        pagado: props.pagado,
        fecha: fecha,
        facturado: true,
        abono: abonoInicialFloat,
        productos: productosAux,
        total: props.total,
    }

    return venta;
};

const registrarVentaApi = async () => {
    try {
        loading.value = true;
        requestSent.value = true;
        let venta = construirVenta();
        await postVenta(venta);
        loading.value = false;
        //emitirConfirmarVenta();
    } catch (errorResponse) {


        loading.value = false;
        error.value = true;

        errorObject.value = errorResponse
        //Se obtiene el status del error
        if (errorResponse.response.status == 409) {
            errorMessage.value = "Ups.. Uno de los productos seleccionos fue actualizado y su disponobilidad no es suficiente."
            return;
        }

        errorMessage.value = errorResponse.response.data.detail;
        console.log(errorResponse);
    }

};







const clickOut = () => {
    if (props.isCancelable) {
        emit('cerrarConfirmarCompra');
    }
};



const cerrarModal = () => {
    emit('cerrarConfirmarVenta');
};


</script>
