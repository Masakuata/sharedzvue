<template>
  <h1 class="text-white absolute top-0 right-0 mr-2   text-xl font-semibold text-left mt-3">AGREGAR PRODUCTO</h1>
  <div @click="clickEnDiv" class="flex flex-col items-center p-4  w-full  overflow-scroll h-full md:h-full">
    <template v-if="sessionExpired">
      <ModalSesionExpired></ModalSesionExpired>
    </template>

    <template v-if="!internalError">
      <template v-if="!requestSent">
        <div class="w-full">
          <p class="w-full text-bgPurple font-semibold text-xl text-center">Registra un producto y comienza a registrar
            sus
            ventas</p>
          <p class="text-lg font-semibold mt-10">Selecciona la imagen de tu producto </p>
          <FileManagerX @set-image="agregarImagen"></FileManagerX>
          <label for="nombreProducto" class="block text-lg font-medium ">Nombre de producto</label>
          <input type="text" id="nombreProducto" v-model="nombreProducto" @input="validateNombreProdcuto"
            class="w-full mt-1 h-10 px-3 border border-solid border-blueLetters rounded-lg" />
          <template v-if="nombreProducto.length > 0">
            <p class="text-green-600" v-if="nombreProductoValid">Nombre Válido</p>
            <p v-else class="text-red-600">El nombre del producto no es válido</p>
          </template>
          <p v-else-if="faltaNombreProducto" class="text-red-600">El nombre del producto es un campo requerido</p>
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
          <p v-else-if="faltaPresentacionProducto" class="text-red-600">La presentacion del producto es un campo requerido
          </p>
        </div>

        <div class="flex flex-row items-center text-right  justify-center py-2">
          <p class="w-3/4 text-left text-lg font-semibold pr-3">Ingresa el peso del producto en kilogramos</p>
          <input v-model="pesoProducto" class="w-1/4 h-10 border border-blueLetters rounded-lg px-2">
        </div>
        <p v-if="faltaPesoProducto" class="text-red-600 w-full">El peso del producto es un campo requerido</p>

        <div class="flex flex-row items-center text-right">
          <p class="w-3/4 text-left text-lg font-semibold pr-3">Ingresa la cantidad en stock</p>
          <input v-model="cantidadProducto" class="w-1/4 h-10 border border-blueLetters rounded-lg mt-2 px-2">
        </div>
        <p v-if="faltaCantidadProducto" class="text-red-600 w-full">La cantidad de stock es un campo requerido</p>

        <label for="miSelect" class="block mb-2 text-lg font-semibold w-full text-left">Tipo de mascota</label>
        <div class="w-full h-12">
          <select v-model="opcionRazaSeleccionada" id="miSelect"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            <option disabled value="">Selecciona una opción</option>
            <option class="w-full" v-for="opcion in opciones" :key="opcion.value" :value="opcion.value">{{ opcion.texto
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

        <p class="text-lg font-semibold w-full text-center">Si el producto tendrá varios precios dependiendo el tipo de
          cliente, agrégalos</p>
        <div class="w-full">
          <SearchTipoCliente v-if="!sessionExpired" :tipos-clientes-seleccionados="precios" @error="errorAlBuscarTipos">
          </SearchTipoCliente>
        </div>

        <div class="flex flex-row mt-3 mb-5 w-full">
          <div class="w-1/2 px-2">
            <ButtonX color="red" @click="regresar">Regresar</ButtonX>
          </div>
          <div class="w-1/2 px-2">
            <ButtonX color="purple" @click="registrarInformacion">Registrar producto</ButtonX>
          </div>
        </div>

        
      </template>
      <template v-else>
        <template v-if="loading">
          <div class="flex flex-row items-center h-[80vh]">
            <LoadingX message="Registrando producto..."></LoadingX>
          </div>

        </template>
        <template v-else>
          <div class="flex flex-row items-center h-[80vh] w-full">
            <SuccesX message="Producto registrado exitósamente" button-message="Aceptar" @aceptar="aceptar"> </SuccesX>
          </div>
        </template>

      </template>
    </template>
    <template v-else>
      <ErrorX @aceptar="regresar"></ErrorX>
    </template>


  </div>
</template>


<script setup>
import { ref, onMounted, watch } from 'vue';
import { toggleSidebar } from '@/utils/sidebarManager.js';
import ButtonX from '@/components/utilities/ButtonX.vue';
import { filtrarEntrada } from '@/utils/validator.js';
import { registrarProducto } from '@/api/api.js';
import LoadingX from '@/components/utilities/LoadingX.vue';
import SuccesX from '@/components/utilities/SuccesX.vue';
import ErrorX from '@/components/utilities/ErrorX.vue';
import { useRouter } from 'vue-router';
import SearchTipoCliente from './selectTipoCliente/SearchTipoCliente.vue';
import ModalSesionExpired from '@/components/utilities/ModalSesionExpired.vue';
import FileManagerX from '@/components/utilities/FileManagerX.vue';

import { storage } from '@/firebase.js';
import { ref as fireRef, uploadBytes } from 'firebase/storage';


const subirimagen = async (id) => {
  const path = process.env.VUE_APP_FIREBASE_PATH + id + '.png';
  const storageRef = fireRef(storage, path)
  uploadBytes(storageRef, imageData.value).then((snapshot) => {
    console.log('Uploaded a blob or file!');
  });
}


const router = useRouter();

const imageData = ref(null);

const agregarImagen = (file) => {
  console.log(file);
  imageData.value = file;
};

const internalError = ref(false);
const sessionExpired = ref(false);

const precios = ref([]);

// Variables y metodos necesarios para tipoMascota
const opciones = [
  { value: 'perro', texto: 'Perro' },
  { value: 'gato', texto: 'Gato' },
];

const requestSent = ref(false);
const loading = ref(false);

const errorMessage = ref('Error al registrar el producto');

const ID_PUBLICO = 1;


const opcionRazaSeleccionada = ref('');


//Variables y metodos necesarios para validasr el peso del producto
const pesoProducto = ref('');
const pesoProductoValid = ref(false);
const faltaPesoProducto = ref(false);
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
    precioProductoValid.value
  ) {

    return true;
  } else {
    return false;
  }
};

