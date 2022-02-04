<script setup lang="ts">
import { InputType } from "../../utils/constants";
import { defineComponent ,PropType, defineProps, toRefs, ref, onMounted } from 'vue';

const Component = defineComponent({
    
})
const props = defineProps({
    modelValue: String,
    type: {
        type: String as PropType<InputType>,
        default: InputType.Default,
    },
    placeholder: String,
    mask: {
        type: String,
        default: ''
    },
    maxlength: {
        type: Number,
        default: 9999,
    }
})
const { type, placeholder, maxlength, mask } = toRefs(props);

const emit = defineEmits(['update:modelValue'])

function emitValue(event) : void {
    emit('update:modelValue', event.target.value)
}

</script>

<template>
    <input
    class="input w-full h-full" 
    :type="type" 
    :placeholder="placeholder" 
    @input="emitValue($event)"
    :maxlength="maxlength"
    v-maska="mask"
    />
</template>