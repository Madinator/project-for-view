<script setup lang="ts">
import { defineComponent, PropType, defineProps, toRefs } from 'vue';
import { InputType } from "../../utils/constants"

</script>

<template>

<div class="flex-col center" target="frame">
        <label class="block text-center font-bold text-md">РЕГИСТРАЦИЯ</label>
        <div class="mt-9 h-mdh w-mdw">
            <BaseInput placeholder="Придумайте пароль" :type="InputType.Password"/>
        </div>
        <div class="mt-4 h-mdh w-mdw">
            <BaseInput placeholder="Повторите пароль" :type="InputType.Password"/>
        </div>
        <div class="mt-8 h-mdh w-mdw">
            <BaseButton name="Зарегистрироваться" />
        </div>
    </div>
</template>