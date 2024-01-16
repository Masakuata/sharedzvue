<template>
  <h1 class="text-white absolute top-0 right-0 mr-2   text-xl font-semibold text-left mt-3">AGREGAR PRODUCTO</h1>
  <div @click="clickEnDiv" class="flex flex-col items-center p-4  w-full h-full md:h-full">
    <template v-if="!requestSent">
      <div class="w-full">
        <p class="w-full text-bgPurple font-semibold text-xl text-center">Registra un producto y comienza a registrar sus
          ventas</p>

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
        <input type="text" id="presentacionProducto" v-model="presentacionProducto" @input="validatePresentacionProdcuto"
          class="w-full mt-1 h-10 px-3 border border-solid border-blueLetters rounded-lg" />
        <template v-if="presentacionProducto.length > 0">
          <p class="text-green-600" v-if="presentacionProductoValid">Presentación válida</p>
          <p v-else class="text-red-600">La presentación del producto no es válida</p>
        </template>
        <p v-else-if="faltaPresentacionProducto" class="text-red-600">La presentacion del producto es un campo requerido
        </p>
      </div>

      <div class="flex flex-row items-center text-right">
        <p class="w-3/4 text-left text-lg font-semibold pr-3">Selecciona la cantidad en stock</p>
        <input v-model="cantidadProducto" class="w-1/4 h-10 border border-gray-400 rounded-lg mt-2 px-2">
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

      <div class="w-full mt-3 border border-gray-500 p-2 rounded-lg">
        <div class="flex flex-row w-full ">
          <label class="text-gray-700 mr-10 font-semibold w-1/2" for="checkbox">Precio detalle</label>
          <div class="w-1/2 text-right">
            <input type="checkbox" v-model="hasprecioDetalle"
              class="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500 " id="checkbox">
          </div>
        </div>

        <input type="text" :disabled="!hasprecioDetalle" id="precioProducto" v-model="precioDetalle"
          @input="validatePrecioDetalleProdcuto"
          class="w-full mt-1 h-10 px-3 border border-solid border-blueLetters rounded-lg" />

        <p v-if="hasprecioDetalle && faltaPrecioDetalle" class="text-red-600 w-full">El precio detalle está activado,
          espefícica un precio</p>

      </div>

      <div class="w-full mt-3 border border-gray-500 p-2 rounded-lg">
        <div class="flex flex-row w-full ">
          <label class="text-gray-700 mr-10 font-semibold w-1/2" for="checkboxMayo">Precio mayorista</label>
          <div class="w-1/2 text-right">
            <input type="checkbox" v-model="hasprecioMayorista"
              class="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500 " id="checkboxMayo">
          </div>

        </div>

        <input type="text" :disabled="!hasprecioMayorista" id="precioProducto" v-model="precioMayorista"
          @input="validatePrecioMayoristaProdcuto"
          class="w-full mt-1 h-10 px-3 border border-solid border-blueLetters rounded-lg" />

        <p v-if="hasprecioMayorista && faltaPrecioMayorista" class="text-red-600 w-full">El precio mayorista está
          activado, espefícica un precio</p>
      </div>

      <div class="mt-3 w-full">
        <ButtonX color="purple" @click="registrarProductoMetod">Registrar producto</ButtonX>
      </div>
    </template>
    <template v-else>
      <template v-if="loading">
        <div class="flex flex-row items-center h-[80vh]">
          <LoadingX message="Registrando producto..."></LoadingX>
        </div>

      </template>
      <template v-else>
        <template v-if="hasErrror">
          <div class="flex flex-row items-center h-[80vh]">
            <ErrorX :message="errorMessage" button-message="Aceptar" @aceptar="aceptarError"> </ErrorX>
          </div>
        </template>
        <template v-else>
          <div class="flex flex-row items-center h-[80vh] w-full">
            <SuccesX message="Producto registrado exitósamenta" button-message="Aceptar" @aceptar="aceptar"> </SuccesX>
          </div>
        </template>

      </template>

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


// Variables y metodos necesarios para tipoMascota
const opciones = [
  { value: 'perro', texto: 'Perro' },
  { value: 'gato', texto: 'Gato' },
];

const requestSent = ref(false);
const loading = ref(false);
const hasErrror = ref(false);
const errorMessage = ref('Error al registrar el producto');

const ID_PUBLICO = 1;
const ID_DETALLE = 2;
const ID_MAYORISTA = 3;

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
  console.log('Validando el precio del producto', precioInt);
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

//Variables y metodos para precio detalle
const precioDetalle = ref('');
const hasprecioDetalle = ref(false);
const precioDetalleValid = ref(false);
const faltaPrecioDetalle = ref(false);

