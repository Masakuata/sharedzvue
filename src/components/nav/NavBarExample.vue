<template>
    <div class="bg-blue-400">
        <nav class="container px-6 py-8 mx-auto md:flex md:justify-between md:items-center">
            <div class="flex items-center justify-between">
                <router-link to="/">
                    <img src="@/assets/sharedz_full_transparent.png" alt="Descripción de la imagen" class="h-10">
                </router-link>
                <!-- Mobile menu button -->
                <div @click="toggleNav" class="flex md:hidden">
                    <button type="button" class="text-white focus:outline-none ">
                        <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                            <path fill-rule="evenodd"
                                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
            <ul :class="showMenu ? 'flex' : 'hidden'"
                class="flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0">
                
                <li v-for="(menu, index) in menus" :key="index">
                    <router-link class="text-white" :to="menu.path">{{ menu.name }}</router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script setup>
import { ref, watch } from "vue";
import {useMyStore} from '@/stores/store.js';


const store = useMyStore();

let showMenu = ref(false);
const toggleNav = () => (showMenu.value = !showMenu.value);
const menus = ref( [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Login",
        path: "/identificate",
    },
    {
        name: "Regístrate",
        path: "/identificate",
    },
]);

const modifyMenus = (loggedIn) => {
    if (loggedIn) {
        menus.value= [
            {
                name: "Main Home",
                path: "/",
            },
            {
                name: "Registrar producto",
                path: "/add-product",
            },
        ]
    }else{
        menus.value= [
            {
                name: "Home",
                path: "/",
            },
            {
                name: "Login",
                path: "/identificate",
            },
            {
                name: "Regístrate",
                path: "/identificate",
            },
        ]
    }
};

watch(
    () => store.loggedIn,
    () => {
        modifyMenus(store.loggedIn);
    }
)


        
        
</script>
