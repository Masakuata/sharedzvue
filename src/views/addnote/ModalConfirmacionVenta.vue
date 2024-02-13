<template>
    <div @click="clickOut" v-if="isVisible"
        class="modal fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
        <div class="bg-gray-100 h-[90vh] rounded-lg md:w-3/4 w-full mx-4 z-50">

            <template v-if="!requestSent">
                <p class="w-full h-14 text-center text-white font-semibold bg-bgBlue rounded-t-lg pt-4">Confirmar la venta
                </p>
                <div class="w-full p-4 h-[80vh] overflow-scroll">
                    <p class="w-full text-center font-semibold text-lg">Productos a vender</p>
                    <div class="w-full h-96  overflow-scroll md:grid md:grid-cols-2 xl:grid-cols-3">
                        <div class="md:p-2" v-for="product in productos" :key=product.id>
                            <ProductoVenderRow :producto="product">
                            </ProductoVenderRow>
                        </div>

                    </div>
                    <div class="w-full flex flex-row items-center border-b border-gray-400 py-3">
                        <div class="w-1/12">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                class="lucide lucide-store">
                                <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
                                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                                <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
                                <path d="M2 7h20" />
                                <path
                                    d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
                            </svg>
                        </div>
                        <p class="font-semibold pl-3 w-11/12 ">{{ cliente.nombre }}</p>
                    </div>

                    <div class="flex flex-row w-full border-b border-gray-400">
                        <div class="flex flex-col w-1/2">
                            <p class="w-full text-center">Monto total</p>
                            <p class="w-full text-center font-semibold">{{ '$' + total }}</p>
                        </div>
                        <div class="flex flex-col w-1/2">
                            <p class="w-full text-center">Peso total</p>
                            <p class="w-full text-center font-semibold">{{ total + 'KG' }}</p>
                        </div>
                    </div>


                    <div class="flex flex-row w-full h-10  items-center border-t border-bgBlue ">
                        <div class="flex flex-row w-full h-10  items-center bg-blueLetters rounded-lg px-2 mt-2"
                            @click="togleFiniquitarRestante">
                            <div class="w-3/4">
                                <label class="text-white mr-10 text-xl" for="checkbox">Finiquitar venta</label>
                            </div>
                            <div class="w-1/4 flex flex-row  justify-end">
                                <input type="checkbox" v-model="finiquitarVenta"
                                    class="w-6 h-6 text-bgBlue border-gray-300 rounded focus:ring-blue-500" id="checkbox">
                            </div>
                        </div>

                    </div>

                    <AlertX message="El abono no puede ser mayor que el monto total" :flag="errorCantidadMayor"></AlertX>

                    <div class="flex flex-row w-full  items-center justify-between space-x-2 pt-2">
                        <p class="font-semibold text-lg w-1/2">Abono Inicial</p>
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
                                <input :disabled="finiquitarVenta" v-model="abonoInicial"
                                    class="block w-full ps-10 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                    required>

                            </div>
                        </div>
                    </div>



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
                                        stroke-linejoin="round"
                                        class="lucide lucide-check-check w-16 h-auto text-green-600 fill-gray-100">
                                        <path d="M18 6 7 17l-5-5" />
                                        <path d="m22 10-7.5 7.5L13 16" />
                                    </svg>



                                </div>
                                <PrintNoteComp :productos="productos" :total="total" :cliente="cliente"
                                    :abono="abonoInicial"></PrintNoteComp>
                                <div class="p-2 w-full md:px-20 ">
                                    <ButtonX color="blue" @click="emitirConfirmarVenta">Aceptar</ButtonX>
                                </div>

                                <a :href="urlFirebase" target="_blank" class="underline w-full text-center">
                    Imprimir ticket
                </a>

                                <div>
                                    <ButtonX color="red" @click="abrirPestaniaPdf">Descargar</ButtonX>
                                </div>

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
import { postVenta, postTicket, getTicketVenta, getUrlTicket } from '@/api/api.js';
import { filtrarEntrada } from '@/utils/validator.js'
import AlertX from '@/components/utilities/AlertX.vue';
import PrintNoteComp from './PrintNoteComp.vue';




