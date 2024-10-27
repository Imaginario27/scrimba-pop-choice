<template>
    <div>
        <label class="font-medium text-sky-50">{{ label }}</label>
        <div class="flex flex-col sm:flex-row gap-4 mt-2">
            <button
                v-for="option in options"
                :key="option.id"
                :class="{
                    'bg-orange-600 text-white': modelValue === option.id,
                    'bg-sky-800/50 text-sky-50': modelValue !== option.id
                }"
                @click="selectOption(option.id)"
                class="py-2 px-4 rounded-md w-full sm:w-auto"
                type="button"
            >
                {{ option.text }}
            </button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    label: {
        type: String,
        required: true
    },
    options: {
        type: Array,
        required: true,
        default: () => []
    },
    modelValue: {
        type: String,
        default: null
    }
})

const emits = defineEmits(['update:modelValue'])

const selectOption = (optionId) => {
    emits('update:modelValue', optionId)
}
</script>
