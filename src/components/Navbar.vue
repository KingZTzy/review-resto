<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthRepository } from '../composables/useAuthRepository';

const DataUser = JSON.parse(localStorage.getItem('user'));

const repository = useAuthRepository();
const router = useRouter();

const isLogout = ref(false)
const onSubmit = async () => {
    isLogout.value = true

    try {
        const { data } = await repository.logout()
        if (data) {
            localStorage.removeItem('access_token')
            localStorage.removeItem('user');
            router.replace({ name: "login" })
        }
    } catch (e) {
        console.error(e)
    }

    isLogout.value = false
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
    <main class="max-w-screen-xl mx-auto grid grid-cols-12 grid-rows-6 bg-[#0B2447] overflow-hidden select-none font-mono">
        <div class="row-span-full col-span-full">
            <nav class="flex justify-between">
                <div class="mr-auto mx-10 py-8 font-bold text-2xl flex flex-row space-x-5">
                    <router-link :to="{ name: 'restos' }"
                        class="text-white hover:scale-[1.02] transition duration-300 tracking-wider font-light font-mono flex mt-1">
                        <img class="h-8 mr-3" src="../../public/img/Logo1.png" alt="">
                        Black'Bull
                    </router-link>
                    <p
                        class="text-white text-lg py-1 border-[1px] border-white rounded-xl px-5 shadow-[1px_1px_0px_1px] hover:shadow-sm duration-300">
                        Hi,@{{ excerpt(DataUser.name, 10) }}</p>
                </div>

                <div class="flex flex-row font-mono uppercase text-white">
                    <ul class="flex py-9 space-x-4">
                        <li><router-link :to="{ name: 'restos' }"
                                class="text-white text-lg py-1 border-[1px] border-white rounded-xl px-5 shadow-[1px_1px_0px_1px] hover:shadow-sm duration-300 p-3">Home</router-link>
                        </li>
                        <li><router-link :to="{ name: 'create-restos' }"
                                class="text-white text-lg py-1 border-[1px] border-white rounded-xl px-5 shadow-[1px_1px_0px_1px] hover:shadow-sm duration-300 p-3">Resto</router-link>
                        </li>
                        <li><router-link :to="{ name: 'profile' }"
                                class="text-white text-lg py-1 border-[1px] border-white rounded-xl px-5 shadow-[1px_1px_0px_1px] hover:shadow-sm duration-300 p-3">Profile</router-link>
                        </li>
                    </ul>

                    <div class="flex py-7 ml-4 mr-4">
                        <button @click="onSubmit"
                            class="text-white text-lg py-1 border-[1px] border-white rounded-xl shadow-[1px_1px_0px_1px] hover:shadow-sm duration-300 p-3">Logout</button>
                    </div>
                </div>
        </nav>
    </div>
</main></template>