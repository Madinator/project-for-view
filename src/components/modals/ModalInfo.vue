<script setup lang="ts">
import { defineComponent, PropType, defineProps, toRefs } from 'vue';


const Component = defineComponent({
})

const props = defineProps({
    text: String,
})

const emit = defineEmits(['closeModal'])

function closeModal(): void {
    emit("closeModal");
}
</script>

<template>
    <div class="modal">
        <div class="center z-20 bg-white-default px-[6.875rem] py-[8.5rem] text-center">
            <img class="absolute top-9 right-9 cursor-pointer" src="../../assets/icons/close.svg" alt="" @click="closeModal">
            <img class="absolute left-0 bottom-0" src="../../assets/icons/house.svg" alt="">
            <label class="text-md font-semibold">{{ text }}</label>
        </div>
    </div>
</template>