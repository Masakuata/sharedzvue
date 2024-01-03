<template>
    <ModalX :is-visible="modalVisible" :is-cancelable="true" @cancel="cancelModal" @confirm="confirmModal">
        <template v-slot:header>
            <p>El prouducto seleccionado ya esta incluido en la lista, deseas sustituirlo?</p>
            <p>El producto es jejeje</p>

        </template>

    </ModalX>

    <ModalProductDuplicated :producto-repetido="productoRepetido" :producto-en-lista="productoEnLista" :is-cancelable="true"
        @cancel="cancelModalProductoRepetido" @sumarCantidades="sumarCantidadesModalProductoRepetido"
        @sustituirProducto="remplazarModalProductoRepetido" :is-visible="modalProcutoRepetidoVisible">
    </ModalProductDuplicated>


    <h1 class="text-white absolute top-0 right-0 mr-2   text-xl font-semibold text-left mt-3">NOTAS</h1>
    <div @click="closeSidebar" class="flex flex-col items-center p-4  w-full h-full md:h-full bg-gray-50">

        <ModalProducts :is-visible="modalProductsVisible" @cancelAddProduct="cancelModalProducts"
            @confirmAddProduct="confirmModalProducts"></ModalProducts>

        <p class="w-full text-xl font-semibold mb-3">Seleccione un cliente y registre su venta</p>
        <SearchX></SearchX>

        <div class="w-full h-[60vh] border border-gray-400 rounded-lg mt-3 p-3 overflow-scroll">
            <p>Productos a vender</p>
            <ProductoVenderRow v-for="product in productosLista" :key=product.id :producto="product"
                @unselect-item="unselectProduct"></ProductoVenderRow>
        </div>
        <div class=" flex flex-row w-full items-center mt-3 pt-3">
            <div class=" flex flex-col w-1/2">
                <p class="w-full  text-center  text-xl">Costo Total</p>
                <p class="w-full text-center  text-lg font-semibold text-green-700">{{ totalString }}</p>
            </div>
            <button @click="showModalProducts" class="w-1/2 h-10 bg-bgPurple text-white rounded-xl">Agregar
                producto</button>
        </div>

        <div class="flex flex-row w-full mt-3">

            <div class="w-1/2 pr-1">
                <ButtonX color="red">Cancelar</ButtonX>
            </div>
            <div class="w-1/2 pl-1">
                <ButtonX color="blue">Registrar</ButtonX>
            </div>


        </div>







    </div>
</template>
    
<script setup>
import { ref, onMounted, watch } from 'vue';
import { toggleSidebar } from '@/utils/sidebarManager.js';
import SearchX from '@/components/utilities/SearchX.vue';
import ModalX from '@/components/utilities/ModalX.vue';
import { toast } from 'vue3-toastify';
import ButtonX from '@/components/utilities/ButtonX.vue';
import ModalProducts from './ModalProducts.vue';
import ProductoVenderRow from './ProductoVenderRow.vue';
import ModalProductDuplicated from './ModalProductDuplicated.vue';
import { list } from 'postcss';

//Variables y metodos del modal de producto repetido
const productosLista = ref([]);



const productoEnLista = ref({});
const productoRepetido = ref({});

const modalProcutoRepetidoVisible = ref(false);

const showModalProductoRepetido = () => {
    modalProcutoRepetidoVisible.value = true;
};
const cancelModalProductoRepetido = () => {
    modalProcutoRepetidoVisible.value = false;
};
const remplazarModalProductoRepetido = () => {

    productosLista.value = productosLista.value.filter(prod => prod.id !== productosLista.value.id);
    productosLista.value.push(productoRepetido.value);

    modalProcutoRepetidoVisible.value = false;


    calcularTotal();
};
const sumarCantidadesModalProductoRepetido = () => {
    if (!productoEnLista.value.cantidadCompra > productoRepetido.value.cantidad) {
        remplazarProducto();
        productosLista.value.push(productoRepetido.value);

        modalProcutoRepetidoVisible.value = false;
        console.log('lista es:', productoEnLista.value);
        calcularSubtotales();
        calcularTotal();
    }else{
        toast("No hay suficiente producto en inventario, verfica las cantodades", {
            type: 'error',
            autoClose: false,
        });
    }

};

const remplazarProducto = () => {
    productosLista.value = productosLista.value.filter(prod => prod.id !== productoRepetido.value.id);
    productoRepetido.value.cantidadCompra += productoEnLista.value.cantidadCompra;
};

const confirmModalProducts = (producto) => {
    console.log('Lo producto del emit es:', producto);
    modalProductsVisible.value = false;

    if (productosLista.value.some(prod => prod.id === producto.id)) {

        productoEnLista.value = productosLista.value.find(prod => prod.id === producto.id);
        productoRepetido.value = producto;
        console.log('El producto repetido es:', productoRepetido.value);
        console.log('El producto en lista es:', productoEnLista.value);

        showModalProductoRepetido();
    } else {
        productosLista.value.push(producto);
    }

};

//--------------------------


const modalVisible = ref(false);
const modalProductsVisible = ref(false);
const totalInt = ref(0);
const totalString = ref('$ 0.00');


const showModal = () => {
    modalVisible.value = true;
};

const cancelModal = () => {
    modalVisible.value = false;
};

const confirmModal = () => {
    modalVisible.value = false;
};

const showModalProducts = () => {
    modalProductsVisible.value = true;
};

const cancelModalProducts = () => {
    modalProductsVisible.value = false;
};



const unselectProduct = (producto) => {
    productosLista.value = productosLista.value.filter(prod => prod.id !== producto.id);
};



const mostrarToast = () => {

    toast("Nota registrada correctamente", {
        type: 'success',
        autoClose: 500,
    });

};

const calcularTotal = () => {
    console.log('calcular total: La lista de productos es:', productosLista.value);
    console.log('Se ejecuta calcular total');
    let total = 0;
    productosLista.value.forEach(current => {
        console.log('El producto es dentro foreach:', current.subtotal);
        console.log('El subtotal de', current.nombre, 'es', current.subtotal);
        total += current.subtotal;
    });
    total = total.toFixed(2);
    console.log('El total es', total);
    totalInt.value = total;
    totalString.value = `$ ${total}`;

};

watch(
    () => productosLista.value.length,
    () => {
        calcularTotal();
    }
)

const calcularSubtotales = () => {
    productosLista.value.forEach(producto => {
        let subtotalLargo = producto.cantidadCompra * producto.precio;
        let subtotal = subtotalLargo.toFixed(2);
        let subtotalFloat = parseFloat(subtotal);
        producto.subtotal = subtotalFloat;
    });
};





const closeSidebar = () => {
    toggleSidebar();
};
onMounted(() => {
});

</script>