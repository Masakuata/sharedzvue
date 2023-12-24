<template>

  
  <main>

    <div class="flex flex-col bg-bgBlue md:flex  md:flex-row" :class="{'bg-white' : isLogged }">
      <div v-if="isLogged" class="w-fit">
        <SideBar></SideBar>
      </div>
      <div class="md:w-full md:h-[100vh] h-[95vh] bg-bgBlue" :class="{'bg-white' : isLogged }">
        <RouterView></RouterView>
      </div>
    </div> 
    

  </main>

</template>

<script setup>
import SideBar from './components/nav/SideBar.vue';
import {useMyStore} from '@/stores/store.js';
import { ref, watch, onMounted } from "vue";

const store = useMyStore();
const isLogged = ref(false);



watch(
    () => store.loggedIn,
    () => {
        isLogged.value = store.loggedIn;
    }
)

onMounted(() => {
    let token = localStorage.getItem('token');
    if (token) {
        isLogged.value = true;
    }
})

</script>

<style>

</style>
