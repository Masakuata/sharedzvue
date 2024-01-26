<template>
    <h1 class="text-white absolute top-0 right-0 mr-2   text-xl font-semibold text-left mt-3">ACTUALIZAR CLIENTE</h1>

    <div @click="closeSidebar" class="flex flex-col items-center p-4  w-full overflow-scroll">
        <template v-if="firstLoading">
            <div class="w-full h-96 flex flex-col items-center justify-center">
                <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-bgBlue"></div>
                <p class="text-xl font-bold text-gray-900">Cargando...</p>
            </div>

        </template>
        <template v-else>
            <div class="flex flex-row w-full text-left items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-user-round-plus w-10 h-10 text-bgBlue">
                    <path d="M2 21a8 8 0 0 1 13.292-6" />
                    <circle cx="10" cy="8" r="5" />
                    <path d="M19 16v6" />
                    <path d="M22 19h-6" />
                </svg>
                <p class="w-full  ml-2 text-lg">Actualiza la información del cliente</p>
            </div>

            <div class="w-full">
                <label for="name" class="block text-sm font-medium text-bgBlue">Nombre</label>
                <input id="name" v-model="name" @input="validateName"
                    class="w-full mt-1 h-10 px-3 border border-solid border-blueLetters rounded-lg" />
                <template v-if="name.length > 0">
                    <p class="text-green-600" v-if="nameValid">Nombre válido</p>
                    <p v-else class="text-red-600">Ingresa un nombre valido</p>
                </template>
                <p v-else-if="faltaName" class="text-red-600">El nombre es un campo requerido</p>
            </div>



            <label class="block text-sm font-medium text-bgBlue w-full text-left">Tipo de cliente</label>
            <template v-if="tiposFormato.length > 0">
                <div class="w-full">
                    <SelectX :elementos="tiposFormato" @selectItem="seleccionarTipo" :value-item-selected="tipoCliente">
                    </SelectX>
                </div>
            </template>



            <div class="w-full">
                <label for="correo" class="block text-sm font-medium text-bgBlue">Correo</label>
                <input type="email" id="correo" v-model="email" @input="validateEmail"
                    class="w-full mt-1 h-10 px-3 border border-solid border-blueLetters rounded-lg" />
                <template v-if="email.length > 0">
                    <p class="text-green-600" v-if="emailValid">Email Válido</p>
                    <p v-else class="text-red-600">El correo no es válido</p>
                </template>
                <p v-else-if="faltaEmail" class="text-red-600">El correo es un campo requerido</p>
            </div>

            <div class="w-full">
                <label for="rfc" class="block text-sm font-medium text-bgBlue">RFC</label>
                <input id="rfc" v-model="rfc" @input="validateRFC" maxlength="13"
                    class="w-full mt-1 h-10 px-3 border border-solid border-blueLetters rounded-lg" />
                <template v-if="rfc.length > 0">
                    <p class="text-green-600" v-if="rfcValid">RFC válido</p>
                    <p v-else class="text-red-600">Ingresa un RFC valido</p>
                </template>
                <p v-else-if="faltaRfc" class="text-red-600">El RFC es un campo requerido</p>
            </div>



            <div class="w-full">
                <label for="telefono" class="block text-sm font-medium text-bgBlue">Teléfono</label>
                <input id="telefono" type="tel" v-model="telefono" maxlength="14"
                    class="w-full mt-1 h-10 px-3 border border-solid border-blueLetters rounded-lg" />
                <template v-if="telefono.length > 0">
                    <p class="text-green-600" v-if="telefonoValid">Teléfono válido</p>
                    <p v-else class="text-red-600">Ingresa un teléfono válido</p>
                </template>
                <p v-else-if="faltaTelefono" class="text-red-600">La dirección es un campo requerido</p>
            </div>
            <div class="mt-3 w-full">
                <p class="text-sm font-medium text-bgBlue pb-1">Agrega, elimina o edita sus direcciones</p>
                <AlertX :flag="faltanDirecciones" message="El cliente debe tener al menos una direccion registrada"></AlertX>
                <MultiEditAddressX  @actualizarDireccion="actualizarDireccion" @deleleItem="eliminarDireccion" @update-items="actualizarDirecciones" :direcciones="direcciones" :id-cliente="idCliente" :switch="switchMultiAddress">
                </MultiEditAddressX>
            </div>


            <div class="w-full mt-3">
                <ButtonX color="blue" :is-loading="loading" @click="resgistrarCliente">Registrar Cliente</ButtonX>
            </div>

            <div class="w-full mt-3">
                <ButtonX color="red" @click="regresarVistaClientes">Regresar</ButtonX>
            </div>


        </template>









    </div>
