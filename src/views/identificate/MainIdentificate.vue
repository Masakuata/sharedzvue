<template>
    <div
        class="pt-10 pb-10 bg-bgBlue md:bg-bgBlue md:flex md:justify-center  md:h-[100vh] md:pt-0 md:pb-0 md:items-center md:w-full">

        <div class="flex flex-col px-10 md:flex-row md:w-full">
            <div class="md:w-1/2">
                <h1 class="w-full text-center md:text-2xl md:text-center text-white">
                    Comienza a organizar tus ventas e inventario de manera automatizada
                </h1>

                <div class="flex justify-center">
                    <img src="@/assets/pet-icon.svg" alt="Descripción de la imagen" style="width: 600px; height: auto;" />
                </div>
            </div>



            <div class="md:w-1/2 md:px-10">
                <div class="flex">
                    <p @click="register" class="text-start w-1/2"
                        :class="isRegister ? 'text-white font-bold underline' : 'text-white'">Regístrate</p>
                    <p @click="login" class="text-end w-1/2"
                        :class="isLogin ? 'text-white font-bold underline' : 'text-white'">Iniciar Sesión</p>
                </div>

                <MainLogin v-if="isLogin"></MainLogin>
                <MainRegister v-if="isRegister" @user-registered="userRegistered"></MainRegister>

            </div>


        </div>





    </div>
</template>


<script setup>

import { ref, onMounted } from 'vue'
import MainLogin from '@/views/login/MainLogin.vue'
import MainRegister from '@/views/register/MainRegister.vue'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';




const isLogin = ref(true);
const isRegister = ref(false);



const login = () => {
    isLogin.value = true;
    isRegister.value = false;
}
const register = () => {
    isLogin.value = false;
    isRegister.value = true;
}

const userRegistered = () => {
    login();
    notify();
}

const notify = () => {
    toast("Te has registrado exitosamente, ahora inicia sesión", {
        type: 'success',
        autoClose: 2000,
    });
}



onMounted(() => {
});

</script>