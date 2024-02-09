<template>
    <h1 class="text-white absolute top-0 right-0 mr-2   text-xl font-semibold text-left mt-3">ACTUALIZAR PRODUCTO</h1>
    <div @click="clickEnDiv" class="flex flex-col items-center p-4 overflow-scroll  w-full h-full md:h-full">
        <template v-if="sessionExpired">
            <ModalSesionExpired></ModalSesionExpired>
        </template>


        <template v-if="!internalError">
            <template v-if="!requestSent">
                <template v-if="!loading">
                    <div class="w-full">
                        <div class="w-full">
                            <p class="text-lg font-medium">Edita la imagen del producto</p>
                            <FileManagerX :image-url="imageUrl" @set-image="agregarImagen"></FileManagerX>
                        </div>

                        <label for="nombreProducto" class="block text-lg font-medium ">Nombre de producto</label>
                        <input type="text" id="nombreProducto" v-model="nombreProducto" @input="validateNombreProdcuto"
                            class="w-full mt-1 h-10 px-3 border border-solid border-blueLetters rounded-lg" />
                        <template v-if="nombreProducto.length > 0">
                            <p class="text-green-600" v-if="nombreProductoValid">Nombre Válido</p>
                            <p v-else class="text-red-600">El nombre del producto no es válido</p>
                        </template>
                        <p v-else-if="faltaNombreProducto" class="text-red-600">El nombre del producto es un campo requerido
                        </p>
                    </div>
                    <div class="w-full">
                        <label for="presentacionProducto" class="block text-lg font-medium ">Presentación</label>
                        <input type="text" id="presentacionProducto" v-model="presentacionProducto"
                            @input="validatePresentacionProdcuto"
                            class="w-full mt-1 h-10 px-3 border border-solid border-blueLetters rounded-lg" />
                        <template v-if="presentacionProducto.length > 0">
                            <p class="text-green-600" v-if="presentacionProductoValid">Presentación válida</p>
                            <p v-else class="text-red-600">La presentación del producto no es válida</p>
                        </template>
                        <p v-else-if="faltaPresentacionProducto" class="text-red-600">La presentacion del producto es un
                            campo
                            requerido
                        </p>
                    </div>
                    <div class="flex flex-row items-center text-right  justify-center py-2">
                        <p class="w-3/4 text-left text-lg font-semibold pr-3">Ingresa el peso del producto en kilogramos</p>
                        <input v-model="pesoProducto" class="w-1/4 h-10 border border-blueLetters rounded-lg px-2">
                    </div>

                    <div class="flex flex-row items-center text-right">
                        <p class="w-3/4 text-left text-lg font-semibold pr-3">Selecciona la cantidad en stock</p>
                        <input v-model="cantidadProducto" class="w-1/4 h-10 border border-gray-400 rounded-lg mt-2 px-2">
                    </div>
                    <p v-if="faltaCantidadProducto" class="text-red-600 w-full">La cantidad de stock es un campo requerido
                    </p>

                    <label for="miSelect" class="block mb-2 text-lg font-semibold w-full text-left">Tipo de mascota</label>
                    <div class="w-full h-12">
                        <select v-model="opcionRazaSeleccionada" id="miSelect"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option disabled value="">Selecciona una opción</option>
                            <option class="w-full" v-for="opcion in opciones" :key="opcion.value" :value="opcion.value">{{
                                opcion.texto
                            }}</option>
                        </select>
                    </div>



                    <div class="w-full">
                        <label for="precioProducto" class="block text-lg font-medium ">Precio Publico</label>
                        <input type="text" id="precioProducto" v-model="precioProducto" @input="validatePrecioProdcuto"
                            class="w-full mt-1 h-10 px-3 border border-solid border-blueLetters rounded-lg" />

                        <p v-if="faltaPrecioProducto" class="text-red-600">El precio del producto es un campo
                            requerido</p>
                    </div>
                    <div class="w-full">
                        <SearchTipoCliente v-if="!sessionExpired" :tipos-clientes-seleccionados="precios">
                        </SearchTipoCliente>
                    </div>


                    <div class="flex flex-row mt-3 mb-5 w-full">
                        <div class="w-1/2 px-2">
                            <ButtonX color="red" @click="regresar">Cancelar</ButtonX>
                        </div>
                        <div class="w-1/2 px-2">
                            <ButtonX color="purple" @click="actualizarInformacion">Actualizar producto</ButtonX>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="w-full h-96 flex flex-col items-center justify-center">
                        <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-bgBlue"></div>
                        <p class="text-xl font-bold text-gray-900">Cargando...</p>
                    </div>
                </template>


            </template>
            <template v-else>
                <template v-if="loading">
                    <div class="flex flex-row items-center h-[80vh]">
                        <LoadingX message="Actualizando producto..."></LoadingX>
                    </div>

                </template>
                <template v-else>
                    <template v-if="!hasErrror">
                        <div class="flex flex-row items-center h-[80vh] w-full">
                            <SuccesX message="Producto actualizado exitósamente" button-message="Aceptar"
                                @aceptar="aceptar">
                            </SuccesX>
                        </div>
                    </template>

                </template>

            </template>
        </template>
        <template v-else>
            <ErrorX @aceptar="aceptarErrorServe"></ErrorX>
        </template>


    </div>
