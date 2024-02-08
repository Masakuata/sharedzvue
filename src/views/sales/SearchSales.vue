<template>
    <ModalAbonar :isVisible="isVisibleModalAbonar" :sale="saleSelected" @cerrarConfirmarAbono="closeSaleModal"
        @confirmarAbono="confirmarAbono"></ModalAbonar>
    <div class="w-full">
        <template v-if="!internalError">
            <label for="miSelect" class="block mb-2 text-xl font-bold text-gray-900">Ordenar por:</label>
            <label v-if="isFromCliente" for="miSelect" class="block mb-2 font-bold w-full text-center text-gray-900">Las
                ventas del
                cliente son las siguientes:</label>
            <div class="py-3">
                <select v-model="opcionSeleccionada" id="miSelect"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option disabled value="">Selecciona una opción</option>
                    <option class="w-full" v-for="opcion in opciones" :key="opcion.value" :value="opcion.value">{{
                        opcion.texto
                    }}</option>
                </select>
            </div>

            <template v-if="isFechaDia">
                <div class="w-full pb-3">
                    <AlertX :flag="isFechaFutura" message="No puedes seleccionar fechas futuras"></AlertX>
                    <p>Selecciona la fecha</p>
                    <template v-if="isVisibleDatePicker">
                        <!-- <VueDatePicker v-model="dateValue" :enableTimePicker="false"></VueDatePicker> -->

                        <input type="date" name="startDate" v-model="dateValue" class="form-control rounded-lg w-full" />

                    </template>

                </div>

            </template>
            <template v-if="!isFromCliente">
                <p class="w-full font-semibold">Cliente</p>
                <input type="text" v-model="nombreCliente" placeholder="Nombre del cliente..."
                    class="border rounded w-full h-10 px-2 mb-3" />
            </template>


            <template v-if="firstLoading">
                <div class="w-full h-96 flex flex-col items-center justify-center">
                    <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-bgBlue"></div>
                    <p class="text-xl font-bold text-gray-900">Cargando...</p>
                </div>
            </template>
            <template v-else>
                <div class="w-full  md:grid md:grid-cols-2 xl:grid-cols-3 overflow-scroll"
                    :class="[{ 'min-h-24 max-h-72': isFromCliente }, { 'h-[70vh]': !isFromCliente }]">
                    <div v-for="item in items" :key="item.id" class="md:p-3 w-full md:h-full">
                        <SaleRow :sale="item"></SaleRow>
                    </div>

                    <template v-if="isThereMoreResults">
                        <div class="mt-3">
                            <ButtonX @click="addItems" color="purple" :isSlim="true" :isLoading="loadingAdd">Cargar items</ButtonX>
                        </div>
                    </template>
                    

                    <div v-else-if="!isThereMoreResults && !firstLoading"
                        class="w-full h-24 flex flex-col items-center justify-center">
                        <p class="text-xl font-bold text-gray-900">No hay más resultados</p>
                    </div>
                </div>

            </template>


        </template>
        <template v-else>
            <ErrorX @aceptar="construirQuery"></ErrorX>
        </template>


    </div>
</template>

<script setup>

import { onMounted, ref, watch, defineEmits, defineProps } from 'vue';
import { getVentas } from '@/api/api.js';
import { isFutureDate, getHoyDate } from '@/utils/validator.js';
import AlertX from '@/components/utilities/AlertX.vue';
import SaleRow from '@/components/SaleRow.vue';
import ModalAbonar from '@/views/sales/ModalAbonar.vue';
import '@vuepic/vue-datepicker/dist/main.css'
import { useRouter } from 'vue-router';
import ErrorX from '@/components/utilities/ErrorX.vue';
import ButtonX from '@/components/utilities/ButtonX.vue';




const props = defineProps({
    idCliente: {
        type: Number,
        default: -1,
    },
    idProducto: {
        type: Number,
        default: 0,
    },
    isFromCliente: {
        type: Boolean,
        default: false,
    }
});


const internalError = ref(false);

const nombreCliente = ref('');

const opciones = [
    { value: 'fecha-dia', texto: 'Fecha - Dia' },
    { value: 'no-pagados', texto: 'No pagados primero' },
    { value: 'todas', texto: 'Todas' },
];

const router = useRouter();


const query = ref({})
const isFechaDia = ref(false);
const dateValue = ref('');

const items = ref([]);
const page = ref(0);
const isThereMoreResults = ref(true);
const isFechaFutura = ref(false);

const firstLoading = ref(false);

