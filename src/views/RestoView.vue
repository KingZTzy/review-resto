<script setup>
import { ref, onMounted } from 'vue';
import { useRestoRepository } from '@/composables';
import BaseCard from '../components/BaseCard.vue';
import BaseContainer from '../components/BaseContainer.vue';

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
    <BaseContainer class="min-h-screen container mx-auto">
        <div class="grid grid-cols-12 gap-4">
            <div v-for="resto in restos" :key="resto.id" class="col-span-4">
                <BaseCard :to="{ name: 'restos-show', params: { id: resto.id } }">
                    <template #title>{{ resto.name }}</template>
                    {{ excerpt(resto.description, 40) }}
                </BaseCard>
            </div>
        </div>
    </BaseContainer>
</template>