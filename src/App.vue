<template>

  
  <main>

    <div class="flex flex-col bg-white md:flex  md:flex-row">
      <div v-if="isLogged" class="w-full md:w-fit bg-bgBlue">
        <SideBar @cerrarSesion="cerrarSesion"></SideBar>
      </div>
      <div class="md:w-full md:h-[90vh] h-[90vh] bg-white" :class="{'bg-white' : isLogged }">
        <RouterView></RouterView>
      </div>
    </div> 
    

  </main>

</template>

<script setup>
import SideBar from './components/nav/SideBar.vue';
import {useMyStore} from '@/stores/store.js';
import { ref, watch, onMounted } from "vue";
import { useRouter } from 'vue-router';

const store = useMyStore();
const isLogged = ref(false);
const router = useRouter();

const goHome = () => {
    router.push({ name: 'home' })
}

const cerrarSesion = () => {
    localStorage.removeItem('token');
    store.logoutStore();
    isLogged.value = false; 
    router.push({ name: 'identificate' })
}

watch(
    () => store.loggedIn,
    () => {
        isLogged.value = store.loggedIn;
    }
)

onMounted(() => {
    let token = localStorage.getItem('token');
    console.log('token', token);  
    if (token) {
        isLogged.value = true;
        goHome();
    }else{
        router.push({ name: 'identificate' })}
})

</script>

<style>

</style>
