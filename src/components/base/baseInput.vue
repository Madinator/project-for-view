<script setup lang="ts">
import { InputType } from "../../utils/constants";
import { defineComponent, PropType, defineProps, toRefs } from 'vue';

const props = defineProps({
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
    <input v-if="type === InputType.Default" class="input w-[23.25rem] h-[3.25rem]" type="" :placeholder="placeholder">
    <input v-if="type === InputType.Phone" class="input w-[23.25rem] h-[3.25rem]" type="" :placeholder="placeholder">
    <input v-if="type === InputType.Password" class="input w-[23.25rem] h-[3.25rem]" type="password" :placeholder="placeholder">
</template>