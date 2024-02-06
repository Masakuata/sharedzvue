<template>
    <h1 class="text-white absolute top-0 right-0 mr-2   text-xl font-semibold md:invisible text-left mt-3">REPORTES</h1>
    <div @click="clickEnDiv" class="flex flex-col items-center p-4  w-full h-[90vh]">
        <template v-if="!loadinEnvio && !reporteSent && !errorSent">
            <p class="w-full text-center font-semibold">Seleccione los filtros para generar su reporte de ventas</p>
            <p class="text-lg font-semibold w-full text-left">Fecha</p>

            <div class="flex flex-row w-full py-3">
                <div class="w-1/3 flex flex-col pr-4">
                    <select v-model="opcionSeleccionada" id="miSelect" class="rounded-lg w-full">
                        <option disabled value="">Selecciona una opción</option>
                        <option class="w-full" v-for="opcion in opciones" :key="opcion.value" :value="opcion.value">{{
                            opcion.texto
                        }}</option>
                    </select>
                </div>

                <div class="w-2/3 flex flex-row items-center">
                    <template v-if="opcionSeleccionada == 'dia'">
                        <input type="date" name="dia" v-model="diaSeleccionado" class="form-control rounded-lg w-full" />
                    </template>
                    <template v-else-if="opcionSeleccionada == 'mes'">
                        <input class="w-full rounded-lg" v-model="mesSeleccionado" type="month" id="bdaymonth">
                    </template>
                    <template v-else-if="opcionSeleccionada == 'anio'">
                        <select v-model="anioSeleccionado" id="miSelectAnio" class="rounded-lg w-full">
                            <option disabled value="">Selecciona un año</option>
                            <option class="w-full" v-for="anio in aniosDisponibles" :key="anio.value" :value="anio.value">{{
                                anio.texto
                            }}</option>
                        </select>
                    </template>
                </div>

            </div>
            <div class="w-full">
                <p class="text-lg font-semibold w-full text-left my-3">Cliente</p>
                <SearchClientX :reload="switchClientes" :show-directions="false" @select-item="seleccionarCliente"
                    @unselect-item="desSeleccionarCliente" @error="errorBuscarCliente"></SearchClientX>
            </div>
            <p class="text-lg font-semibold w-full text-left my-3">Estados de pago</p>
            <div class="flex flex-row w-full">
                <div v-for="option in opcionesEstadoVenta" :key="option.value"
                    class="flex items-center justify-center w-1/3">
                    <input type="radio" v-model="estadoVentaSeleccionado" :value="option.value" :id="option.value"
                        class="sr-only peer" />
                    <label :for="option.value"
                        class="inline-flex items-center justify-center w-5 h-5 border-2 border-gray-400 rounded-full cursor-pointer peer-checked:border-blue-500 peer-checked:bg-blue-600"></label>
                    <span class="ml-2 text-gray-700">{{ option.label }}</span>
                </div>
            </div>
            <p class="text-lg font-semibold w-full text-left my-3">Correo</p>
            <template v-if="!isEditReportActivated">
                <div class="w-full py-3 border border-gray-400 rounded-lg flex flex-row">
                    <p class="w-10/12 ml-3">{{ correoReporte }}</p>
                    <div class="w-2/12 flex flex-row justify-center">
                        <TinyButtonX type="edit" @click="editarCorreo"></TinyButtonX>
                    </div>
                </div>
            </template>
            <template v-else>
                <input type="email" v-model="correoReporte" class="form-control rounded-lg w-full" />
            </template>
            <div class="mt-3 w-full">
                <ButtonX color="blue" @click="enviarReporte">Enviar Reporte</ButtonX>
            </div>
        </template>
        <template v-else>
            <div v-if="loadinEnvio" class="w-full h-96 flex flex-col items-center justify-center">
                <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-bgBlue"></div>
                <p class="w-full text-center mt-4 font-bold text-gray-900">Enviando reporte... Esta acción puede demorar
                    algunos minutos.</p>
            </div>
            <div v-if="hayVentas">
                <div class="w-full h-[90vh] flex justify-center items-center">
                    <div class="w-full">
                        <p class="text-2xl font-semibold text-center text-bgBlue">{{ 'El reporte ha sido enviado al corre electrónico: ' + correoReporte }}</p>
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
                            <ButtonX color="blue" @click="aceptarOk">Aceptar</ButtonX>
                        </div>
                    </div>


                </div>
            </div>

            <div v-if="noVentas">
                <div class="w-full h-[90vh] flex justify-center items-center">
                    <div class="w-full">
                        <p class="text-2xl font-semibold text-center text-bgBlue">No existen ventas que coincidan con los filtros especificados.</p>
                        
                        <div class="p-2 w-full mt-4">
                            <ButtonX color="blue" @click="aceptarOk">Aceptar</ButtonX>
                        </div>
                    </div>


                </div>
            </div>
            

            <div v-if="errorSent" class="w-full">
                <ErrorX @aceptar="aceptarOk" title="Error al generar reporte" button-message="Aceptar" message="Ocurrió un error al generar el reporte de ventas. intentalo más tarde." :show-contact="true"></ErrorX>
            </div>
        </template>



    </div>
