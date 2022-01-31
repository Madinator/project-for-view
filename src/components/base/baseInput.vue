<script setup lang="ts">
import { InputType } from "../../utils/constants";
import { defineComponent, PropType, defineProps, toRefs } from 'vue';

const props = defineProps({
    modelValue: String,
    type: {
        type: String as PropType<InputType>,
        default: InputType.Default,
    },
    placeholder: String,
})

const { type, placeholder } = toRefs(props);

const Component = defineComponent({
})
</script>

<template>
    <input 
    class="input w-full h-full" 
    type="" 
    v-if="type === InputType.Default" 
    :placeholder="placeholder" :value="modelValue" 
    @input="$emit('update:modelValue', $event.target.value)">
    <input class="input w-full h-full" 
    type="" 
    v-if="type === InputType.Phone" 
    :placeholder="placeholder" 
    @input="$emit('update:modelValue', $event.target.value)">
    <input 
    class="input w-full h-full"
    type="password" 
    v-if="type === InputType.Password" 
    :placeholder="placeholder" 
    @input="$emit('update:modelValue', $event.target.value)">
</template>