</template>
    
<script setup>
import { ref, onMounted, watch } from 'vue';
import { toggleSidebar } from '@/utils/sidebarManager.js';
import { validateEmail, validateName, validateRFC } from '@/utils/validator.js'
import { putCliente } from '@/api/api.js';
import ButtonX from '@/components/utilities/ButtonX.vue';
import { toast } from 'vue3-toastify';
import { useRouter, useRoute } from 'vue-router';
import SelectX from '@/components/utilities/SelectX.vue';
import { getTiposCliente, getCliente, deleteDireccion, updateDireccion } from '@/api/api.js';
import MultiEditAddressX from '@/components/utilities/MultiEditAddressX.vue';
import AlertX from '@/components/utilities/AlertX.vue';



const switchMultiAddress = ref(false);
const direcciones = ref([]);

const faltanDirecciones = ref(false);

const direccionesEliminar = ref([]);
const errorEliminarDirecciones = ref(false);  

const direccionesActualizar = ref([]);
const errorActualizarDirecciones = ref(false);

const actualizarDirecciones = (direccionesEmit) => {
    direcciones.value = direccionesEmit;
}

const eliminarDireccion = (direccion) => {;
    direccionesEliminar.value.push(direccion.id);
    console.log(direccionesEliminar.value);
}

const eliminarDireccionesServer = async () => {
    try {
        direccionesEliminar.value.forEach(async (element) => {
            await deleteDireccion(idCliente.value, element);
        });
    } catch (error) {
        errorEliminarDirecciones.value = true;
        console.log(error);
    }
}
const actualizarDireccionesServer = async () => {
    try {
        direccionesActualizar.value.forEach(async (element) => {
            await updateDireccion(idCliente.value, element);
        });
    } catch (error) {
        errorActualizarDirecciones.value = true;
        console.log(error);
    }
}

const actualizarDireccion = ( direccion) => {
    let direccionAux = {
        id: direccion.id,
        direccion: direccion.valor,
    }
    direccionesActualizar.value.push(direccionAux); 
    console.log(direccionesActualizar.value);
}






const firstLoading = ref(false);

const idCliente = ref(0);
const router = useRouter();
const route = useRoute();

const tipoCliente = ref(0);

const tipos = ref([]);
const tiposFormato = ref([]);

const getTipos = async () => {
    try {
        const response = await getTiposCliente();
        tipos.value = response.data;

        formatearTipos();
    } catch (error) {
        console.log(error);
    }
}

const seleccionarTipo = (elemento) => {
    tipoClienteSelected.value = elemento;

}

const formatearTipos = () => {
    tipos.value.forEach(element => {
        tiposFormato.value.push({ value: element.id, text: element.tipoCliente });
    });

    console.log(tiposFormato.value);

}



const tipoClienteSelected = ref({});



const loading = ref(false);

const email = ref('');
const emailValid = ref(false);
const faltaEmail = ref(false);

const name = ref('');
const nameValid = ref(false);
const faltaName = ref(false);

const rfc = ref('');
const rfcValid = ref(false);
const faltaRfc = ref(false);


