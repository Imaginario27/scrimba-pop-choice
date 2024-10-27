<template>
    <div class="flex flex-col gap-2">
        <label
            v-if="label"
            :for="id"
            class="font-medium text-sky-50"
        >
            {{ label }}
        </label>
        <input
            :type="type"
            :value="modelValue"
            :id="id"
            :placeholder="placeholder"
            :maxlength="maxLength"
            :required="required"
            @input="updateValue($event.target.value)"
            class="
            focus:border-sky-500
            focus:ring-sky-500
            focus:bg-sky-50
            focus:text-sky-950
            focus:ring-2 
            rounded-md 
            shadow-sm 
            px-4 
            py-2 
            text-sm
            bg-sky-900/50
            placeholder-gray-400
            text-sky-100 
            "
        />
    </div>
</template>

<script setup>
const props = defineProps({
    type: {
        type: String,
        default: 'text',
    },
    label: String,
    modelValue: String,
    id: {
        type: String,
        required: true,
    },
    placeholder: {
        type: String,
        required: true,
    },
    maxLength: Number,
    required: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (value) => {
    emit('update:modelValue', value)
}

</script>