</template>
    
<script setup>
import { ref, onMounted, watch } from 'vue';
import { toggleSidebar } from '@/utils/sidebarManager.js';
import { getAnioActural, getHoyDate } from '@/utils/validator';
import ButtonX from '@/components/utilities/ButtonX.vue';
import { useRoute, useRouter } from 'vue-router';
import SearchClientX from '@/components/utilities/SearchClientX.vue';
import TinyButtonX from '@/components/utilities/TinyButtonX.vue';
import ErrorX from '@/components/utilities/ErrorX.vue';
import {getReporte} from '@/api/api.js'
import { query } from 'firebase/firestore';



const opciones = [
    { value: 'dia', texto: 'Dia' },
    { value: 'mes', texto: 'Mes' },
    { value: 'anio', texto: 'Año' },
];

let aniosDisponibles = [
    { value: 2023, texto: '2023' },
    { value: 2024, texto: '2024' },

]

const estadoVentaSeleccionado = ref('');
const opcionesEstadoVenta = [
    { label: 'Liquidada', value: 1 },
    { label: 'Pendiente', value: 0 },
    { label: 'Ambos', value: 2 }
    // Agrega más opciones según sea necesario
];

const opcionSeleccionada = ref('');
const anioSeleccionado = ref(null);
const mesSeleccionado = ref(null);
const diaSeleccionado = ref(null);

const switchClientes = ref(false);
const clienteSeleccionado = ref(null);
const correoReporte = ref('rendon.luisgerardo@gmail.com');
const isEditReportActivated = ref(false);



const route = useRoute();
const router = useRouter();

const loadinEnvio = ref(false);
const reporteSent = ref(false);
const errorSent = ref(false);
const noVentas = ref(false);
const hayVentas = ref(false);



const seleccionarCliente = (cliente) => {
    clienteSeleccionado.value = cliente;
};

const desSeleccionarCliente = () => {
    clienteSeleccionado.value = null;
};

const errorBuscarCliente = () => {
    console.log('error al buscar el cliente');
};

const editarCorreo = () => {
    isEditReportActivated.value = true;
    console.log('editar correo');
};


const clickEnDiv = () => {
    toggleSidebar();
};

const construirQuery = () => {
    let query = {
    };

    if (opcionSeleccionada.value == 'dia') {
        query = getFormatedDay()
    } else if (opcionSeleccionada.value == 'mes') {
        query = getFormatedMonth()

    } else if (opcionSeleccionada.value == 'anio') {
        query.anio = anioSeleccionado.value;
    }


    if (clienteSeleccionado.value != null) {
        query.cliente = clienteSeleccionado.value.id;
    }
    if (estadoVentaSeleccionado.value != 2){
        query.pagado = estadoVentaSeleccionado.value;
    }
    
    query.correo = correoReporte.value;

    return query;
};
const getFormatedDay = () => {
    let query = {}

    let dayAux = diaSeleccionado.value

    let anio = dayAux.substring(0,4)
    let mes = dayAux.substring(5,7)
    let dia = dayAux.substring(8,10)
    query.dia = dia
    query.mes = mes
    query.anio=anio
    return query
    
}
const getFormatedMonth = () =>{
    let query = {}
    console.log(mesSeleccionado.value)
    query.mes = mesSeleccionado.value.substring(5,7)
    query.anio = mesSeleccionado.value.substring(0,4)
    return query
}



const enviarReporte = async () => {
    loadinEnvio.value = true;
    const query = construirQuery();
    console.log(query);
    
    try{
        let respuesta = await getReporte(query);
        loadinEnvio.value = false;
        reporteSent.value = true
        console.log(respuesta.status);
        if (respuesta.status == 204){
            loadinEnvio.value = false
            hayVentas.value= false
            noVentas.value = true
            return
        }
        hayVentas.value = true
        
        
        
    }catch(error){
        
        errorSent.value = true;
        loadinEnvio.value = false;
    }
    
    
};
const aceptarOk = () => {
    reporteSent.value = false;
    loadinEnvio.value = false;
    errorSent.value = false;
    hayVentas.value= false
    noVentas.value= false

};




watch(
    () => opcionSeleccionada.value,
    (newValue, oldValue) => {
        if (newValue == 'dia') {

            diaSeleccionado.value = getHoyDate();
        } else if (newValue == 'mes') {
            const fechaActual = new Date();
            const mesActual = fechaActual.getMonth() + 1; // getMonth() devuelve un índice basado en cero
            const anioActual = fechaActual.getFullYear();
            mesSeleccionado.value = `${anioActual}-${mesActual.toString().padStart(2, '0')}`;

        } else if (newValue == 'anio') {
            console.log(getAnioActural());
            let anioAux = parseInt(getAnioActural());
            console.log(anioAux);
            //optener la pociocion del anio seleccionado en el arreglo
            let pos = aniosDisponibles.findIndex((anio) => anio.value == anioAux);
            anioSeleccionado.value = aniosDisponibles[pos].value;
        }
    }
);







onMounted(() => {
    opcionSeleccionada.value = opciones[0].value;
    estadoVentaSeleccionado.value = opcionesEstadoVenta[0].value;

});


</script>