<script setup>
import { useAuthRepository } from '../composables/useAuthRepository';
import { useRestoRepository } from "../composables/useRestoRepository";
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import LoadingCuy from '../components/LoadingCuy.vue'

const DataUser = JSON.parse(localStorage.getItem('user'));
const AuthRepository = useAuthRepository();

const isLoading = ref(true);
const profile = ref([]);
const fetchUserProfile = async () => {
    isLoading.value = true;
    try {
        const { data } = await AuthRepository.profile();;
        profile.value = data;
    } catch (e) {
        console.error(e);
    }

    isLoading.value = false;
};

onMounted(() => {
    fetchUserProfile();
});
</script>

<template>
    <LoadingCuy v-if="isLoading" />
    <div v-else class="min-h-screen flex flex-col justify-center my-1 mx-10 font-mono bg-[#19376D] capitalize">
        <div class="bg-white flex flex-col items-center p-2">
            <div class="mr-[980px]">
                <router-link :to="{ name: 'restos' }">
                    <button
                        class="px-2 py-1 border-4 border-black rounded shadow-[2px_3px_0px_2px_rgba(230,230,250)] hover:scale-[1.02] active:scale-1 duration-300">Back
                        To Home
                    </button>
                </router-link>
            </div>

            <div class="flex flex-col items-center border-b-2 border-black w-[500px] mb-3">
                <div v-if="profile.profile_picture" class="w-[120px] relative mt-6">
                    <img :src="profile" alt="" class="rounded-full" />
                </div>
                <div v-else class="w-[120px] relative mt-6 duration-300">
                    <img src="../../public/img/Logo1.png" class="rounded-full" alt="" />
                </div>

                <div class="relative mt-6 border-b-2 border-black text-xl">
                    {{ DataUser.name }}
                </div>
                <div class="text-2xl mt-2 mb-2">
                    <p v-if="profile.description">{{ profile.description }}</p>
                    <p v-else>Belum Ada Deskripsi</p>
                </div>
            </div>


            <div class="flex flex-col px-[22rem] py-1 my-3 text-xl font-bold w-full">
                <p class="mb-2">
                    <span>Email: </span> {{ profile.email }}
                </p>
                <p class="mb-2" v-if="profile.phone_number">
                    <span>Phone Number: </span>
                    {{ profile.phone_number }}
                </p>
                <p v-else>
                    <span>Phone Number: </span> -
                </p>
            </div>

            <div class="flex flex-row justify-center py-5 mt-2 space-x-3 mb-4 border-black border-t-2 w-[500px]">
                <router-link :to="{ name: 'create-restos' }">
                    <button
                        class="px-2 py-1 border-4 border-black rounded shadow-[2px_3px_0px_2px_rgba(230,230,250)] hover:scale-[1.02] active:scale-1 duration-300">Create
                        Resto
                    </button>
                </router-link>
                <button
                    class="px-2 py-1 border-4 border-black rounded shadow-[2px_3px_0px_2px_rgba(230,230,250)] hover:scale-[1.02] active:scale-1 duration-300">Your
                    Resto
                </button>
            </div>
        </div>
    </div>
</template>