const finiquitarVenta = ref(false);
const abonoInicial = ref('');

const totalInt = ref(0);
const errorCantidadMayor = ref(false);

const requestSent = ref(false);
const loading = ref(false);

const error = ref(false);
const errorMessage = ref('');
const errorObject = ref(null);
const idVenta = ref(0);
let ticket = null;
let urlFirebase = ''

const limpiarComponente = () => {
    requestSent.value = false;
    loading.value = false;
    error.value = false;
    errorMessage.value = '';
};


const emit = defineEmits(['confirmarVenta', 'cerrarConfirmarVenta', 'emitError']);
const props = defineProps({
    isVisible: Boolean,
    productos: Array,
    cliente: Object,
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
            precio: producto.precio,
        }
        productosAux.push(productoAux);
    });

    let abonoInicialFloat = parseFloat(abonoInicial.value);

    let hoy = new Date();
    let fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
    if (!finiquitarVenta.value) {
        finiquitarVenta.value = abonoInicialFloat === totalInt.value;
    }

    let venta = {
        cliente: props.cliente.id,
        direccion: props.cliente.direccionSelected.id,
        pagado: finiquitarVenta.value,
        fecha: fecha,
        facturado: true,
        abono: abonoInicialFloat,
        productos: productosAux,
        total: props.total,
    }

    return venta;
};



// const imprimirVenta = (data) => {

//     let file = new Blob([data], { type: 'application/pdf' });
//     let fileURL = URL.createObjectURL(file, );
//     window.open(fileURL, "_blank")
//     // const elem = window.document.createElement('a')
//     // elem.href = window.URL.createObjectURL(blob)
//     // elem.download = 'venta.pdf'
//     // document.body.appendChild(elem)
//     // elem.click()
//     // document.body.removeChild(elem)

// };


const obtenerUrlFirebase = async () => {
    try {
        urlFirebase = await getUrlTicket(idVenta.value);
        console.log('El url' ,urlFirebase);
    } catch (error) {
        console.log(error);
    }
};

const subirTicket = async () => {
    //console.log('el ticket es');
    //console.log(ticket);


    await postTicket(idVenta.value,  ticket);
};

const registrarVentaApi = async () => {
    let response = null;

    if (errorCantidadMayor.value) {
        return;
    }
    try {
        loading.value = true;
        requestSent.value = true;
        let venta = construirVenta();
        response = await postVenta(venta);
        console.log('response');
        console.log(response);

        ticket = response.data
        
        idVenta.value = response.data.id;
        console.log(idVenta.value);

        await obtenerTicket();
        await subirTicket();
        await obtenerUrlFirebase();

        

        loading.value = false;



        // const url = window.URL.createObjectURL(new Blob([response.data]));


        // const link = document.createElement('a');
        // link.href = url;

        // link.setAttribute('download', 'file.pdf');





        // document.body.appendChild(link);
        // link.click();


        //loading.value = false



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
    subirTicket(idVenta.value, ticket);
    //imprimirVenta(response.data);

};

const obtenerTicket = async () => {
    try {
        const response = await getTicketVenta(idVenta.value);
        ticket = response.data;
    } catch (error) {
        console.log(error);
    }
};

const togleFiniquitarRestante = () => {
    finiquitarVenta.value = !finiquitarVenta.value;
};

watch(
    () => abonoInicial.value,
    () => {
        abonoInicial.value = filtrarEntrada(abonoInicial.value);

        let abonoInicialInt = parseInt(abonoInicial.value);

        if (abonoInicialInt > totalInt.value) {
            errorCantidadMayor.value = true;
        } else {
            errorCantidadMayor.value = false;
        }
    }
)

watch(
    () => finiquitarVenta.value,
    () => {
        if (finiquitarVenta.value) {
            abonoInicial.value = totalInt.value.toString();
        } else {
            abonoInicial.value = '0';
        }
    }
)







const clickOut = () => {
    if (props.isCancelable) {
        emit('cerrarConfirmarCompra');
    }
};



const cerrarModal = () => {
    emit('cerrarConfirmarVenta');
};

onMounted(() => {
    totalInt.value = parseInt(props.total);
    abonoInicial.value = '0';
});


</script>
