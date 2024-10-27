<template>
    <div class="flex flex-col gap-8 text-sky-50 md:flex-row">
        <img
            :src="poster"
            :alt="`${title} film poster`"
            width="400"
        />
        <div class="flex flex-col gap-2">
            <h1 class="text-2xl md:text-3xl font-bold text-orange-400">{{ title }}</h1>
            <p class="text-sm text-orange-200/75">{{ year }} | {{ ageRestriction }} | {{ duration }} | {{ rating }}</p>
            <p class="mt-4">{{ description }}</p>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    poster: String,
    title: String,
    year: String,
    ageRestriction: String,
    duration: String,
    rating: String,
    description: String,
})
</script>