watch(
  () => hasprecioDetalle.value,
  () => {
    if (!hasprecioDetalle.value) {
      precioDetalle.value = '';
    }
  },
);

const validatePrecioDetalleProdcuto = () => {
  precioDetalle.value = filtrarEntrada(precioDetalle.value);

  let precioDetalleInt = parseInt(precioDetalle.value);
  faltaPrecioDetalle.value = false;
  console.log('Validando el preciodetalle del producto', precioDetalleInt);
  if (precioDetalleInt > 0) {
    precioDetalleValid.value = true;
  } else {
    console.log('No es valido el precio detalle');
    precioDetalleValid.value = false;
  }

};

// Variables y metodos necesarios para validar precioMayorista
const precioMayorista = ref('');
const hasprecioMayorista = ref(false);
const precioMayoristaValid = ref(false);
const faltaPrecioMayorista = ref(false);

watch(
  () => hasprecioMayorista.value,
  () => {
    if (!hasprecioMayorista.value) {
      precioMayorista.value = '';
    }
  },
);

const validatePrecioMayoristaProdcuto = () => {
  precioMayorista.value = filtrarEntrada(precioMayorista.value);
  faltaPrecioMayorista.value = false;
  let precioMayoristaInt = parseInt(precioMayorista.value);

  if (precioMayoristaInt > 0) {
    precioMayoristaValid.value = true;
  } else {
    console.log('No es valido el precio detalle');
    precioMayoristaValid.value = false;
  }

};



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
  console.log('faltaPrecioProducto', faltaPrecioProducto.value);

  if (hasprecioDetalle.value) {
    faltaPrecioDetalle.value = precioDetalle.value.length === 0;
  }

  if (hasprecioMayorista.value) {
    faltaPrecioMayorista.value = precioMayorista.value.length === 0;
  }

};

const validateForm = () => {
  validateEmptyfields();

  if (
    nombreProductoValid.value &&
    presentacionProductoValid.value &&
    precioProductoValid.value &&
    precioDetalleValid.value &&
    precioMayoristaValid.value
  ) {

    console.log('El formulario es valido');
    return true;
  } else {
    console.log('El formulario no es valido');
    console.log('nombreProductoValid', nombreProductoValid.value);
    console.log('presentacionProductoValid', presentacionProductoValid.value);
    console.log('cantidadProductoValid', cantidadProductoValid.value);
    console.log('precioProductoValid', precioProductoValid.value);
    console.log('precioDetalleValid', precioDetalleValid.value);
    console.log('precioMayoristaValid', precioMayoristaValid.value);

    return false;
  }
};

const registrarProductoMetod = async () => {
  if (validateForm()) {
    let payload = buildPayload();

    try {
      loading.value = true;
      requestSent.value = true;
      await registrarProducto(payload);

      loading.value = false;

    } catch (error) {
      hasErrror.value = true;
      errorMessage.value = error.response.data.detail;
      console.log('Error al registrar el producto', error);
      loading.value = false;

      if (error.response.status === 409) {
        errorMessage.value = 'Ya existe un producto con ese nombre y descripción';
      } 
    }

  }

}


const buildPayload = () => {
  let precios = [];
  const precioPublico = {
    id: ID_PUBLICO,
    precio: precioProducto.value,
  };
  const precioDetallePay = {
    id: ID_DETALLE,
    precio: precioDetalle.value,
  };
  const precioMayoristaPay = {
    id: ID_MAYORISTA,
    precio: precioMayorista.value,
  };
  if (hasprecioDetalle.value) {
    precios.push(precioDetallePay);
  }
  if (hasprecioMayorista.value) {
    precios.push(precioMayoristaPay);
  }
  precios.push(precioPublico);

  let payload = {
    nombre: nombreProducto.value,
    presentacion: presentacionProducto.value,
    cantidad: cantidadProducto.value,
    tipoMascota: opcionRazaSeleccionada.value,
    precio: precioProducto.value,
    raza: '',
    precios: precios,
  };

  return payload;
};


const aceptar = () => {
  loading.value = false;
  requestSent.value = false;
  hasErrror.value = false;
  errorMessage.value = '';
  precioDetalle.value = '';
  precioMayorista.value = '';
  nombreProducto.value = '';
  presentacionProducto.value = '';
  cantidadProducto.value = '';
  precioProducto.value = '';
  hasprecioDetalle.value = false;
  hasprecioMayorista.value = false;
  opcionRazaSeleccionada.value = opciones[0].value;
};

const aceptarError = () => {
  loading.value = false;
  requestSent.value = false;
  hasErrror.value = false;
  errorMessage.value = '';
};






const clickEnDiv = () => {
  toggleSidebar();
};

onMounted(() => {
  opcionRazaSeleccionada.value = opciones[0].value;

});


</script>