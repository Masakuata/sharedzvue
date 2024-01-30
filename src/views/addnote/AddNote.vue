<template>
    <h1 class="text-white absolute top-0 right-0 mr-2   text-xl font-semibold text-left mt-3">NOTAS</h1>
    <div @click="closeSidebar" class="flex flex-col items-center p-4  w-full h-full md:h-full bg-gray-50">
        <template v-if="modalConfirmacionVentalVisible">
            <ModalConfirmacionVenta :is-visible="modalConfirmacionVentalVisible" :productos="productosLista"
                :cliente="cliente" :total="totalInt" @cerrarConfirmarVenta="cancelModalConfirmacionVenta"
                @confirmarVenta="confirmModalConfirmacionVenta" @emitError="errorRegistrarVenta">
                >
            </ModalConfirmacionVenta>
        </template>
        <ModalCancelVenta :is-visible="modalCancelVentaVisible" @cerrarModalCancelarVenta="closeModalCancelVenta"
            @cancelarVenta="cancelVenta"></ModalCancelVenta>

        <template v-if="modalProductsVisible">
            <ModalProducts :is-visible="modalProductsVisible" @cancelAddProduct="cancelModalProducts"
                @confirmAddProduct="confirmModalProducts" @editProduct="editarProducto" :productos-lista="productosLista"
                :tipoCliente="tipoCliente">
            </ModalProducts>
        </template>

        <template v-if="modalProductDetailVisible">
            <ModalProducDetail @confirmEditProduct="editProductDetail" @cancelEditProduct="cancelModalProductDetail"
                :is-visible="modalProductDetailVisible" :producto="productSelected"></ModalProducDetail>
        </template>

        <template v-if="!internalError">
            <p class="w-full text-lg font-semibold mb-3 text-center">Seleccione un cliente y registre su venta</p>
            <SearchClientX @error="emitSearchError" :reload="reloadSearch" @select-item="seleccionarCliente"
                @unselect-item="deseleccionarCliente">
            </SearchClientX>

            <p class="w-full bg-gray-400 text-white text-center mt-3 font-semibold py-1 rounded-lg">PRODUCTOS A VENDER</p>
            <div class="w-full h-[60vh] overflow-scroll">
                <template v-if="productosLista.length === 0">
                    <p class="w-full text-center mt-5 text-lg">
                        No hay productos agregados
                    </p>
                </template>
                <ProductoVenderRow v-for="product in productosLista" :key=product.id :producto="product"
                    @unselect-item="unselectProduct" :is-deletable="true" @showDetails="selectProduct"></ProductoVenderRow>
            </div>
            <div class="w-full mt-2">
                <ButtonX color="purple" :is-slim="true" icon="add" @click="showModalProducts">Agregar producto</ButtonX>
            </div>

            <div class=" flex flex-row w-full items-center mt-3 pt-3">
                <div class=" flex flex-col w-1/2">
                    <p class="w-full  text-center  text-xl">Costo Total</p>
                    <p class="w-full text-center  text-lg font-bold">{{ totalString }}</p>
                </div>

                <div class=" flex flex-col w-1/2">
                    <p class="w-full  text-center  text-xl">Peso Total</p>
                    <p class="w-full text-center  text-lg font-bold">{{ pesoTotalString }}</p>
                </div>

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

            <div class="flex flex-row w-full mt-3">
                <div class="w-1/2 pr-1">
                    <ButtonX color="red" @click="showModalCancelVenta">Cancelar</ButtonX>
                </div>
                <div class="w-1/2 pl-1">
                    <button class="w-full rounded-lg h-12 text-white font-semibold bg-bgBlue"
                        @click="registrarCompra">Crear</button>
                </div>
            </div>
        </template>
        <template v-else>
            <ErrorX @aceptar="limpiarCampos"></ErrorX>
        </template>


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
import ErrorX from '@/components/utilities/ErrorX.vue';


//Variables del ModalProducDetail
const productSelected = ref(null);
const modalProductDetailVisible = ref(false);

const errorCantidadMayor = ref(false);

//Variables del ModalConfirmacionVenta
const modalConfirmacionVentalVisible = ref(false);

//Varables del ModalCancelVenta
const modalCancelVentaVisible = ref(false);



const productosLista = ref([]);
const cliente = ref(null);
const isClienteSelected = ref(false);

const reloadSearch = ref(false);


const modalProductsVisible = ref(false);
const totalInt = ref(0);
const totalString = ref('$ 0.00');

const pesoTotalFloat = ref(0);
const pesoTotalString = ref('0.00 kg');

const tipoCliente = ref(0);

const internalError = ref(false);


const emitSearchError = () => {
    internalError.value = true;
};


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
const errorRegistrarVenta = (error) => {
    limpiarCampos();
    cancelModalConfirmacionVenta();
};


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



const confirmModalProducts = (producto) => {
    modalProductsVisible.value = false;

    if (productosLista.value.some(prod => prod.id === producto.id)) {
        //(producto);
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

const calcularPesoTotal = () => {
    let total = 0;
    productosLista.value.forEach(current => {
        total += current.pesoTotal;
    });
    total = total.toFixed(2);
    pesoTotalFloat.value = parseFloat(total);
    pesoTotalString.value = `${total} kg`;
};

const editarProducto = (producto) => {
    //remplazarProducto(producto);
    remplazarProducto(producto);
    modalProductsVisible.value = false;
};


const remplazarProducto = (producto) => {
    productosLista.value = productosLista.value.filter(prod => prod.id !== producto.id);
    productosLista.value.push(producto);
    calcularTotal();
    calcularPesoTotal();
};

watch(
    () => productosLista.value.length,
    () => {
        calcularTotal();
        calcularPesoTotal();
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
    isClienteSelected.value = false;
    errorCantidadMayor.value = false;
    internalError.value = false;
};

const seleccionarCliente = (clienteEmit) => {
    cliente.value = clienteEmit;

    if (tipoCliente.value !== clienteEmit.tipoCliente) {

        tipoCliente.value = clienteEmit.tipoCliente;
        recargarProductos(clienteEmit.tipoCliente);
    } else {
        recargarProductos(clienteEmit.tipoCliente);

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

