<template>
    <div class="md:w-64 md:h-full">

        <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar"
            type="button" @click="toggleSidebar"
            class="inline-flex   items-center p-2 mt-2 ms-3 text-sm text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
            <span class="sr-only">Open sidebar</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd" fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
                </path>
            </svg>


        </button>




        <aside :class="{ 'translate-x-0': isSidebarOpen, '-translate-x-full': !isSidebarOpen }"
            class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-500 md:translate-x-0"
            aria-label="Sidebar">

            <div class="h-full px-3 py-4 overflow-y-auto  bg-bgBlue">
                <div :class="{ 'text-right': isSidebarOpen }" class="flex flex-row justify-end  md:inline">
                    <p class="w-full text-start text-white text-xl font-semibold pl-3">MENU</p>
                    <button @click="toggleSidebar" type="button" class="text-white  md:hidden" aria-label="Close sidebar">
                        <span class="sr-only">Cerrar</span>

                        <svg class="w-8 h-8 md:hidden" width="100" height="100" viewBox="0 0 100 100" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <mask id="mask0_95_99" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                                width="100" height="100">
                                <rect width="100" height="100" fill="currentColor" />
                            </mask>
                            <g mask="url(#mask0_95_99)">
                                <path
                                    d="M12.5 75V66.6667H66.6667V75H12.5ZM81.6667 70.8333L60.8333 50L81.6667 29.1667L87.5 35L72.5 50L87.5 65L81.6667 70.8333ZM12.5 54.1667V45.8333H54.1667V54.1667H12.5ZM12.5 33.3333V25H66.6667V33.3333H12.5Z"
                                    fill="currentColor" />
                            </g>
                        </svg>

                    </button>
                </div>
                <div class="w-full border-b border-white h-0"></div>




                <ul class="space-y-2 font-medium">
                    <li>
                        <a href="#" @click="goHome"
                            class="flex items-center p-2 md:px-2 md:py-6 text-white text-xl rounded-lg hover:bg-bgBlueLight hover:text-textBlueDark group">
                            <svg class="w-7 h-7 text-white transition duration-75  group-hover:text-textBlueDark dark:group-hover:text-white"
                                width="81" height="69" viewBox="0 0 81 69" fill="none" stroke="currentColor"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12.7917 68.1667V36.5H0.916748L40.5001 0.875L56.3334 15.125V4.83333H68.2084V25.8125L80.0834 36.5H68.2084V68.1667H44.4584V44.4167H36.5417V68.1667H12.7917ZM20.7084 60.25H28.6251V36.5H52.3751V60.25H60.2917V29.375L40.5001 11.5625L20.7084 29.375V60.25ZM32.5834 28.6823H48.4167C48.4167 26.5712 47.6251 24.8394 46.0417 23.487C44.4584 22.1345 42.6112 21.4583 40.5001 21.4583C38.389 21.4583 36.5417 22.1345 34.9584 23.487C33.3751 24.8394 32.5834 26.5712 32.5834 28.6823Z"
                                    fill="currentColor" />
                            </svg>


                            <span class="ms-3">Inicio</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" @click="goAddNote"
                            class="flex items-center p-2 md:px-2 md:py-6 text-white text-xl rounded-lg hover:bg-bgBlueLight hover:text-textBlueDark group">

                            <svg class="w-7 h-7 text-white transition duration-75  group-hover:text-textBlueDark dark:group-hover:text-white"
                                width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M49.4063 77.7083C47.889 79.2257 46.0088 79.9844 43.7657 79.9844C41.5227 79.9844 39.6424 79.2257 38.1251 77.7083L3.29175 42.875C2.56605 42.1493 1.9888 41.2917 1.55998 40.3021C1.13116 39.3125 0.916748 38.2569 0.916748 37.1354V8.83332C0.916748 6.65624 1.69192 4.79252 3.24227 3.24218C4.79262 1.69183 6.65633 0.916656 8.83342 0.916656H37.1355C38.257 0.916656 39.3126 1.13107 40.3022 1.55989C41.2917 1.98871 42.1494 2.56596 42.8751 3.29166L77.7084 38.2239C79.2258 39.7413 79.9845 41.605 79.9845 43.8151C79.9845 46.0252 79.2258 47.8889 77.7084 49.4062L49.4063 77.7083ZM43.7657 72.1667L72.0678 43.8646L37.1355 8.83332H8.83342V37.1354L43.7657 72.1667ZM18.7292 24.6667C20.3786 24.6667 21.7805 24.0894 22.935 22.9349C24.0895 21.7804 24.6667 20.3785 24.6667 18.7292C24.6667 17.0799 24.0895 15.6779 22.935 14.5234C21.7805 13.3689 20.3786 12.7917 18.7292 12.7917C17.0799 12.7917 15.678 13.3689 14.5235 14.5234C13.369 15.6779 12.7917 17.0799 12.7917 18.7292C12.7917 20.3785 13.369 21.7804 14.5235 22.9349C15.678 24.0894 17.0799 24.6667 18.7292 24.6667Z"
                                    fill="currentColor" />
                            </svg>

                            <span class="flex-1 ms-3 whitespace-nowrap">Nueva nota</span>

                        </a>
                    </li>
                    <li>
                        <a href="#" @click="goSales"
                            class="flex items-center p-2 md:px-2 md:py-6 text-white text-xl rounded-lg hover:bg-bgBlueLight hover:text-textBlueDark group">

                            <svg class="w-7 h-7 text-white transition duration-75  group-hover:text-textBlueDark dark:group-hover:text-white"
                                width="95" height="95" viewBox="0 0 95 95" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <mask id="mask0_96_464" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                                    width="95" height="95">
                                    <rect width="95" height="95" fill="currentColor" />
                                </mask>
                                <g mask="url(#mask0_96_464)">
                                    <path
                                        d="M43.9376 75.2084H50.8647V70.2604C54.1633 69.6667 57.0001 68.3802 59.3751 66.4011C61.7501 64.4219 62.9376 61.4861 62.9376 57.5938C62.9376 54.8229 62.1459 52.283 60.5626 49.974C58.9792 47.665 55.8126 45.6528 51.0626 43.9375C47.1042 42.6181 44.3664 41.4636 42.849 40.474C41.3317 39.4844 40.573 38.132 40.573 36.4167C40.573 34.7014 41.1832 33.349 42.4037 32.3594C43.6242 31.3698 45.389 30.875 47.698 30.875C49.8091 30.875 51.4584 31.3863 52.6459 32.4089C53.8334 33.4314 54.6911 34.7014 55.2188 36.2188L61.5522 33.6459C60.8265 31.3368 59.4905 29.3247 57.5444 27.6094C55.5982 25.8941 53.4376 24.9375 51.0626 24.7396V19.7917H44.1355V24.7396C40.8369 25.4653 38.264 26.9167 36.4167 29.0938C34.5695 31.2709 33.6459 33.7118 33.6459 36.4167C33.6459 39.5174 34.553 42.0243 36.3673 43.9375C38.1815 45.8507 41.0348 47.5 44.9272 48.8854C49.0834 50.4028 51.9697 51.7552 53.586 52.9427C55.2023 54.1302 56.0105 55.6806 56.0105 57.5938C56.0105 59.7709 55.2353 61.3707 53.685 62.3932C52.1346 63.4158 50.2709 63.9271 48.0938 63.9271C45.9167 63.9271 43.9871 63.2509 42.3048 61.8985C40.6225 60.546 39.3855 58.5174 38.5938 55.8125L32.0626 58.3854C32.9862 61.5521 34.4211 64.1085 36.3673 66.0547C38.3134 68.0009 40.8369 69.3368 43.9376 70.0625V75.2084ZM47.5001 87.0834C42.0244 87.0834 36.8786 86.0443 32.0626 83.9662C27.2466 81.888 23.0574 79.0677 19.4949 75.5052C15.9324 71.9427 13.1121 67.7535 11.0339 62.9375C8.95581 58.1215 7.91675 52.9757 7.91675 47.5C7.91675 42.0243 8.95581 36.8785 11.0339 32.0625C13.1121 27.2465 15.9324 23.0573 19.4949 19.4948C23.0574 15.9323 27.2466 13.112 32.0626 11.0339C36.8786 8.95575 42.0244 7.91669 47.5001 7.91669C52.9758 7.91669 58.1216 8.95575 62.9376 11.0339C67.7536 13.112 71.9428 15.9323 75.5053 19.4948C79.0678 23.0573 81.8881 27.2465 83.9662 32.0625C86.0443 36.8785 87.0834 42.0243 87.0834 47.5C87.0834 52.9757 86.0443 58.1215 83.9662 62.9375C81.8881 67.7535 79.0678 71.9427 75.5053 75.5052C71.9428 79.0677 67.7536 81.888 62.9376 83.9662C58.1216 86.0443 52.9758 87.0834 47.5001 87.0834ZM47.5001 79.1667C56.3404 79.1667 63.8282 76.099 69.9636 69.9636C76.099 63.8281 79.1667 56.3403 79.1667 47.5C79.1667 38.6597 76.099 31.1719 69.9636 25.0365C63.8282 18.9011 56.3404 15.8334 47.5001 15.8334C38.6598 15.8334 31.172 18.9011 25.0365 25.0365C18.9011 31.1719 15.8334 38.6597 15.8334 47.5C15.8334 56.3403 18.9011 63.8281 25.0365 69.9636C31.172 76.099 38.6598 79.1667 47.5001 79.1667Z"
                                        fill="currentColor" />
                                </g>
                            </svg>


                            <span class="flex-1 ms-3 whitespace-nowrap">Ventas</span>

                        </a>
                    </li>
                    <li>
                        <a href="#" @click="goInventory"
                            class="flex items-center p-2 md:px-2 md:py-6 text-white text-xl rounded-lg hover:bg-gray-100 hover:text-textBlueDark group">

                            <svg class="w-7 h-7 text-white transition duration-75  group-hover:text-textBlueDark dark:group-hover:text-white"
                                width="95" height="95" viewBox="0 0 95 95" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <mask id="mask0_75_1520" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                                    width="95" height="95">
                                    <rect width="95" height="95" fill="currentColor" />
                                </mask>
                                <g mask="url(#mask0_75_1520)">
                                    <path
                                        d="M61.3542 78.8698L44.5313 62.0469L50.0729 56.5052L61.3542 67.7864L83.7188 45.4219L89.2604 50.9635L61.3542 78.8698ZM83.125 39.5833H75.2083V19.7916H67.2917V31.6666H27.7083V19.7916H19.7917V75.2083H43.5417V83.125H19.7917C17.6146 83.125 15.7509 82.3498 14.2005 80.7995C12.6502 79.2491 11.875 77.3854 11.875 75.2083V19.7916C11.875 17.6146 12.6502 15.7508 14.2005 14.2005C15.7509 12.6502 17.6146 11.875 19.7917 11.875H36.3177C37.0434 9.56595 38.4618 7.66925 40.5729 6.18488C42.684 4.7005 44.9931 3.95831 47.5 3.95831C50.1389 3.95831 52.4974 4.7005 54.5755 6.18488C56.6537 7.66925 58.0556 9.56595 58.7813 11.875H75.2083C77.3854 11.875 79.2491 12.6502 80.7995 14.2005C82.3498 15.7508 83.125 17.6146 83.125 19.7916V39.5833ZM47.5 19.7916C48.6215 19.7916 49.5616 19.4123 50.3203 18.6536C51.079 17.8949 51.4583 16.9548 51.4583 15.8333C51.4583 14.7118 51.079 13.7717 50.3203 13.013C49.5616 12.2543 48.6215 11.875 47.5 11.875C46.3785 11.875 45.4384 12.2543 44.6797 13.013C43.921 13.7717 43.5417 14.7118 43.5417 15.8333C43.5417 16.9548 43.921 17.8949 44.6797 18.6536C45.4384 19.4123 46.3785 19.7916 47.5 19.7916Z"
                                        fill="currentColor" />
                                </g>
                            </svg>


                            <span class="flex-1 ms-3 whitespace-nowrap">Inventario</span>
                            
                        </a>
                    </li>
                    <li>
                        <a href="#" @click="goAddCustomer"
                            class="flex items-center p-2 md:px-2 md:py-6 text-white text-xl rounded-lg hover:bg-gray-100 hover:text-textBlueDark group">
                            <svg class="w-7 h-7 text-white transition duration-75  group-hover:text-textBlueDark dark:group-hover:text-white"
                                width="95" height="95" viewBox="0 0 95 95" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <mask id="mask0_75_1532" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                                    width="95" height="95">
                                    <rect width="95" height="95" fill="currentColor" />
                                </mask>
                                <g mask="url(#mask0_75_1532)">
                                    <path
                                        d="M47.4999 47.5C43.1458 47.5 39.4183 45.9496 36.3176 42.8489C33.2169 39.7482 31.6666 36.0208 31.6666 31.6666C31.6666 27.3125 33.2169 23.585 36.3176 20.4844C39.4183 17.3837 43.1458 15.8333 47.4999 15.8333C51.8541 15.8333 55.5815 17.3837 58.6822 20.4844C61.7829 23.585 63.3333 27.3125 63.3333 31.6666C63.3333 36.0208 61.7829 39.7482 58.6822 42.8489C55.5815 45.9496 51.8541 47.5 47.4999 47.5ZM15.8333 79.1666V68.0833C15.8333 65.8403 16.4105 63.7786 17.565 61.8984C18.7195 60.0182 20.2534 58.5833 22.1666 57.5937C26.2569 55.5486 30.4131 54.0147 34.6353 52.9922C38.8576 51.9696 43.1458 51.4583 47.4999 51.4583C51.8541 51.4583 56.1423 51.9696 60.3645 52.9922C64.5867 54.0147 68.743 55.5486 72.8333 57.5937C74.7464 58.5833 76.2803 60.0182 77.4348 61.8984C78.5893 63.7786 79.1666 65.8403 79.1666 68.0833V79.1666H15.8333ZM23.7499 71.25H71.2499V68.0833C71.2499 67.3576 71.0685 66.6979 70.7056 66.1041C70.3428 65.5104 69.8645 65.0486 69.2708 64.7187C65.7083 62.9375 62.1128 61.6015 58.4843 60.7109C54.8558 59.8203 51.1944 59.375 47.4999 59.375C43.8055 59.375 40.144 59.8203 36.5155 60.7109C32.8871 61.6015 29.2916 62.9375 25.7291 64.7187C25.1353 65.0486 24.657 65.5104 24.2942 66.1041C23.9313 66.6979 23.7499 67.3576 23.7499 68.0833V71.25ZM47.4999 39.5833C49.677 39.5833 51.5407 38.8081 53.0911 37.2578C54.6414 35.7074 55.4166 33.8437 55.4166 31.6666C55.4166 29.4896 54.6414 27.6258 53.0911 26.0755C51.5407 24.5252 49.677 23.75 47.4999 23.75C45.3228 23.75 43.4591 24.5252 41.9088 26.0755C40.3584 27.6258 39.5833 29.4896 39.5833 31.6666C39.5833 33.8437 40.3584 35.7074 41.9088 37.2578C43.4591 38.8081 45.3228 39.5833 47.4999 39.5833Z"
                                        fill="currentColor" />
                                </g>
                            </svg>

                            <span class="flex-1 ms-3 whitespace-nowrap">Clientes</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" @click="cerrarSesion"
                            class="flex items-center p-2 md:px-2 md:py-6 text-white text-xl rounded-lg hover:bg-gray-100 hover:text-textBlueDark group">
                            <span class="flex-1 ms-3 whitespace-nowrap">Cerrar sesion</span>
                        </a>
                    </li>

                </ul>
            </div>
        </aside>

    </div>
</template>


<script setup>
import { ref, watch, defineEmits } from 'vue'
import { useRouter } from 'vue-router';
import { useMyStore } from '@/stores/store.js';

const emit = defineEmits(['cerrarSesion']);

const router = useRouter();
const store = useMyStore();

const goHome = () => {
    toggleSidebar()
    router.push({ name: 'home' })
}
const goAddCustomer = () => {
    toggleSidebar()
    router.push({ name: 'addcustomer' })
}
const goAddNote = () => {
    toggleSidebar()
    router.push({ name: 'addnote' })
}
const goInventory = () => {
    toggleSidebar()
    router.push({ name: 'inventory' })
}

const goSales = () => {
    toggleSidebar()
    router.push({ name: 'sales' })
}



const isSidebarOpen = ref(false)

const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
    isSidebarOpen.value = false
}

const cerrarSesion = () => {
    emit('cerrarSesion');
}
watch(
    () => store.sidebarStore,
    () => {
        closeSidebar();
    }
)

watch(
    () => store.loggedIn,
    () => {
        isLogged.value = store.loggedIn;
    }
)


</script>