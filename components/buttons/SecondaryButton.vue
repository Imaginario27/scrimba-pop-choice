<template>
    <button
        type="button"
        class="
            text-sky-50
            hover:bg-sky-900
            border
            border-sky-100
            px-4 py-2 
            sm:px-6 sm:py-3
            mt-4
            font-semibold
            rounded 
            transition-all 
            duration-150 
            ease-in-out
            drop-shadow-sm
            flex 
            items-center
            justify-center
            gap-2
            "
        @click="handleClick"
    >
        <MdiIcon v-if="icon && iconPosition === 'left'" :icon="icon" :size="iconSize" />
        <span>{{ text }}</span>
        <MdiIcon v-if="icon && iconPosition === 'right'" :icon="icon" :size="iconSize" />
    </button>
</template>

<script setup>

const props = defineProps({
    text: {
        type: String,
        default: "Button text"
    },
    icon: {
        type: String,
        default: null
    },
    iconPosition: {
        type: String,
        default: 'left'
    },
    iconSize: {
        type: String,
        default: '24px'
    }
})

const emit = defineEmits(['click'])

const handleClick = (event) => {
    emit('click', event)
}
</script>
