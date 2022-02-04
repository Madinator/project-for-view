<script setup lang="ts">
import { defineComponent, PropType, defineProps, toRefs } from 'vue';
import { InputType } from "../../utils/constants"


const Component = defineComponent({
})
</script>

<template>

<div class="flex-col center" target="frame">
        <label class="block text-center font-bold text-md">РЕГИСТРАЦИЯ</label>
        <div class="mt-9 h-mdh w-mdw">
            <BaseInput placeholder="+7(___)-__-__" :type="InputType.Phone" :mask="'+7(###)###-##-##'" :maxlength="16"/>
        </div>
        <div class="mt-8 h-mdh w-mdw">
            <BaseButton name="Запросить СМС код" class="btn-primary"/>
        </div>
    </div>
</template>