</template>
    
<script setup>
import { ref, onMounted, watch } from 'vue';
import { toggleSidebar } from '@/utils/sidebarManager.js';
import ButtonX from '@/components/utilities/ButtonX.vue';
import { filtrarEntrada } from '@/utils/validator.js';
import { actualizarProducto } from '@/api/api.js';
import LoadingX from '@/components/utilities/LoadingX.vue';
import SuccesX from '@/components/utilities/SuccesX.vue';
import ErrorX from '@/components/utilities/ErrorX.vue';
import { getProductoId } from '@/api/api.js'
import { useRoute, useRouter } from 'vue-router';
import SearchTipoCliente from '../addProduct/selectTipoCliente/SearchTipoCliente.vue';
import ModalSesionExpired from '@/components/utilities/ModalSesionExpired.vue';
import { storage } from '@/firebase.js';

import { ref as storageRef, getDownloadURL, uploadBytes } from 'firebase/storage'
import FileManagerX from '@/components/utilities/FileManagerX.vue';





//Variables para manejar los flujos de la imagen
const imageUrl = ref(null);

const getImageUrl = (id) => {


    const path = process.env.VUE_APP_FIREBASE_PATH + id + '.png';

    getDownloadURL(storageRef(storage, path))
        .then((url) => {
            imageUrl.value = url;


        })
        .catch((error) => {

        });

};

const imageData = ref(null);
const agregarImagen = (file) => {
    imageData.value = file;
};

const subirimagen = async (id) => {
    const path = process.env.VUE_APP_FIREBASE_PATH + id + '.png';

    const storageRefe = storageRef(storage, path)
    uploadBytes(storageRefe, imageData.value).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    });
}



//Variables y metodos necesarios para validasr el peso del producto
const pesoProducto = ref('');
const pesoProductoValid = ref(false);
const faltaPesoProducto = ref(false);

const internalError = ref(false);
const sessionExpired = ref(false);

const validatePesoProdcuto = () => {
    faltaPesoProducto.value = false;
    pesoProducto.value = filtrarEntrada(pesoProducto.value);
    pesoProductoValid.value = pesoProducto.value.length > 0;
};

watch(
    () => pesoProducto.value,
    () => {
        validatePesoProdcuto();
    },
);


// Variables y metodos necesarios para tipoMascota
const opciones = [
    { value: 'perro', texto: 'Perro' },
    { value: 'gato', texto: 'Gato' },
];


// Variables globales
const requestSent = ref(false);
const loading = ref(false);
const hasErrror = ref(false);
const errorMessage = ref('Error al registrar el producto');
const router = useRouter();
const route = useRoute();
const id = ref(0);

const ID_PUBLICO = 1;
const ID_DETALLE = 2;
const ID_MAYORISTA = 3;

const producto = ref({});

const precios = ref([]);

const opcionRazaSeleccionada = ref('');

// Variables y metodos necesarios para validar el nombre del producto
const nombreProducto = ref('');
const nombreProductoValid = ref(false);
const faltaNombreProducto = ref(false);





const validateNombreProdcuto = () => {
    faltaNombreProducto.value = false;
    nombreProductoValid.value = nombreProducto.value.length > 0;

};
watch(
    () => nombreProducto.value,
    () => {
        validateNombreProdcuto();
    },
);

// Variables y metodos necesarios para validar el precio del producto

const precioProducto = ref('');
const precioProductoValid = ref(false);
const faltaPrecioProducto = ref(false);
const validatePrecioProdcuto = () => {
    faltaPrecioProducto.value = false;
    precioProducto.value = filtrarEntrada(precioProducto.value);
    let precioInt = parseInt(precioProducto.value);

    if (precioInt > 0) {
        precioProductoValid.value = true;
    } else {
        precioProductoValid.value = false;
    }

};
watch(
    () => nombreProducto.value,
    () => {
        validatePrecioProdcuto();
    },
);



// Variables y metodos necesarios para validar la cantidad del producto
const cantidadProducto = ref('');
const cantidadProductoValid = ref(false);
const faltaCantidadProducto = ref(false);
const validateCantidadProdcuto = () => {
    cantidadProducto.value = cantidadProducto.value.replace(/\D/g, '');
    faltaCantidadProducto.value = false;
    cantidadProductoValid.value = cantidadProducto.value.length > 0;
};

