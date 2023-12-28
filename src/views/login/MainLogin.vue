<template>
    <div class="flex flex-col w-full pt-10 md:w-full ">

        <div>
            <form @submit.prevent="submitForm" class="space-y-4">
                <div>
                    <label for="correo" class="block text-sm font-medium text-white">Correo</label>
                    <input type="email" id="correo" v-model="email" @input="validateEmail"
                        class="w-full mt-1 h-10 px-3 border border-solid border-blueLetters rounded-lg" />
                    <template v-if="email.length > 0">
                        <p class="text-green-600" v-if="emailValid">Email Válido</p>
                        <p v-else class="text-red-600">El correo no es válido</p>
                    </template>
                    <p v-else-if="faltaEmail" class="text-red-600">El correo es un campo requerido</p>
                </div>

                <div>
                    <label for="contraseniaComp" class="block text-sm font-medium text-white">Contraseña</label>
                    <div class="relative">
                        <input :type="showPassword ? 'text' : 'password'" id="contraseniaComp"
                            class="w-full mt-1 h-10 px-3 border border-solid border-blueLetters rounded-lg"
                            v-model="password" @input="validarPassword" placeholder="Contraseña">
                        <button type="button" class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                            @click="showPassword = !showPassword">
                            <template v-if="showPassword">
                                <img src="@/assets/eye.svg" class="h-6 w-6" alt="Toggle password visibility">
                            </template>
                            <template v-else>
                                <img src="@/assets/eye-off.svg" class="h-6 w-6" alt="Toggle password visibility">
                            </template>
                        </button>
                    </div>
                    <template v-if="password.length > 0">
                        <p class="text-green-600" v-if="passwordValid">Contraseña Válida</p>
                        <p v-else class="text-red-600">{{ mensajeErrorPasword }}</p>
                    </template>
                    <p v-else-if="faltaPassword" class="text-red-600">La contraseña es un campo requerido</p>
                </div>


                <div class="flex pt-5">
                    <ButtonX :isLoading="loading" 
                    @click="iniciarSesion">Iniciar</ButtonX>
                </div>

            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { validateEmail, validatePassword } from '@/utils/validator.js'
import ButtonX from '@/components/utilities/ButtonX.vue';
import {useMyStore} from '@/stores/store.js';
import { useRouter } from 'vue-router'
import { login } from '@/api/api.js'


const router = useRouter();
const {loginStore, logoutStore} = useMyStore();

const showPassword = ref(false);

const loading = ref(false);

const email = ref('');
const emailValid = ref(false);
const faltaEmail = ref(false);

const password = ref('');
const passwordValid = ref(false);
const faltaPassword = ref(false);
const mensajeErrorPasword = ref('');

const validarEmail = () => {
    faltaEmail.value = false;
    emailValid.value = validateEmail(email.value);
};

const validarPassword = () => {

    faltaPassword.value = false;
    passwordValid.value = validatePassword(password.value);
    if (!passwordValid.value) {
        mensajeErrorPasword.value = 'La contraseña debe tener al menos 6 caracteres';
    }
};

watch(
    () => email.value,
    () => {
        validarEmail();
    }
)

watch(
    () => password.value,
    () => {
        validarPassword();
    }
)


const validateForm = () => {
    faltaPassword.value = password.length === undefined;
    faltaEmail.value = email.length === undefined;

    return emailValid.value && passwordValid.value;
};



const iniciarSesion = () => {
    console.log('Clic en iniciar sesion');
    if (validateForm()) {

        let miembro = {
            email: email.value,
            password: password.value
        }
        loginUsuario(miembro);
    } else {
        console.log('Errores en el formulario:');
    }
};

const loginUsuario = async (miembro) => {
    loading.value = true;
    let respuesta = {}
    try {
        respuesta = await login(miembro);
    } catch (error) {
        console.log('Error en loginUsuario');
        console.log(error);
    }
    
    
    //console.log('Respuesta del servidor:');
    //console.log(respuesta);
    setTimeout(() => {
        loading.value = false;
        localStorage.setItem('token', '1234567890');
        loginStore();
        router.push({ name: 'home' })

    }, 3000);
    
}


const cancelar = () => {
    console.log('Clic en cancelar');    
    logoutStore();
}



</script>