const faltaDireccion = ref(false);

const telefono = ref('');
const telefonoValid = ref(false);
const faltaTelefono = ref(false);



const closeSidebar = () => {
    toggleSidebar();
};



const validarName = () => {
    faltaName.value = false;
    nameValid.value = validateName(name.value);
};

const validarRFC = () => {
    faltaRfc.value = false;
    rfc.value = rfc.value.replace(/[^A-Za-z0-9]/g, '');
    rfc.value = rfc.value.toUpperCase();

    rfcValid.value = validateRFC(rfc.value);
};
const validarEmail = () => {
    faltaEmail.value = false;
    emailValid.value = validateEmail(email.value);
};

const validarTelefono = () => {
    faltaTelefono.value = false;
    telefono.value = telefono.value.replace(/\D/g, '');
    telefono.value = telefono.value.replace(/(\d{2})(?=\d)/g, '$1-');
    telefonoValid.value = telefono.value.length === 14;
};



watch(
    () => name.value,
    () => {
        validarName();
    }
)
watch(
    () => rfc.value,
    () => {
        validarRFC();
    }
)
watch(
    () => email.value,
    () => {
        validarEmail();
    }
)



watch(
    () => telefono.value,
    () => {
        validarTelefono();
    }
)

const validateForm = () => {
    //faltaEmail.value = email.length === undefined;
    faltaName.value = name.length === undefined;
    faltanDirecciones.value = direcciones.value.length === 0;
    //faltaRfc.value = rfc.length === undefined;


    //faltaTelefono.value = telefono.length === undefined;

    return nameValid.value && !faltanDirecciones.value;
}

const resgistrarCliente = () => {
    if (validateForm()) {
        let cliente = {
            email: email.value,
            nombre: name.value,
            RFC: rfc.value,
            telefono: telefono.value,
            tipoCliente: tipoClienteSelected.value.value,
        }
        actualizarCliente(cliente);
    }
}

const actualizarCliente = async (cliente) => {
    let pudoActualizarCliente = false;
    loading.value = true;
    let id = route.params.id;
    try {
        await putCliente(id, cliente);
        pudoActualizarCliente = true;
        
    } catch (error) {
        console.log(error);
        if (error.response.status === 409) {
            toast("Existe otro cliente con la misma informacion", {
                type: 'error',
                autoClose: 2000,
            });
        } else {
            toast("Error al actualizar el cliente", {
                type: 'error',
                autoClose: 2000,
            });
        }

    }

    if (pudoActualizarCliente) {
        await eliminarDireccionesServer();
        await actualizarDireccionesServer();
        notify();
        cleanfields();
    }
    loading.value = false;
};

const regresarVistaClientes = () => {
    router.go(-1);
}

const notify = () => {
    toast("Cliente registrado exitosamente", {
        type: 'success',
        autoClose: 2000,
    });
}

const cleanfields = () => {
    email.value = '';
    name.value = '';
    rfc.value = '';
    telefono.value = '';
}

const obternerCliente = async (id) => {
    try {
        firstLoading.value = true;
        const response = await getCliente(id);
        await getTipos();
        llenarCampos(response.data);


        firstLoading.value = false;
        console.log(response);
    } catch (error) {
        firstLoading.value = false;
        console.log(error);
    }
}

const llenarCampos = (cliente) => {
    email.value = cliente.email;
    name.value = cliente.nombre;
    rfc.value = cliente.RFC;
    telefono.value = cliente.telefono;
    //tipoClienteSelected.value = cliente.tipoCliente;
    tipoCliente.value = cliente.tipoCliente;
    idCliente.value = route.params.id;

    cliente.direcciones.forEach(element => {
        let dirAux = {
            id: element.id,
            valor: element.direccion,
        }
        direcciones.value.push(dirAux);
    });

}





onMounted(() => {

    const id = route.params.id;
    console.log(id);
    obternerCliente(id);
});

</script>