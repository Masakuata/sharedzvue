<template>
    <div class="flex flex-col w-full pt-10">

        <div>
            <form @submit.prevent="submitForm" class="space-y-4">
                <div>
                    <label for="nickname" class="block text-sm font-medium text-gray-700">Nickname</label>
                    <input type="text" id="nickname" v-model="nickname" @input="validateNickname"
                        class="w-full mt-1 h-10 px-3 border border-solid border-blueLetters rounded-lg" />
                    <template v-if="nickname.length > 0">
                        <p class="text-green-600" v-if="nicknameValid">Nickname Válido</p>
                        <p v-else class="text-red-600">El nickname no es Válido</p>
                    </template>
                    <p v-else-if="faltaNickname" class="text-red-600">El nickname es un campo requerido</p>
                </div>

                <div>
                    <label for="correo" class="block text-sm font-medium text-gray-700">Correo</label>
                    <input  id="correo" v-model="email" @input="validarEmail"
                        class="w-full mt-1 h-10 px-3 border border-solid border-blueLetters rounded-lg" />
                    <template v-if="email.length > 0">
                        <p class="text-green-600" v-if="emailValid">Email Válido</p>
                        <p v-else class="text-red-600">El correo no es válido</p>
                    </template>
                    <p v-else-if="faltaEmail" class="text-red-600">El correo es un campo requerido</p>
                </div>

                <div>
                    <label for="contraseniaComp" class="block text-sm font-medium text-gray-700">Contraseña</label>
                    <div class="relative">
                        <input :type="showPassword ? 'text' : 'password'" id="contraseniaComp"
                            class="w-full mt-1 h-10 px-3 border border-solid border-blueLetters rounded-lg"
                            v-model="password"  @input="validarPassword" placeholder="Contraseña">
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
                <div>
                    <label for="contraseniaConf" class="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
                    <div class="relative">
                        <input :type="showPasswordConfirm ? 'text' : 'password'" id="contraseniaConf"
                            class="w-full mt-1 h-10 px-3 border border-solid border-blueLetters rounded-lg"
                            v-model="passwordConfirm"  @input="validatePasswordConfirm" placeholder="Contraseña">
                        <button type="button" class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                            @click="showPasswordConfirm = !showPasswordConfirm">
                            <template v-if="showPasswordConfirm">
                                <img src="@/assets/eye.svg" class="h-6 w-6" alt="Toggle password visibility">
                            </template>
                            <template v-else>
                                <img src="@/assets/eye-off.svg" class="h-6 w-6" alt="Toggle password visibility">
                            </template>
                        </button>
                    </div>
                    <template v-if="passwordConfirm.length > 0">
                        <p class="text-green-600" v-if="passwordConfirmValid">Contraseña Válida</p>
                        <p v-else class="text-red-600">{{ mensajeErrorPasword }}</p>
                    </template>
                    <p v-else-if="faltaPasswordConfirm" class="text-red-600">El confirmar contraseña es un campo requerido</p>
                </div>

                <div class="flex pt-5">
                    <button type="submit" class="w-full bg-redCancel h-12 rounded-lg text-white font-semibold text-lg mr-1">
                        Cancelar
                    </button>

                    <button type="submit"
                        class="w-full bg-primaryBlue h-12 rounded-lg text-white font-semibold text-lg ml-1">
                        Registrarse
                    </button>

                </div>


            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { validateEmail, validatePassword, validateName } from '@/utils/validator.js'
import { registrarUsuario } from '@/api/api.js'
import axios from 'axios';


const email = ref('');
const emailValid = ref(false);
const faltaEmail = ref(false);


const nickname = ref('');
const nicknameValid = ref(false);
const faltaNickname = ref(false);

const password = ref('');
const passwordValid = ref(false);
const showPassword = ref(false);
const faltaPassword = ref(false);

const passwordConfirm = ref('');
const passwordConfirmValid = ref(false);
const showPasswordConfirm = ref(false);
const faltaPasswordConfirm = ref(false);

const mensajeErrorPasword = ref('');



const validateForm = () => {
    faltaEmail.value = email.length === undefined;
    faltaPassword.value = password.length === undefined;
    faltaPasswordConfirm.value = passwordConfirm.length === undefined;
    faltaNickname.value = nickname.length === undefined;
    
    return emailValid.value && passwordValid.value && passwordConfirmValid.value && nicknameValid.value;
};

const submitForm = () => {
    if (validateForm()) {
        let miembro = {
            username: nickname.value,
            email: email.value,
            password: password.value
        }
        postUsuario(miembro);
    } else {
        console.log('Errores en el formulario:');
    }
};

const postUsuario = async (miembro) => {
    let respuesta = await registrarUsuario(miembro);
    console.log('Respuesta del servidor:');
    
    console.log(respuesta);
}

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

const validatePasswordConfirm = () => {
    faltaPasswordConfirm.value = false;
    if (passwordConfirm.value !== password.value) {
        passwordConfirmValid.value = false;
        mensajeErrorPasword.value = 'Las contraseñas no coinciden';
        return;
    }
    passwordConfirmValid.value = validatePassword(passwordConfirm.value);
    if (!passwordConfirmValid.value) {
        mensajeErrorPasword.value = 'La contraseña debe tener al menos 6 caracteres';
    }
};

const validarNickname = () => {
    faltaNickname.value = false;
    nicknameValid.value = validateName(nickname.value);
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

watch(
    () => passwordConfirm.value,
    () => {
        validatePasswordConfirm();
    }
)

watch(
    () => nickname.value,
    () => {
        validarNickname();
    }
)

</script>
