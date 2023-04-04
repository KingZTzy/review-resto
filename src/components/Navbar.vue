<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthRepository } from '../composables/useAuthRepository';

const userData = JSON.parse(localStorage.getItem('user'));

const repository = useAuthRepository();
const router = useRouter();

const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    repository.logout();
    router.replace({ name: 'login' })
}

const excerpt = (text, maxLength = 10, indicator = "...") => {
    let textCopy = text;
    if (textCopy.length > maxLength) {
        textCopy = textCopy.substring(0, maxLength) + indicator;
    }
    return textCopy
}
</script>

<template>
    <main class="max-w-screen-xl mx-auto grid grid-cols-12 grid-rows-6 bg-[#0B2447] overflow-hidden">
        <div class="row-span-full col-span-full">
            <nav class="flex justify-between">
                <div class="mr-auto mx-10 py-6 font-bold text-2xl">
                    <router-link :to="{ name: 'restos' }"
                        class="text-white opacity-80 hover:opacity-100 transition duration-300 tracking-wider font-light font-mono flex">
                        <img class="h-8 mr-3" src="../../public/img/Logo1.png" alt="">
                        Resto|Ichikiwir
                    </router-link>
                </div>

                <div class="flex">
                    <ul class="flex py-7 uppercase font-mono">
                        <li><router-link :to="{ name: 'restos' }"
                                class="text-white hover:bg-blue-600 transition duration-300 p-3">Home</router-link></li>
                        <li><router-link :to="{ name: 'restos' }"
                                class="text-white hover:bg-blue-600 transition duration-300 p-3">Resto</router-link></li>
                        <li><router-link :to="{ name: 'restos' }"
                                class="text-white hover:bg-blue-600 transition duration-300 p-3">Profile</router-link></li>
                    </ul>

                    <button @click="logout"
                        class="text-white hover:bg-blue-600 transition duration-300 uppercase p-3 font-mono">Logout</button>
                </div>
            </nav>
        </div>
    </main>
</template>