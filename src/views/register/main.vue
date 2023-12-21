<template>
    <div class="flex flex-col px-10 md:flex-row md:space-x-10 lg:space-x-80">
        <div class="md:w-1/2">
            <h1 class="w-full text-center md:text-2xl md:text-center"> Comienza a organizar tus gastos grupales de manera
                automatizada </h1>
            <div class="flex justify-center"><img src="/img/friends_transparent.2a44378a.png" alt="Descripción de la imagen"
                    class="w-36 md:w-96"></div>
        </div>
        <div class="md:w-1/2">
            <div class="flex">
                <p class="text-start w-1/2 text-blueLetters font-bold underline">Regístrate</p>
                <p class="text-end w-1/2 text-black">Iniciar Sesión</p>
            </div><!--v-if-->
            <div class="flex flex-col w-full pt-10">
                <div>
                    <form class="space-y-4">
                        <div><label for="nickname" class="block text-sm font-medium text-gray-700">Nickname</label><input
                                type="text" id="nickname"
                                class="w-full mt-1 h-10 px-3 border border-solid border-blueLetters rounded-lg"><!--v-if-->
                        </div>
                        <div><label for="correo" class="block text-sm font-medium text-gray-700">Correo</label><input
                                id="correo"
                                class="w-full mt-1 h-10 px-3 border border-solid border-blueLetters rounded-lg"><!--v-if-->
                        </div>
                        <div><label for="contraseniaComp" class="block text-sm font-medium text-gray-700">Contraseña</label>
                            <div class="relative"><input type="password" id="contraseniaComp"
                                    class="w-full mt-1 h-10 px-3 border border-solid border-blueLetters rounded-lg"
                                    placeholder="Contraseña"><button type="button"
                                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"><img
                                        src="/img/eye-off.b97b245d.svg" class="h-6 w-6"
                                        alt="Toggle password visibility"></button></div>
                            <p class="text-red-600">La contraseña debe tener al menos 6 caracteres</p>
                        </div>
                        <div><label for="contraseniaConf" class="block text-sm font-medium text-gray-700">Confirmar
                                Contraseña</label>
                            <div class="relative"><input type="password" id="contraseniaConf"
                                    class="w-full mt-1 h-10 px-3 border border-solid border-blueLetters rounded-lg"
                                    placeholder="Contraseña"><button type="button"
                                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"><img
                                        src="/img/eye-off.b97b245d.svg" class="h-6 w-6"
                                        alt="Toggle password visibility"></button></div><!--v-if-->
                        </div>
                        <div class="flex pt-5"><button type="submit"
                                class="w-full bg-redCancel h-12 rounded-lg text-white font-semibold text-lg mr-1"> Cancelar
                            </button><button type="submit"
                                class="w-full bg-primaryBlue h-12 rounded-lg text-white font-semibold text-lg ml-1">
                                Registrarse </button></div>
                    </form>
                </div>
            </div>
        </div>



        <div class="flex flex-col px-10 md:flex-row md:space-x-10 lg:space-x-80">
            <div class="md:w-1/2">
                <h1 class="w-full text-center md:text-2xl md:text-center"> Comienza a organizar tus gastos grupales de
                manera automatizada </h1>
            <div class="flex justify-center"><img src="/img/friends_transparent.2a44378a.png"
                    alt="Descripción de la imagen" class="w-36 md:w-96"></div>
        </div>
        <div class="md:w-1/2">
            <div class="flex">
                <p class="text-start w-1/2 text-blueLetters font-bold underline">Regístrate</p>
                <p class="text-end w-1/2 text-black">Iniciar Sesión</p>
            </div><!--v-if-->
            <div class="flex flex-col w-full pt-10">
                <div>
                    <form class="space-y-4">
                        <div><label for="nickname"
                                class="block text-sm font-medium text-gray-700">Nickname</label><input type="text"
                                id="nickname"
                                class="w-full mt-1 h-10 px-3 border border-solid border-blueLetters rounded-lg"><!--v-if-->
                        </div>
                        <div><label for="correo" class="block text-sm font-medium text-gray-700">Correo</label><input
                                id="correo"
                                class="w-full mt-1 h-10 px-3 border border-solid border-blueLetters rounded-lg"><!--v-if-->
                        </div>
                        <div><label for="contraseniaComp"
                                class="block text-sm font-medium text-gray-700">Contraseña</label>
                            <div class="relative"><input type="password" id="contraseniaComp"
                                    class="w-full mt-1 h-10 px-3 border border-solid border-blueLetters rounded-lg"
                                    placeholder="Contraseña"><button type="button"
                                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"><img
                                        src="/img/eye-off.b97b245d.svg" class="h-6 w-6"
                                        alt="Toggle password visibility"></button></div><!--v-if-->
                        </div>
                        <div><label for="contraseniaConf" class="block text-sm font-medium text-gray-700">Confirmar
                                Contraseña</label>
                            <div class="relative"><input type="password" id="contraseniaConf"
                                    class="w-full mt-1 h-10 px-3 border border-solid border-blueLetters rounded-lg"
                                    placeholder="Contraseña"><button type="button"
                                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"><img
                                        src="/img/eye-off.b97b245d.svg" class="h-6 w-6"
                                        alt="Toggle password visibility"></button></div><!--v-if-->
                        </div>
                        <div class="flex pt-5"><button type="submit"
                                class="w-full bg-redCancel h-12 rounded-lg text-white font-semibold text-lg mr-1">
                                Cancelar </button><button type="submit"
                                class="w-full bg-primaryBlue h-12 rounded-lg text-white font-semibold text-lg ml-1">
                                Registrarse </button></div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div></template>