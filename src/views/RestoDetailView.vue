<script setup>
import { useRestoRepository } from "@/composables";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import BaseCard from "../components/BaseCard.vue";
import BaseContainer from "../components/BaseContainer.vue";
import Navbar from "../components/Navbar.vue";
import LoadingCuy from "../components/LoadingCuy.vue";

const repository = useRestoRepository()
const route = useRoute()

const isLoading = ref(true)
const resto = ref({})
const fetchDetail = async () => {
    isLoading.value = true

    try {
        const id = route.params.id
        const { data } = await repository.show(id)
        resto.value = data;
    } catch (e) {
        console.log(e);
    }
    isLoading.value = false
};
onMounted(() => fetchDetail());

const reviews = ref([]);
const fetchReviews = async () => {
    isLoading.value = true;
    try {
        const id = route.params.id;
        const { data } = await repository.reviews(id);
        reviews.value = data;
    } catch (e) {
        console.log(e);
    }
    isLoading.value = false;
};
onMounted(() => fetchReviews());
</script>

<template>
    <LoadingCuy v-if="isLoading"/>
    <main v-else class="bg-[#19376D]">
        <Navbar />
        <BaseContainer class="font-mono">
            <RouterLink :to="{ name: 'restos' }" class="px-4 py-2 border-2 text-white shadow-[2px_2px_0px_2px_rgba(0,0,0,1)] rounded-md hover:shadow-sm duration-300">
                Back
            </RouterLink>
    
            <BaseCard class="mt-4 bg-[#0B2447] text-white text-center">
                <template #title>Resto</template>
            </BaseCard>
    
            <BaseCard>
                <template #title>{{ resto.name }}</template>
                {{ resto.description }}
                <template #address>{{ resto.address }}</template>
            </BaseCard>
    
            <BaseCard class="mt-4 bg-[#0B2447] text-white text-center">
                <template #title>Reviews</template>
            </BaseCard>
    
            <BaseCard v-for="review in reviews" :key="review.id" class="mt-4">
                <template #title>{{ review.user.name }}</template>
                {{ review.text }}
            </BaseCard>
        </BaseContainer>
    </main>
</template>