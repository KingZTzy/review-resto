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
    <RouterLink v-if="to" :to="to"
        class="block bg-[#576CBC] p-4 rounded-md select-none border border-white shadow-[3px_3px_0px_2px_rgba(230,230,250)] hover:scale-[1.02] duration-300 min-h-full">
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

    <div v-else class="block bg-[#576CBC] shadow p-4 rounded-sm select-none">
        <BaseCardTitle v-if="!!$slots.title">
            <slot name="title" />
        </BaseCardTitle>

        <BaseCardBody>
            <slot />
        </BaseCardBody>

        <BaseCardInfo>
            <slot name="address" />
        </BaseCardInfo>
    </div>
</template>