const opcionSeleccionada = ref('');

const isVisibleDatePicker = ref(true);
const loadingAdd = ref(false);






//Variables para el modal de abonar
const isVisibleModalAbonar = ref(false);
const saleSelected = ref({});

//Metodos para el modal de abonar
// const showSaleModal = () => {
//     isVisibleDatePicker.value = false;
//     isVisibleModalAbonar.value = true;
// }
const closeSaleModal = () => {
    isVisibleDatePicker.value = true;
    isVisibleModalAbonar.value = false;
}
const confirmarAbono = () => {
    isVisibleDatePicker.value = true;
    isVisibleModalAbonar.value = false;
    items.value = [];
    construirQuery();
}



watch(
    () => opcionSeleccionada.value,
    () => {
        items.value = [];
        page.value = 0;
        if (opcionSeleccionada.value === 'fecha-dia') {
            isFechaDia.value = true;
            construirQuery();
        } else {
            isFechaDia.value = false;
            construirQuery();
        }
    }
)

watch(
    () => nombreCliente.value,
    () => {
        items.value = [];
        page.value = 0;
        construirQuery();
    }
)

const agregarQueryProps = () => {

    if (props.idCliente !== -1) {
        query.value.id_cliente = props.idCliente;
    }
    if (props.idProducto !== 0) {
        query.value.producto = props.idProducto;
    }

}

const construirQuery = () => {
    query.value = {};
    query.value.cliente = nombreCliente.value;

    console.log('La opcion seleccionada es:' + opcionSeleccionada.value);

    if (opcionSeleccionada.value === 'todas') {
        agregarQueryProps();
        getItems();
        return
    }

    if (opcionSeleccionada.value === '') {
        console.log('No hay opcion seleccionada');
        query.value.pagado = 0;
        agregarQueryProps();
        getItems();
        return
    }
    if (opcionSeleccionada.value === 'no-pagados') {
        query.value.pagado = 0;
        agregarQueryProps();
        getItems();
        return
    }
    if (opcionSeleccionada.value === 'fecha-dia') {
        console.log('La fecha es:' + dateValue.value);
        if (dateValue.value == null || dateValue.value.length === 0) {
            console.log('No hay fecha');
            return
        }

        //2024-01-18

        let anio = dateValue.value.substring(0, 4);
        let mes = dateValue.value.substring(5, 7);
        let dia = dateValue.value.substring(8, 10);
        query.value.dia = dia;
        query.value.mes = mes;
        query.value.anio = anio;

        agregarQueryProps();
        getItems();
        return
    }

}

const getItems = async () => {
    try {
        firstLoading.value = true;
        const { data } = await getVentas(query.value);
        if (data.length === 10) {
            isThereMoreResults.value = true;
        } else {
            isThereMoreResults.value = false;
        }
        internalError.value = false;
        items.value = data;
        firstLoading.value = false;
    } catch (error) {
        console.log(error);
        firstLoading.value = false;

        if (!error.response) {
            internalError.value = true;
            return;
        }

        if (error.response.status == 500) {
            internalError.value = true;
            return;
        }
    }
}

const addItems = async () => {


    try {
        loadingAdd.value = true;
        page.value = page.value + 1;
        query.value.pag = page.value;
        let response = await getVentas(query.value);


        if (response.status !== 200) {
            isThereMoreResults.value = false;
            return
        }

        let data = response.data;

        if (data.length === 10) {
            isThereMoreResults.value = true;
        } else {
            isThereMoreResults.value = false;
        }
        items.value = [...items.value, ...data];
        internalError.value = false;
        loadingAdd.value = false;

    } catch (error) {
        console.log(error);
        loadingAdd.value = false;

        if (!error.response) {
            internalError.value = true;
            return;
        }

        if (error.response.status == 500) {
            internalError.value = true;
            return;
        }
    }
}




watch(
    () => dateValue.value,
    () => {
        if (dateValue.value == null || dateValue.value.length === 0) {
            items.value = [];
            return
        }

        let anio = dateValue.value.substring(0, 4);
        let mes = dateValue.value.substring(5, 7);
        let dia = dateValue.value.substring(8, 10);

        if (isFutureDate(dia, mes, anio)) {
            isFechaFutura.value = true;
        } else {
            items.value = [];
            construirQuery();
            isFechaFutura.value = false;
        }
    }
)



onMounted(() => {
    opcionSeleccionada.value = opciones[1].value;
    dateValue.value = getHoyDate();
    construirQuery();
});

</script>
