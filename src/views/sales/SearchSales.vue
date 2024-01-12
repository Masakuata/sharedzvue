<template>

    <ModalAbonar :isVisible="isVisibleModalAbonar" :sale="saleSelected" @cerrarConfirmarAbono="closeSaleModal" @confirmarAbono="confirmarAbono" ></ModalAbonar>
    <div class="w-full">
        <label for="miSelect" class="block mb-2 text-xl font-bold text-gray-900">Ordenar por:</label>
        <div class="py-3">
            <select v-model="opcionSeleccionada" id="miSelect"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                <option disabled value="">Selecciona una opción</option>
                <option class="w-full" v-for="opcion in opciones" :key="opcion.value" :value="opcion.value">{{ opcion.texto
                }}</option>
            </select>
        </div>


        <template v-if="isFechaDia">
            <div class="w-full pb-3">
                <AlertX :flag="isFechaFutura" message="No puedes seleccionar fechas futuras"></AlertX>
                <p>Selecciona la fecha</p>
                <template v-if="isVisibleDatePicker">
                    <VueDatePicker v-model="dateValue" :enableTimePicker="false"></VueDatePicker>
                </template>
                
            </div>

        </template>

        <template v-if="firstLoading">
            <div class="w-full h-96 flex flex-col items-center justify-center">
                <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-bgBlue"></div>
                <p class="text-xl font-bold text-gray-900">Cargando...</p>
            </div>
        </template>

        <div class="h-[80vh] w-full overflow-scroll">
            <SaleRow v-for="item in items" :key="item.id" :sale="item" @showSaleModal="showSaleModalComp"></SaleRow>

            <button v-if="items.length == 10" @click="addItems"
                class="w-full h-10 rounded-lg text-white bg-bgPurple mt-3">Cargar items</button>

            <div v-else-if="!isThereMoreResults && !firstLoading"
                class="w-full h-24 flex flex-col items-center justify-center">
                <p class="text-xl font-bold text-gray-900">No hay más resultados</p>
            </div>
        </div>







    </div>
</template>

<script setup>

import { onMounted, ref, watch, defineEmits } from 'vue';
import { getVentas } from '@/api/api.js';
import { isFutureDate } from '@/utils/validator.js';
import AlertX from '@/components/utilities/AlertX.vue';
import SaleRow from '@/components/SaleRow.vue';
import ModalAbonar from '@/views/sales/ModalAbonar.vue';


import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
// import ModalAbonar from '@/views/sales/ModalAbonar.vue';


const opciones = [
    { value: 'fecha-dia', texto: 'Fecha - Dia' },
    { value: 'no-pagados', texto: 'No pagados primero' },
];



const query = ref({})
const isFechaDia = ref(false);
const dateValue = ref([]);

const items = ref([]);
const page = ref(0);
const isThereMoreResults = ref(true);
const isFechaFutura = ref(false);

const firstLoading = ref(false);

const opcionSeleccionada = ref('');

const isVisibleDatePicker = ref(true);



//Variables para el modal de abonar
const isVisibleModalAbonar = ref(false);
const saleSelected = ref({});

//Metodos para el modal de abonar
const showSaleModal = () => {
    isVisibleDatePicker.value = false;
    isVisibleModalAbonar.value = true;
}
const closeSaleModal = () => {
    isVisibleDatePicker.value = true;
    isVisibleModalAbonar.value = false;
}
const confirmarAbono = () => {
    console.log('Confirmar abono');
}



watch(
    () => opcionSeleccionada.value,
    () => {
        items.value = [];
        page.value = 0;
        if (opcionSeleccionada.value === 'fecha-dia') {
            isFechaDia.value = true;
        } else {
            isFechaDia.value = false;
            construirQuery();
        }
    }
)

const construirQuery = () => {
    if (opcionSeleccionada.value === '') {
        query.value = {};
        query.value.pagado = 0;
        getItems();
        return
    }
    if (opcionSeleccionada.value === 'no-pagados') {
        query.value = {};
        query.value.pagado = 0;
        console.log('Cayo en no pagados');
        getItems();
        return
    }
    if (opcionSeleccionada.value === 'fecha-dia') {

        if (dateValue.value == null || dateValue.value.length === 0) {
            return
        }

        console.log('El dia es:', dateValue.value.getUTCDate());
        query.value = {
            dia: dateValue.value.getUTCDate(),
            mes: dateValue.value.getUTCMonth() + 1,
            anio: dateValue.value.getUTCFullYear(),
        };
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

        items.value = data;
        firstLoading.value = false;
    } catch (error) {
        console.log(error);
        firstLoading.value = false;
    }
}

const addItems = async () => {
    console.log('Agregando items'); 

    try {
        page.value = page.value + 1;
        query.value.pag = page.value;
        const { data } = await getVentas(query.value);

        if (data.length === 10) {
            isThereMoreResults.value = true;
        } else {
            isThereMoreResults.value = false;
        }
        items.value = [...items.value, ...data];
    } catch (error) {
        console.log(error);
    }
}




watch(
    () => dateValue.value,
    () => {

        if (dateValue.value == null || dateValue.value.length === 0) {
            items.value = [];
            return
        }
        if (isFutureDate(dateValue.value)) {
            isFechaFutura.value = true;
        } else {
            items.value = [];
            construirQuery();
            isFechaFutura.value = false;
        }
    }
)

const showSaleModalComp = (sale) => {
    saleSelected.value = sale;
    showSaleModal();
    console.log('La venta seleccionada es:' ,sale);
}

onMounted(() => {
    construirQuery();
});

</script>
