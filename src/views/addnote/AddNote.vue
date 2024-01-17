<template>
    <h1 class="text-white absolute top-0 right-0 mr-2   text-xl font-semibold text-left mt-3">NOTAS</h1>
    <div @click="closeSidebar" class="flex flex-col items-center p-4  w-full h-full md:h-full bg-gray-50">
        <ModalConfirmacionVenta :is-visible="modalConfirmacionVentalVisible" :productos="productosLista" :cliente="cliente"
            :abonoInicial="abonoInicial" :pagado="pagado" :total="totalInt"
            @cerrarConfirmarVenta="cancelModalConfirmacionVenta" @confirmarVenta="confirmModalConfirmacionVenta">
        </ModalConfirmacionVenta>

        <ModalCancelVenta :is-visible="modalCancelVentaVisible" @cerrarModalCancelarVenta="closeModalCancelVenta"
            @cancelarVenta="cancelVenta"></ModalCancelVenta>

        <ModalProducts :is-visible="modalProductsVisible" @cancelAddProduct="cancelModalProducts"
            @confirmAddProduct="confirmModalProducts" :productos-lista="productosLista" :tipoCliente="tipoCliente">
        </ModalProducts>

        <ModalProducDetail @confirmEditProduct="editProductDetail" @cancelEditProduct="cancelModalProductDetail"
            :is-visible="modalProductDetailVisible" :producto="productSelected"></ModalProducDetail>


        <p class="w-full text-xl font-semibold mb-3 text-center">Seleccione un cliente y registre su venta</p>
        <SearchClientX :reload="reloadSearch" @select-item="seleccionarCliente" @unselect-item="deseleccionarCliente">
        </SearchClientX>

        <p class="w-full bg-gray-400 text-white text-center mt-3 font-semibold py-1 rounded-t-lg">PRODUCTOS A VENDER</p>
        <div class="w-full h-[60vh] border border-gray-400 rounded-b-lg  p-3 overflow-scroll">

            <ProductoVenderRow v-for="product in productosLista" :key=product.id :producto="product"
                @unselect-item="unselectProduct" :is-deletable="true" @showDetails="selectProduct"></ProductoVenderRow>
        </div>
        <div class=" flex flex-row w-full items-center mt-3 pt-3">
            <div class=" flex flex-col w-1/2">
                <p class="w-full  text-start  text-xl">Costo Total</p>
                <p class="w-full text-start  text-lg font-semibold text-green-700">{{ totalString }}</p>
            </div>
            <button @click="showModalProducts" class="w-1/2 h-10 bg-bgPurple text-white rounded-xl">Agregar
                producto</button>
        </div>
        <div v-if="errorCantidadMayor" class="flex flex-row py-1 my-2 h-fit border-2 border-orange-500 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-alert-triangle w-10 h-auto mx-2">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
            </svg>
            <p>La cantidad no puede ser mayor que la de inventario</p>
        </div>
        <div v-if="productosLista.length > 0" class="flex flex-row w-full h-10  items-center border-t border-bgBlue ">
            <!-- <label class="text-gray-700 mr-10 font-semibold w-1/2" for="checkbox">Finiquitar venta</label>
            <div class="w-1/2 text-right">
                <input type="checkbox" v-model="finiquitarVenta"
                class="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500 " id="checkbox">
            </div> -->
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

        <div class="flex flex-row w-full  items-center space-x-2 pt-2">
            <p class="font-semibold text-lg w-1/2">Abono Inicial</p>
            <div class="w-1/2 text-right pr-2">
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-dollar-sign">
                            <line x1="12" x2="12" y1="2" y2="22" />
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                    </div>
                    <input type="search" :disabled="finiquitarVenta" v-model="abonoInicial" id="default-search"
                        class="block w-full p-4 ps-10 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required>

                </div>
                <!-- <input :disabled="finiquitarVenta" class="h-14 border border-gray-200 rounded-lg px-2 w-28 "
                    v-model="abonoInicial"> -->
            </div>


        </div>

        <div class="flex flex-row w-full mt-3">
            <div class="w-1/2 pr-1">
                <ButtonX color="red" @click="showModalCancelVenta">Cancelar</ButtonX>
            </div>
            <div class="w-1/2 pl-1">
                <button class="w-full rounded-lg h-12 text-white font-semibold bg-bgBlue" @click="registrarCompra">Registrar
                    venta</button>
            </div>
        </div>
    </div>
</template>
    
