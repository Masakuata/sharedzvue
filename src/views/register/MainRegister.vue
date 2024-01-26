<template>
    <div class="flex flex-col w-full pt-10">

        <div>
            <form @submit.prevent="submitForm" class="space-y-4">
                <div>
                    <label for="nickname" class="block text-sm font-medium text-white">Nickname</label>
                    <input type="text" id="nickname" v-model="nickname" @input="validateNickname"
                        class="w-full mt-1 h-10 px-3 border border-solid border-blueLetters rounded-lg" />
                    <template v-if="nickname.length > 0">
                        <p class="text-green-600" v-if="nicknameValid">Nickname Válido</p>
                        <p v-else class="text-red-600">El nickname no es Válido</p>
                    </template>
                    <p v-else-if="faltaNickname" class="text-red-600">El nickname es un campo requerido</p>
                </div>

                <div>
                    <label for="correo" class="block text-sm font-medium text-white">Correo</label>
                    <input id="correo" v-model="email" @input="validarEmail"
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
                <div>
                    <label for="contraseniaConf" class="block text-sm font-medium text-white">Confirmar Contraseña</label>
                    <div class="relative">
                        <input :type="showPasswordConfirm ? 'text' : 'password'" id="contraseniaConf"
                            class="w-full mt-1 h-10 px-3 border border-solid border-blueLetters rounded-lg"
                            v-model="passwordConfirm" @input="validatePasswordConfirm" placeholder="Contraseña">
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
                    <p v-else-if="faltaPasswordConfirm" class="text-red-600">El confirmar contraseña es un campo requerido
                    </p>
                </div>

                <div class="flex pt-5">
                    <ButtonX :isLoading="loading" @click="submitForm">Registrarse</ButtonX>

                </div>


            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, defineEmits } from 'vue'
import { validateEmail, validatePassword, validateName } from '@/utils/validator.js'
import { registrarUsuario, login } from '@/api/api.js'
import ButtonX from '@/components/utilities/ButtonX.vue';
import { useRouter } from 'vue-router';
import { useMyStore } from '@/stores/store.js';
import { toast } from 'vue3-toastify';


const emit = defineEmits(['userRegistered']);



const { loginStore } = useMyStore();


const router = useRouter();

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

const loading = ref(false);




const validateForm = () => {
    faltaEmail.value = email.length === undefined;
    faltaPassword.value = password.length === undefined;
    faltaPasswordConfirm.value = passwordConfirm.length === undefined;
    faltaNickname.value = nickname.length === undefined;

    return emailValid.value && passwordValid.value && passwordConfirmValid.value && nicknameValid.value;
};

const submitForm = () => {
    
    if (validateForm()) {
        loading.value = true;
        let miembro = {
            username: nickname.value,
            email: email.value,
            password: password.value
        }
        postUsuario(miembro);
    }
};

const postUsuario = async (miembro) => {
    try {
        await registrarUsuario(miembro);
        loading.value = false;
        notify("Te has registrado exitosamente, ahora inicia sesión", "success");
        emit('user-registered', true);
        router.push({ name: 'identificate', params: { vista: 'login' } });

    } catch (error) {
        loading.value = false;
        emit('user-registered', false);
        console.log(error);
        if (error.response.status === 409) {
            notify("Ya existe una cuenta vinculada al mismo correo.", "error");
        } 
    }






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

const notify = (message , type) => {
    toast(message, {
        type: type,
        autoClose: 2000,
    });
}

</script>
