<script setup>
import { useRestoRepository } from "@/composables";
import { reactive, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const repository = useRestoRepository()
const route = useRoute()
const router = useRouter()

const onSubmit = async () => {
    const ValueData = new FormData();
    ValueData.append('name', restos.name);
    ValueData.append('address', restos.address);
    ValueData.append('description', restos.description);
    
    try {
        const id = route.params.id;
        const { data } = await repository.update(id, restos.value)

        if (data) {
            router.replace({ name : 'restos' })
        }
    } catch (e) {
        console.log(e)
    }
}

const restos = ref([]);
const fetchRestos = async () => {
    try { 
        const id = route.params.id;
        const { data } = await repository.show(id);
        restos.value = data;
    } catch (e) {
        console.log(e);
    }
}
onMounted(() => fetchRestos());
</script>

<template>
            <main class="min-h-screen flex flex-col justify-center my-1 mx-10 bg-[#19376D] capitalize font-mono">
        <div class="bg-white flex flex-col items-center p-2">
            <div class="w-full">
                <router-link :to="{ name: 'restos' }">
                    <button
                        class="px-2 py-1 border-4 border-black rounded shadow-[2px_3px_0px_2px_rgba(230,230,250)] hover:scale-[1.02] active:scale-1 duration-300">Back
                        To Home
                    </button>
                </router-link>
            </div>

            <div class="flex flex-col items-center border-b-2 border-black pb-4">
                <img class="h-[50px] w-[50px]" src="../../public/img/Logo1.png" alt="">
                <p class="text-2xl">Create Resto</p>
            </div>

            <div class="flex justify-center">
                <form :action="route.path" @submit.prevent="onSubmit" class="flex flex-col w-[500px]">
                    <label for="name" class="mt-3 mb-2 font-semibold">Nama Resto : </label>
                    <input type="text" name="name"
                        class="border-2 border-[#19376D] p-1 rounded-sm transition-all duration-300 outline-none mb-2"
                        v-model="restos.name" required>

                    <label class="mb-2 font-semibold" for="address">Alamat Resto : </label>
                    <input type="text" name="address"
                        class="border-2 border-[#19376D] p-1 rounded-sm transition-all duration-300 outline-none mb-2"
                        v-model="restos.address" required>

                    <label class="mb-2 font-semibold" for="description">Deskripsi Resto : </label>
                    <textarea type="text" rows="4" name="description"
                        class="border-2 border-[#19376D] p-1 rounded-sm transition-all duration-300 outline-none mb-2"
                        v-model="restos.description"/>

                    <button type="submit"
                        class="px-2 py-1 border-4 border-black bg-[#19376D] text-white rounded shadow-[2px_3px_0px_2px_rgba(230,230,250)] hover:scale-[1.02] active:scale-1 duration-300">
                        Create Resto
                    </button>
                </form>
            </div>
        </div>
    </main>
</template>