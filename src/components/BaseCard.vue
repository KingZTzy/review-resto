<script setup>
import { defineProps } from "vue";
import { RouterLink } from "vue-router";
import BaseCardTitle from "@/components/BaseCardTitle.vue";
import BaseCardBody from "@/components/BaseCardBody.vue";
import BaseCardInfo from "@/components/BaseCardInfo.vue";
defineProps({
    to: {
        type: Object,
        default: undefined,
    },
});
</script>

<template>
    <RouterLink v-if="to" :to="to" class="block bg-[#576CBC] p-4 rounded select-none border-x-4 border-y-4">
        <BaseCardTitle v-if="!!$slots.title">
            <slot name="title" />
        </BaseCardTitle>

        <BaseCardBody>
            <slot />
        </BaseCardBody>

        <BaseCardInfo>
            <slot name="address" />
        </BaseCardInfo>
    </RouterLink>

    <div v-else class="block bg-white shadow p-4 rounded select-none">
        <BaseCardTitle v-if="!!$slots.title">
            <slot name="title" />
        </BaseCardTitle>

        <BaseCardBody>
            <slot />
        </BaseCardBody>
    </div>
</template>