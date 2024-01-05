<template>
    <h1 class="text-white absolute top-0 right-0 mr-2   text-xl font-semibold text-left mt-3">NOTAS</h1>
    <div @click="closeSidebar" class="flex flex-col items-center p-4  w-full h-full md:h-full bg-gray-50">
        <ModalConfirmacionVenta :is-visible="modalConfirmacionVentalVisible" :productos="productosLista" :cliente="cliente"
            :abonoInicial="abonoInicial" :pagado="pagado" :total="totalInt"
            @cerrarConfirmarVenta="cancelModalConfirmacionVenta" @confirmarVenta="confirmModalConfirmacionVenta">
        </ModalConfirmacionVenta>

        <ModalProducts :is-visible="modalProductsVisible" @cancelAddProduct="cancelModalProducts"
            @confirmAddProduct="confirmModalProducts" :productos-lista="productosLista" :tipoCliente="tipoCliente"></ModalProducts>

        <ModalProducDetail @confirmEditProduct="editProductDetail" @cancelEditProduct="cancelModalProductDetail"
            :is-visible="modalProductDetailVisible" :producto="productSelected"></ModalProducDetail>

        <p class="w-full text-xl font-semibold mb-3">Seleccione un cliente y registre su venta</p>
        <SearchX :reload="reloadSearch" @select-item="seleccionarCliente" @unselect-item="deseleccionarCliente"></SearchX>

        <div class="w-full h-[60vh] border border-gray-400 rounded-lg mt-3 p-3 overflow-scroll">
            <p>Productos a vender</p>
            <ProductoVenderRow v-for="product in productosLista" :key=product.id :producto="product"
                @unselect-item="unselectProduct" :is-deletable="true" @showDetails="selectProduct"></ProductoVenderRow>
        </div>
        <div class=" flex flex-row w-full items-center mt-3 pt-3">
            <div class=" flex flex-col w-1/2">
                <p class="w-full  text-start  text-xl">Costo Total</p>
                <p class="w-full text-start  text-lg font-semibold text-green-700">{{ totalString }}</p>
            </div>
            <button @click="showModalProducts"  class="w-1/2 h-10 bg-bgPurple text-white rounded-xl">Agregar
                producto</button>
        </div>

        <div class="flex flex-row w-full border-t border-bgBlue items-center space-x-2 pt-2">
            <p class="font-semibold w-1/2">Abono Inicial</p>
            <div class="w-1/2 text-right pr-2">
                <input class="h-14 border border-gray-200 rounded-lg px-2 w-28 " v-model="abonoInicial" type="number">
            </div>

        </div>

        <div class="flex flex-row w-full mt-3">
            <div class="w-1/2 pr-1">
                <button class="w-full rounded-lg h-12 text-white font-semibold bg-red-600">Cancelar</button>
            </div>
            <div class="w-1/2 pl-1">
                <button class="w-full rounded-lg h-12 text-white font-semibold bg-bgBlue" @click="registrarCompra">Registrar</button>
            </div>
        </div>
    </div>
</template>
    
<script setup>
import { ref, onMounted, watch } from 'vue';
import { toggleSidebar } from '@/utils/sidebarManager.js';
import SearchX from '@/components/utilities/SearchX.vue';
import { toast } from 'vue3-toastify';
import ModalProducts from './ModalProducts.vue';
import ProductoVenderRow from './ProductoVenderRow.vue';
import ModalProducDetail from './ModalProducDetail.vue';
import {getProductosBusqueda} from '@/api/api.js';

import ModalConfirmacionVenta from './ModalConfirmacionVenta.vue';


//Variables del ModalProducDetail
const productSelected = ref(null);
const modalProductDetailVisible = ref(false);

//Variables del ModalConfirmacionVenta
const modalConfirmacionVentalVisible = ref(false);



const productosLista = ref([]);
const cliente = ref(null);
const isClienteSelected = ref(false);

const reloadSearch = ref(false);

const abonoInicial = ref(0);
const pagado = ref(false);

const modalProductsVisible = ref(false);
const totalInt = ref(0);
const totalString = ref('$ 0.00');

const tipoCliente = ref(0);




//Metodos del ModalProducDetail
const showModalProductDetail = () => {
    modalProductDetailVisible.value = true;
};
const editProductDetail = (product) => {
    remplazarProducto(product);
    modalProductDetailVisible.value = false;
};

