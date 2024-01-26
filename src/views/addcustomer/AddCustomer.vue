<template>
    <h1 class="text-white absolute top-0 right-0 mr-2   text-xl font-semibold text-left mt-3">CLIENTES</h1>

    <div @click="closeSidebar" class="flex flex-col items-center p-4  w-full h-full md:h-full">

        <div class="flex flex-row">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-user-round-plus w-10 h-10 text-bgBlue">
                <path d="M2 21a8 8 0 0 1 13.292-6" />
                <circle cx="10" cy="8" r="5" />
                <path d="M19 16v6" />
                <path d="M22 19h-6" />
            </svg>
            <p class="w-full ml-2 text-lg">Registra un cliente y comienza a registrar sus compras</p>
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
                <SelectX :elementos="tiposFormato" @selectItem="seleccionarTipo" ></SelectX>
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
        
        <label class="w-full text-start mt-3 mb-1 text-sm font-medium text-bgBlue">Agrega la/las direcciones del cliente </label>
        
        <div class="w-full">
            <AlertX :flag="faltaDirecciones" message="Agrega al menos una dirección por favor" ></AlertX>
        </div>    
        <template v-if="isVisibleMultiAdress">
            <MultiRegistAddressX @update-items="actualizarDirecciones" :switch="switchMultiAdress"></MultiRegistAddressX>
        </template>
        

        <div class="w-full mt-3">
            <ButtonX color="blue" :is-loading="loading" @click="resgistrarCliente">Registrar Cliente</ButtonX>
        </div>

        <div class="w-full mt-3">
            <ButtonX color="red" @click="regresarVistaClientes">Regresar</ButtonX>
        </div>







    </div>
</template>
    
<script setup>
import { ref, onMounted, watch } from 'vue';
import { toggleSidebar } from '@/utils/sidebarManager.js';
import { validateEmail, validateName, validateRFC } from '@/utils/validator.js'
import { postCliente } from '@/api/api.js';
import ButtonX from '@/components/utilities/ButtonX.vue';
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';
import SelectX from '@/components/utilities/SelectX.vue';
import {getTiposCliente} from '@/api/api.js';
import MultiRegistAddressX from '@/components/utilities/MultiRegistAddressX.vue';
import AlertX from '@/components/utilities/AlertX.vue';


const router = useRouter();

const tipos = ref([]);
const tiposFormato = ref([]);
const direcciones = ref([]);

const isVisibleMultiAdress = ref(true);
const switchMultiAdress = ref(false);   

const actualizarDirecciones = (direccionesEmit) => {
    faltaDirecciones.value = false;
    direcciones.value = direccionesEmit;
};

const getTipos = async () => {
    try {
        const response = await getTiposCliente();
        tipos.value = response.data;
        formatearTipos();
    } catch (error) {
        console.log(error);
    }
}

const seleccionarTipo = (elemento) =>{
    tipoClienteSelected.value = elemento;
    
}

const formatearTipos =( ) =>{
    tipos.value.forEach(element => {
        tiposFormato.value.push({value:element.id,text:element.tipoCliente});
    });
    
}


const tiposCliente = [
    { value: 1, name: 'Público' },
    { value: 2, name: 'Detalle' },
    { value: 3, name: 'Mayorista' },
];

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
    //faltaRfc.value = rfc.length === undefined;
    //faltaTelefono.value = telefono.length === undefined;

    return nameValid.value && validateDirecciones();
}

const faltaDirecciones = ref(false);


const validateDirecciones = () => {
    faltaDirecciones.value = !(direcciones.value.length > 0);
    return !faltaDirecciones.value;
}

const resgistrarCliente = () => {
    if (validateForm()) {
        let direccionesAux = []
        direcciones.value.forEach(element => {
            direccionesAux.push(element.valor);
        });

        let cliente = {
            email: email.value,
            nombre: name.value,
            RFC: rfc.value,
            direcciones: direccionesAux,
            telefono: telefono.value,
            tipoCliente: tipoClienteSelected.value.value,
        }
        postClienteMetod(cliente);
    }
}

const postClienteMetod = async (cliente) => {
    loading.value = true;
    try {
        await postCliente(cliente);
        notify();
        cleanfields();
    } catch (error) {
        console.log(error);
        if (error.response.status === 409) {
            toast("El cliente ya existe", {
                type: 'error',
                autoClose: 2000,
            });
        } else {
            toast("Error al registrar el cliente", {
                type: 'error',
                autoClose: 2000,
            });
        }

    }
    loading.value = false;
};

const regresarVistaClientes = () => {
    router.go(-1) ;
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
    switchMultiAdress.value = !switchMultiAdress.value;
}



onMounted(() => {
    getTipos();
});

</script>