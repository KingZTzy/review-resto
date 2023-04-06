<script setup>
import { useRestoRepository } from "@/composables";
import { reactive, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useReviewsRepository } from "../composables/useReviewsRepository";
import BaseCard from "../components/BaseCard.vue";
import BaseContainer from "../components/BaseContainer.vue";
import Navbar from "../components/Navbar.vue";
import LoadingCuy from "../components/LoadingCuy.vue";

const repository = useRestoRepository()
const reviewRepository = useReviewsRepository()
const route = useRoute()
const router = useRouter()


const id = route.params.id;
const Review = reactive({
    text: '',
    rating: '',
    resto_id: id,
})

const CreateReview = ref(false)
const onSubmit = async () => {
    CreateReview.value = true

    try {
        const { data } = await reviewRepository.store(Review)
        if (data) {
            window.location.reload();
        }
    } catch (e) {
        console.error(e)
    }

    CreateReview.value = false
}


const DeleteResto = async () => {
    try {
        const id = route.params.id;
        const { data } = await repository.destroy(id);

        if (data) {
            router.replace({ name: 'restos'})
        }
    } catch (e) {
        console.error(e)
    }
}

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
    <LoadingCuy v-if="isLoading" />
    <main v-else class="bg-[#19376D]">
        <Navbar />
        <BaseContainer class="font-mono">
            <div class="space-x-5">
                <button>
                    <RouterLink :to="{ name: 'restos' }"
                        class="px-4 py-2 border-2 text-white shadow-[2px_2px_0px_2px_rgba(0,0,0,1)] rounded-md hover:shadow-sm duration-300">
                        Back
                    </RouterLink>
                </button>

                <button>
                    <RouterLink :to="{ name: 'edit-restos', params: { id: resto.id } }"
                        class="px-4 py-2 border-2 bg-green-300 shadow-[2px_2px_0px_2px_rgba(0,0,0,1)] rounded-md hover:shadow-sm duration-300">
                        Edit
                    </RouterLink>
                </button>

                <button @click="DeleteResto"
                    class="px-4 py-2 border-2 bg-red-300 shadow-[2px_2px_0px_2px_rgba(0,0,0,1)] rounded-md hover:shadow-sm duration-300">
                    Delete
                </button>
            </div>

            <BaseCard class="mt-4 bg-[#0B2447] text-white text-center">
                <template #title>Resto</template>
            </BaseCard>

            <BaseCard>
                <template #title>{{ resto.name }}</template>
                {{ resto.description }}
                <template #address>{{ resto.address }}</template>
            </BaseCard>

            <BaseCard class=" bg-[#0B2447] text-white">
                <template #title>Berikan Review Pada Restoran Ini :</template>
            </BaseCard>

            <BaseCard>
                <form :action="route.path" @submit.prevent="onSubmit" class="flex flex-col">
                    <label for="review">Tulis Review Disini :</label>
                    <textarea type="text" rows="4" name="review"
                        class="border-2 border-[#19376D] p-1 rounded-sm transition-all duration-300 outline-none mb-2 text-black"
                        v-model="Review.text" required />

                    <p>Beri Rating :</p>
                    <input type="number"
                        class="border-2 border-[#19376D] p-1 rounded-sm transition-all duration-300 outline-none mb-2 text-black w-[13%]"
                        min="1" max="5" placeholder="Rating 1-5" v-model="Review.rating" required>
                    <button type="submit"
                        class="px-2 py-1 border-4 border-black bg-[#19376D] text-white rounded shadow-[2px_2px_0px_2px_rgba(230,230,250)] hover:shadow-sm duration-300">
                        Create Review
                    </button>
                </form>
            </BaseCard>

            <BaseCard class="mt-4 bg-[#0B2447] text-white text-center">
                <template #title>Reviews Dari Para Black'Bullers</template>
            </BaseCard>

            <div class="grid grid-cols-12 gap-4">
                <div v-for="review in reviews" :key="review.id" class="mt-4 col-span-6">
                    <BaseCard>
                        <template #title>{{ review.user.name }}</template>
                        <p>{{ review.rating }}<i class="bi bi-star-fill text-yellow-400"></i></p>
                        {{ review.text }}
                    </BaseCard>
                </div>
            </div>

            <div class="flex justify-center text-center py-[10px]">
                <h1 v-if="reviews.length === 0" class="text-white text-semibold text-2xl">
                    <span>Belum ada Review Masbro . . . .</span>
                    <img src="../../public/img/Loading2.gif" alt="" class="">
                </h1>
            </div>

        </BaseContainer>
    </main>
</template>