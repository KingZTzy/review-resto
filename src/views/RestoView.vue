<script setup>
import { ref, onMounted } from 'vue';
import { useRestoRepository } from '@/composables';
import BaseCard from '../components/BaseCard.vue';
import BaseContainer from '../components/BaseContainer.vue';
import Navbar from '../components/Navbar.vue';

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
    <Navbar />
    <div class="bg-[#19376D]">
        <BaseContainer>
            <div class="font-mono capitalize flex justify-between">
                <img class="h-[65px] my-5 py-3" src="../../public/img/Logo1.png">
                <p class="text-white text-center my-5 py-3 border-b-4">welcome to Ichikiwir resto</p>
            </div>
            <div class="grid grid-cols-12 gap-3">
                <div v-for="resto in restos" :key="resto.id" class="col-span-6 font-serif">
                    <BaseCard :to="{ name: 'restos-show', params: { id: resto.id } }">
                        <template #title>{{ resto.name }}</template>
                        {{ excerpt(resto.description, 40) }}
                        <template #address>{{ resto.address }}</template>
                    </BaseCard>
                </div>
            </div>
        </BaseContainer>
    </div>
</template>