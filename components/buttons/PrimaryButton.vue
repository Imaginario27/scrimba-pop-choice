<template>
    <button
        type="button"
        :class="[ 
            `bg-primary-500 
            px-4 py-2 
            sm:px-6 sm:py-3
            mt-4 
            font-semibold 
            text-white 
            rounded 
            transition-all 
            duration-150 
            ease-in-out 
            drop-shadow-sm
            flex 
            items-center
            justify-center
            gap-2
            `,
            buttonDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'hover:bg-primary-700'
        ]"
        :disabled="buttonDisabled"
        @click="handleClick"
    >
        <MdiIcon v-if="icon && iconPosition === 'left'" :icon="icon" :size="iconSize" />
        <span>{{ isLoading ? loadingText : text }}</span>
        <MdiIcon v-if="icon && iconPosition === 'right'" :icon="icon" :size="iconSize" />
    </button>
</template>

<script setup>
const props = defineProps({
    text: {
        type: String,
        default: "Button text"
    },
    isLoading: {
        type: Boolean,
        default: false
    },
    loadingText: {
        type: String,
        default: 'Processing...'
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
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['click'])

const buttonDisabled = computed(() => props.isLoading || props.disabled)

const handleClick = (event) => {
    if (!buttonDisabled.value) {
        emit('click', event)
    }
}
</script>