<script setup>
import { ref, onMounted, watch } from 'vue';
import { toggleSidebar } from '@/utils/sidebarManager.js';
import SearchClientX from '@/components/utilities/SearchClientX.vue';
import { toast } from 'vue3-toastify';
import ModalProducts from './ModalProducts.vue';
import ProductoVenderRow from './ProductoVenderRow.vue';
import ModalProducDetail from './ModalProducDetail.vue';
import { getProductosBusqueda } from '@/api/api.js';
import ModalCancelVenta from './ModalCancelVenta.vue';
import ModalConfirmacionVenta from './ModalConfirmacionVenta.vue';
import ButtonX from '@/components/utilities/ButtonX.vue';


//Variables del ModalProducDetail
const productSelected = ref(null);
const modalProductDetailVisible = ref(false);

const errorCantidadMayor = ref(false);

//Variables del ModalConfirmacionVenta
const modalConfirmacionVentalVisible = ref(false);

//Varables del ModalCancelVenta
const modalCancelVentaVisible = ref(false);

const finiquitarVenta = ref(false);

const productosLista = ref([]);
const cliente = ref(null);
const isClienteSelected = ref(false);

const reloadSearch = ref(false);

const abonoInicial = ref('0');
const pagado = ref(false);

const modalProductsVisible = ref(false);
const totalInt = ref(0);
const totalString = ref('$ 0.00');

const tipoCliente = ref(0);


//Metodos del ModalCancelVenta
const showModalCancelVenta = () => {
    if (productosLista.value.length > 0 || cliente.value !== null) {
        modalCancelVentaVisible.value = true;
    }
};
const closeModalCancelVenta = () => {
    modalCancelVentaVisible.value = false;
};
const cancelVenta = () => {
    closeModalCancelVenta();
    limpiarCampos();
};


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
    } else {
        toast("Ocurrio un error al registrar la venta", {
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

    toast("Venta registrada correctamente", {
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
        toast("No puedes registrar una venta sin cliente", {
            type: 'warning',
            autoClose: 2000,
        });
        return false;
    }
    if (productosLista.value.length < 1) {
        toast("No puedes registrar una venta sin productos", {
            type: 'warning',
            autoClose: 2000,
        });
        return false;
    }
    let abonoInicialInt = parseInt(abonoInicial.value);

    if (abonoInicialInt > totalInt.value) {
        toast("El abono inicial no puede ser mayor al total", {
            type: 'warning',
            autoClose: 2000,
        });
        return false;
    }

    pagado.value = finiquitarVenta.value;

    return true;
};

const registrarCompra = async () => {
    if (!validarCompra()) {
        return;
    }
    if (abonoInicial.value == '') {
        abonoInicial.value = '0';
    }
    showModalConfirmacionVenta();

};


const limpiarCampos = () => {
    reloadSearch.value = !reloadSearch.value;
    productosLista.value = [];
    cliente.value = null;
    abonoInicial.value = '0';
    pagado.value = false;
    isClienteSelected.value = false;
    errorCantidadMayor.value = false;
    finiquitarVenta.value = false;
};

const seleccionarCliente = (clienteEmit) => {
    console.log('clienteSeleccionado', clienteEmit);
    cliente.value = clienteEmit;

    if (tipoCliente.value !== clienteEmit.tipoCliente) {
        console.log('cambio de tipo de cliente');
        tipoCliente.value = clienteEmit.tipoCliente;
        recargarProductos(clienteEmit.tipoCliente);
    } else {
        recargarProductos(clienteEmit.tipoCliente);
        console.log('no cambio de tipo de cliente');
    }
    isClienteSelected.value = true;
};

const deseleccionarCliente = () => {
    cliente.value = null;
    isClienteSelected.value = false;
};

const recargarProductos = (tipoCliente) => {
    productosLista.value.forEach(async producto => {
        let productosaAux = await getProductosBusqueda(producto.nombre, tipoCliente)
        if (productosaAux.length > 0) {
            if (producto.id === productosaAux[0].id) {
                console.log('Actualizando precion de producto', producto.nombre);
                producto.precio = productosaAux[0].precio;
            }
        }
    });
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

const togleFiniquitarRestante = () => {
    finiquitarVenta.value = !finiquitarVenta.value;
};

const filtrarEntrada = (input) => {
    // Primero, quitar todos los caracteres que no sean dígitos o puntos
    let filtrado = input.replace(/[^\d.]/g, '');

    // Comprobar si hay más de un punto en la cadena
    if ((filtrado.match(/\./g) || []).length > 1) {
        // Dejar solo el primer punto y eliminar los demás
        let partes = filtrado.split('.');
        filtrado = partes.shift() + '.' + partes.join('');
    }

    return filtrado;
}





const closeSidebar = () => {
    toggleSidebar();
};
onMounted(() => {
});

</script>