<script setup lang="ts">
import { defineComponent, PropType, defineProps, toRefs } from 'vue';
import BaseButton from '../base/BaseButton.vue';


const Component = defineComponent({
    BaseButton,
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
        <div class="center z-20 bg-white-default py-15 px-20 text-center">
            <label class="text-md font-semibold" >{{ text }}</label>
            <div class=" flex flex-row justify-center m-9">
                <div class="w-23 h-13">
                    <BaseButton name="Да" class="btn-secondary"></BaseButton>
                </div>
                <div class="w-23 h-13 ml-[0.938rem]">
                    <BaseButton name="Нет" class="btn-primary"></BaseButton>
                </div>
            </div>
        </div>
    </div>
</template>