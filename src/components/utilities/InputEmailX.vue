<template>
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
</template>
<script setup>
import { ref, onMounted, watch, defineEmits, defineProps } from 'vue';



const email = ref('');
const emailValid = ref(false);
const faltaEmail = ref(false);

const props = defineProps({
    emailValid2: Function,
    faltaEmail: Boolean,
});

const emit = defineEmits(['validateEmail']);

const validarEmail = () => {
    faltaEmail.value = false;
    emailValid.value = validateEmail(email.value);
    emit('validateEmail', emailValid.value , email.value);
};
const validateEmail = (email) => {
    const regex = 
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return regex.test(email);
}

watch(
    () => email.value,
    () => {
        validarEmail();
    }
)

watch(
    () => props.faltaEmail,
    () => {
        faltaEmail.value = props.faltaEmail;
    }
)

</script>