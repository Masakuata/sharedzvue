<template>
    <div class="pt-10 pb-10  md:flex md:justify-center  md:h-[88vh] md:pt-0 md:pb-0 md:items-center md:w-screen">


        <div class="flex flex-col px-10 md:flex-row md:w-full">
            <div class="md:w-1/2">
                <h1 class="w-full text-center md:text-2xl md:text-center">
                    Comienza a organizar tus gastos grupales de manera automatizada
                </h1>

                <div class="flex justify-center">
                    <img src="@/assets/friends_transparent.png" alt="Descripción de la imagen" class="w-36 md:w-96" />
                </div>
            </div>



            <div class="md:w-1/2 md:px-10">
                <div class="flex">
                    <p @click="register" class="text-start w-1/2"
                        :class="isRegister ? 'text-blueLetters font-bold underline' : 'text-black'">Regístrate</p>
                    <p @click="login" class="text-end w-1/2"
                        :class="isLogin ? 'text-blueLetters font-bold underline' : 'text-black'">Iniciar Sesión</p>
                </div>

                <MainLogin v-if="isLogin"></MainLogin>
                <MainRegister v-if="isRegister"></MainRegister>

            </div>


        </div>





    </div>
</template>


<script setup>

import { ref, onMounted } from 'vue'
import MainLogin from '@/views/login/MainLogin.vue'
import MainRegister from '@/views/register/MainRegister.vue'


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



onMounted(() => {
    //cargar();
});

</script>