watch(
    () => cantidadProducto.value,
    () => {
        validateCantidadProdcuto();
    },
);

// Variables y metodos necesarios para validar la presentacion
const presentacionProducto = ref('');
const presentacionProductoValid = ref(false);
const faltaPresentacionProducto = ref(false);
const validatePresentacionProdcuto = () => {
    faltaPresentacionProducto.value = false;

    presentacionProductoValid.value = presentacionProducto.value.length > 0;
};

watch(
    () => presentacionProducto.value,
    () => {
        validatePresentacionProdcuto();
    },
);

// metodos globales

const llenarCampos = () => {

    nombreProducto.value = producto.value.nombre;
    presentacionProducto.value = producto.value.presentacion;

    let cantidad = producto.value.cantidad;

    cantidadProducto.value = cantidad.toString();
    let tipoMascota = producto.value.tipoMascota;
    if (tipoMascota.toLowerCase() === 'perro') {
        opcionRazaSeleccionada.value = opciones[0].value
    } else {
        opcionRazaSeleccionada.value = opciones[1].value
    }
    let precio = producto.value.precio;
    precioProducto.value = precio.toString();

    precios.value = producto.value.precios;

    pesoProducto.value = producto.value.peso.toString();

};

const aceptarErrorServe = () => {
    loading.value = false;
    requestSent.value = false;
    hasErrror.value = false;
    errorMessage.value = '';
    getProducto();
};

const getProducto = async () => {
    const id = route.params.id;

    try {
        loading.value = true;
        const response = await getProductoId(id);
        producto.value = response.data;
        llenarCampos();
        internalError.value = false;
        hasErrror.value = false;
        loading.value = false;

    } catch (error) {
        loading.value = false;
        console.log(error);
        if (!error.response) {
            internalError.value = true;
            return;
        }
        if (error.response.status == 500) {
            internalError.value = true;
            return;
        }
        if (error.response.status == 406) {
            sessionExpired.value = true;
            return;
        }
    }

};

const validateEmptyfields = () => {
    faltaCantidadProducto.value = cantidadProducto.value.length === 0;
    faltaNombreProducto.value = nombreProducto.value.length === 0;
    faltaPresentacionProducto.value = presentacionProducto.value.length === 0;
    faltaPrecioProducto.value = precioProducto.value.length === 0;
    faltaPesoProducto.value = pesoProducto.value.length === 0;
};

const validateForm = () => {
    validateEmptyfields();

    if (
        nombreProductoValid.value &&
        presentacionProductoValid.value &&
        precioProductoValid.value &&
        pesoProductoValid.value
    ) {


        return true;
    } else {
        return false;
    }
};

const actualizarInformacion = () => {
    actualizarProductoMetod();
    if (imageData.value !== null) {
        subirimagen(id.value);
    }

}

const actualizarProductoMetod = async () => {
    if (validateForm()) {
        let payload = buildPayload();

        try {
            loading.value = true;
            requestSent.value = true;
            await actualizarProducto(id.value, payload);

            loading.value = false;

        } catch (error) {
            hasErrror.value = true;
            errorMessage.value = error.response.data.detail;
            console.log('Error al actualizar el producto', error);
            loading.value = false;

            if (error.response.status === 409) {
                errorMessage.value = 'Ya existe un producto con ese nombre y descripción';
            }
            if (!error.response) {
                internalError.value = true;
                return;
            }
            if (error.response.status == 500) {
                internalError.value = true;
                return;
            }
            if (error.response.status == 406) {
                sessionExpired.value = true;
                return;
            }
        }

    }

}


const buildPayload = () => {
    let preciosMetod = [];
    const precioPublico = {
        id: ID_PUBLICO,
        precio: precioProducto.value,
    };
    preciosMetod.push(precioPublico);

    precios.value.forEach((item, index) => {
        preciosMetod.push(item);
    });



    let payload = {
        nombre: nombreProducto.value,
        presentacion: presentacionProducto.value,
        cantidad: cantidadProducto.value,
        tipoMascota: opcionRazaSeleccionada.value,
        precio: precioProducto.value,
        raza: '',
        precios: preciosMetod,
        peso: pesoProducto.value,
    };

    return payload;
};


const aceptar = () => {
    regresar();
};

const aceptarError = () => {
    loading.value = false;
    requestSent.value = false;
    hasErrror.value = false;
    errorMessage.value = '';
};

const regresar = () => {
    router.go(-1);
};






const clickEnDiv = () => {
    toggleSidebar();
};

onMounted(() => {
    id.value = route.params.id;
    getProducto();
    getImageUrl(id.value);

});


</script>