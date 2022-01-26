<script setup lang="ts">
import { defineComponent, PropType, defineProps, toRefs } from 'vue';

const props = defineProps({
    name: String,
})

const {name} = toRefs(props)

const Component = defineComponent({
})
</script>

<template>
    <button class="btn-primary w-full h-full" type="button"> {{ name }} </button>
</template>