let idProducto = 0;

const registrarInformacion = async () => {
  await registrarProductoMetod();
  if (imageData.value !== null) {
    subirimagen(idProducto);
  } else {
    console.log('No se subio la imagen');
  }
};

const registrarProductoMetod = async () => {
  if (validateForm()) {
    let payload = buildPayload();

    try {
      loading.value = true;
      requestSent.value = true;
      const response = await registrarProducto(payload);
      idProducto = response.data.id;



      loading.value = false;

    } catch (error) {
      console.log('Error al registrar el producto', error);
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
const errorAlBuscarTipos = (error) => {
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
};

const regresar = () => {
  router.go(-1);
};


const buildPayload = () => {
  let preciosMetod = [];
  const precioPublico = {
    id: ID_PUBLICO,
    precio: precioProducto.value,
  };

  precios.value.forEach((item) => {
    let precioAux = {
      id: item.id,
      precio: item.precio,
    };
    preciosMetod.push(precioAux);
  });

  preciosMetod.push(precioPublico);

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
  loading.value = false;
  requestSent.value = false;
  errorMessage.value = '';
  nombreProducto.value = '';
  presentacionProducto.value = '';
  cantidadProducto.value = '';
  precioProducto.value = '';
  opcionRazaSeleccionada.value = opciones[0].value;
  precios.value = [];
  pesoProducto.value = '';
};

const aceptarError = () => {
  loading.value = false;
  requestSent.value = false;
  errorMessage.value = '';
};






const clickEnDiv = () => {
  toggleSidebar();
};

onMounted(() => {
  opcionRazaSeleccionada.value = opciones[0].value;

});


</script>