<script setup lang="ts">
import { InputType } from '@utils/constants';
import { defineComponent, PropType, defineProps, toRefs } from 'vue';
import { ButtonType } from '../../utils/constants';

const props = defineProps({
    name: String,
    type: {
        type: String as PropType<ButtonType>,
        default: ButtonType.Primary,
    }
})

const {name, type} = toRefs(props)

const Component = defineComponent({
})
</script>

<template>
    <button class="btn w-full h-full" v-bind:class="( type ===  ButtonType.Primary) ? 'btn-primary' : 'btn-secondary'" type="button"> {{ name }} </button>
</template>