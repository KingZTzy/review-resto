<script setup>
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthRepository } from '@/composables';

const repository = useAuthRepository()
const route = useRoute()
const router = useRouter()

const credenstials = reactive({
  email: '',
  password: '',
  device_name: 'browser',
})

const isLoggingIn = ref(false)
const onSubmit = async () => {
  isLoggingIn.value = true

  try {
    const { data } = await repository.login(credenstials)
    if (data) {
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem("user", JSON.stringify(data.user));
      router.replace({ name: "restos" })
    }
  } catch (e) {
    console.error(e)
  }

  isLoggingIn.value = false
}
</script>

<template>
  <main class="grid grid-cols-12 min-h-screen">
    <section class="col-span-6 bg-white h-full shadow-xl">
      <form :action="route.path" method="post" class="p-40 font-light" @submit.prevent="onSubmit">
        <h1 class="block text-center mb-2 text-3xl">Login</h1>

        <div class="mb-4">
          <label for="email" class="block mb-2">Email</label>
          <input v-model="credenstials.email" type="email" required placeholder="someone@gmail.com"
            class="border p-2 w-full bg-gray-50 outline-none focus:ring-4 focus:ring-blue-300 rounded">
        </div>

        <div class="mb-4">
          <label for="password" class="block mb-2">Password</label>
          <input v-model="credenstials.password" type="password" required
            class="border p-2 w-full bg-gray-50 outline-none focus:ring-4 focus:ring-blue-300 rounded">
        </div>
        <small class="block mb-2">Don't Have Account? <router-link to="#" class="text-blue-600">Register
            Here!</router-link> </small>
        <button type="submit"
          class="bg-blue-600 text-white p-2 w-full block hover:bg-blue-800 rounded transition-colors duration-200">Masuk</button>
      </form>
    </section>
  </main>
</template>
