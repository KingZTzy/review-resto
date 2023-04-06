<script setup>
import { ref, onMounted } from 'vue';
import { useRestoRepository } from '@/composables';
import BaseCard from '../components/BaseCard.vue';
import BaseContainer from '../components/BaseContainer.vue';
import Navbar from '../components/Navbar.vue';
import LoadingCuy from '../components/LoadingCuy.vue';

const repository = useRestoRepository();

const isLoading = ref(true);
const restos = ref([]);
const fetchRestos = async () => {
    isLoading.value = true;
    try {
        const { data } = await repository.index();
        restos.value = data;
    } catch (e) {
        console.error(e);
    }

    isLoading.value = false;
};
onMounted(() => fetchRestos());

const excerpt = (text, maxLenght = 10, indicator = "...") => {
    let textCopy = text;

    if (textCopy.lenght > maxLenght) {
        textCopy = textCopy.subString(0, maxLenght) + indicator;
    }
    return textCopy;
};
</script>

<template>
    <LoadingCuy v-if="isLoading" />
    <main v-else>
        <Navbar />
        <div class="bg-[#19376D]">
            <BaseContainer>
                <div class="font-mono capitalize flex justify-between">
                    <img class="h-[65px] my-5 py-3" src="../../public/img/Logo1.png">
                    <p class="text-white text-center my-5 py-3 border-b-4">welcome to Black'Bull</p>
                </div>
                
                <div class="grid grid-cols-12 gap-3 font-mono">
                    <div v-for="resto in restos" :key="resto.id" class="col-span-4">
                        <BaseCard :to="{ name: 'restos-show', params: { id: resto.id } }">
                            <template #title>{{ resto.name }}</template>
                            {{ excerpt(resto.description, 40) }}
                            <template #address>{{ resto.address }}</template>
                        </BaseCard>
                    </div>
                    
                    <div class="col-span-12 flex justify-center text-center">
                        <h1 v-if="restos.length === 0" class="text-white text-semibold text-2xl">
                            <span class="py-3">Belum ada Resto Masbro . . . .</span>
                            <img src="../../public/img/Loading2.gif" alt="" class="pt-3">
                        </h1>
                    </div>
                </div>
            </BaseContainer>
        </div>
    </main>
</template>