const cancelModalProductDetail = () => {
    modalProductDetailVisible.value = false;
};

//Metodos del ProductoVenderRow

const unselectProduct = (producto) => {
    productosLista.value = productosLista.value.filter(prod => prod.id !== producto.id);
};

const selectProduct = (producto) => {
    productSelected.value = producto;
    showModalProductDetail();
};

//Metodos del ModalConfirmacionVenta
const showModalConfirmacionVenta = () => {
    modalConfirmacionVentalVisible.value = true;
};

const cancelModalConfirmacionVenta = () => {
    modalConfirmacionVentalVisible.value = false;
};

const confirmModalConfirmacionVenta = (registrada) => {
    if (registrada) {
        modalConfirmacionVentalVisible.value = false;
        mostrarToast();
        limpiarCampos();
    }else{
        toast("Ocurrio un error al registrar la nota", {
            type: 'error',
            autoClose: 2000,
        });
    }
};

const remplazarProducto = (producto) => {
    productosLista.value = productosLista.value.filter(prod => prod.id !== producto.id);
    productosLista.value.push(producto);
    calcularTotal();
};

const confirmModalProducts = (producto) => {
    modalProductsVisible.value = false;

    if (productosLista.value.some(prod => prod.id === producto.id)) {
        remplazarProducto(producto);
    } else {
        productosLista.value.push(producto);
    }

};








const showModalProducts = () => {
    if (!isClienteSelected.value) {
        toast("No puedes agregar productos sin seleccionar un cliente", {
            type: 'warning',
            autoClose: 2000,
        });
        return;
    }
    modalProductsVisible.value = true;
};

const cancelModalProducts = () => {
    modalProductsVisible.value = false;
};


const mostrarToast = () => {

    toast("Nota registrada correctamente", {
        type: 'success',
        autoClose: 500,
    });

};

const calcularTotal = () => {
    let total = 0;
    productosLista.value.forEach(current => {
        total += current.subtotal;
    });
    total = total.toFixed(2);
    totalInt.value = parseFloat(total);
    totalString.value = `$ ${total}`;
};

watch(
    () => productosLista.value.length,
    () => {
        calcularTotal();
    }
)


const validarCompra = () => {
    if (cliente.value === null) {
        toast("No puedes registrar una nota sin cliente", {
            type: 'warning',
            autoClose: 2000,
        });
        return false;
    }
    if (productosLista.value.length < 1) {
        toast("No puedes registrar una nota sin productos", {
            type: 'warning',
            autoClose: 2000,
        });
        return false;
    }

    pagado.value = abonoInicial.value === totalInt.value;



    return true;
};

const registrarCompra = async () => {
    if (!validarCompra()) {
        return;
    }

    showModalConfirmacionVenta();

};


const limpiarCampos = () => {
    reloadSearch.value = !reloadSearch.value;
    productosLista.value = [];
    cliente.value = null;
    abonoInicial.value = 0;
    pagado.value = false;
    isClienteSelected.value = false;
};

const seleccionarCliente = (clienteEmit) => {
    console.log('clienteSeleccionado', clienteEmit);
    cliente.value = clienteEmit;

    if (tipoCliente.value !== clienteEmit.tipoCliente) {
        console.log('cambio de tipo de cliente');
        tipoCliente.value = clienteEmit.tipoCliente;
        recargarProductos(clienteEmit.tipoCliente);
    }else{
        recargarProductos(clienteEmit.tipoCliente);
        console.log('no cambio de tipo de cliente');
    }
    isClienteSelected.value = true;
};

const deseleccionarCliente = () => {
    cliente.value = null;
    isClienteSelected.value = false;
};

const recargarProductos =  (tipoCliente) => {
    productosLista.value.forEach(async producto => {
        let productosaAux = await getProductosBusqueda(producto.nombre , tipoCliente )
        if(productosaAux.length > 0){
            if(producto.id === productosaAux[0].id ){
                console.log('Actualizando precion de producto' , producto.nombre);
                producto.precio = productosaAux[0].precio;
            }      
        }
    });
};


watch(
    () => abonoInicial.value,
    () => {
        if (abonoInicial.value > totalInt.value) {
            abonoInicial.value = totalInt.value;
            toast("El abono no puede superar el total de la compra", {
                type: 'warning',
                autoClose: 2000,
            });
        }
    }
)




const closeSidebar = () => {
    toggleSidebar();
};
onMounted(() => {
});

</script>