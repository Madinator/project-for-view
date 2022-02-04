<script setup lang="ts">
import { defineComponent, PropType, defineProps, toRefs, defineEmits } from 'vue';
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
        <div class="center z-20 bg-white-default">
            <img class="absolute top-9 right-9 cursor-pointer" src="../../assets/icons/close.svg" alt="" @click="closeModal">
            <div class="flex flex-col items-center mx-[5.375rem] my-[6.75rem]">
                <div class="flex-row text-center whitespace-nowrap">
                    <img class="inline align-text-top" src="../../assets/icons/warning.svg" alt="">
                    <label class="m-3 text-warning font-semibold text-[1.25rem]">{{text}}</label>
                </div>
                <div class="w-[23.25rem] h-[3.25rem] mt-[3.5rem]">
                    <BaseButton class="" @click="closeModal" name="Повторить ввод"/>
                </div>
            </div>
        </div>
    </div>
</template>