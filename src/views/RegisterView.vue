<script setup>
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthRepository } from '@/composables';

const repository = useAuthRepository()
const route = useRoute()
const router = useRouter()

const credenstials = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    device_name: 'browser',
})

const Register = ref(false)
const onSubmit = async () => {
    Register.value = true
    
    try {
        const { data } = await repository.register(credenstials)
        if (data) {
            router.replace({ name: "login" })
        }
    } catch (e) {
        console.error(e)
    }

    Register.value = false
}
</script>

<template>
    <main class="grid grid-cols-12 min-h-screen overflow-hidden">
        <section class="col-span-6 opacity-95 bg-[#224585] text-white font-mono h-full">
            <form :action="route.path" method="post" class="p-10 px-32 py-16 font-light" @submit.prevent="onSubmit">
                <h1 class="block text-center mb-2 text-3xl uppercase">Register</h1>

                <div class="mb-4">
                    <label for="name" class="block mb-2">Username</label>
                    <input v-model="credenstials.name" type="text" required placeholder="Username"
                        class="border p-2 w-full text-black bg-gray-50 outline-none focus:ring-1 focus:ring-blue-400 rounded">
                </div>

                <div class="mb-4">
                    <label for="email" class="block mb-2">Email</label>
                    <input v-model="credenstials.email" type="email" required placeholder="Email Address"
                        class="border p-2 w-full text-black bg-gray-50 outline-none focus:ring-1 focus:ring-blue-400 rounded">
                </div>

                <div class="mb-2">
                    <label for="password" class="block mb-2">Password</label>
                    <input v-model="credenstials.password" type="password" required placeholder="Password"
                        class="border p-2 w-full text-black bg-gray-50 outline-none focus:ring-1 focus:ring-blue-400 rounded">
                </div>

                <div class="mb-2">
                    <label for="password_confirmation" class="block mb-2">Password Confirmation</label>
                    <input v-model="credenstials.password_confirmation" type="password" required placeholder="Password Confirmation"
                        class="border p-2 w-full text-black bg-gray-50 outline-none focus:ring-1 focus:ring-blue-400 rounded">
                </div>

                <small class="block mb-2 font-light">Already Have Account? <router-link :to="{ name: 'login' }"
                        class="text-blue-600 hover:text-blue-800 transition-colors duration-300 font-bold">Login
                        Here!</router-link> </small>
                <button type="submit"
                    class="bg-blue-600 hover:bg-blue-800 transition-colors duration-300 text-white p-2 w-full block rounded">Register</button>
            </form>
        </section>

        <section class="col-span-6">
            <img class="object-cover h-full opacity-80" src="../../public/img/Resto1.png">
        </section>
    </main>
</template>