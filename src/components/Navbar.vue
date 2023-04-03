<script>

</script>

<template>
    <main class="max-w-screen-xl mx-auto grid grid-cols-12 grid-rows-6 bg-[#0B2447] overflow-hidden">
        <div class="row-span-full col-span-full">
            <nav class="flex justify-end">
                <div class="mr-auto ml-12 py-6 font-bold text-2xl">
                    <router-link to=""
                        class="text-white opacity-80 hover:opacity-100 transition duration-300 tracking-wider font-mono flex">
                        <img class="h-8 mr-3" src="../../public/img/Logo1.png" alt="">
                        Resto|Ichikiwir
                    </router-link>
                </div>

                <div class="flex">
                    <ul class="flex py-7 uppercase font-mono">
                        <li><router-link to=""
                                class="text-white hover:bg-blue-600 transition duration-300 p-3">Home</router-link></li>
                        <li><router-link to=""
                                class="text-white hover:bg-blue-600 transition duration-300 p-3">Resto</router-link></li>
                        <li><router-link to=""
                                class="text-white hover:bg-blue-600 transition duration-300 p-3">Profile</router-link></li>
                    </ul>

                    <button class="text-white hover:bg-blue-600 transition duration-300 uppercase p-3 font-mono">Logout</button>
                </div>
            </nav>
        </div>
    </main>
</template>