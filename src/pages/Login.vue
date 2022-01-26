<script setup lang="ts">
import { defineComponent } from 'vue';
import { authStore } from "../services/stores/authStore";
import { storeToRefs} from 'pinia';
import BaseInput from '../components/base/baseInput.vue';
import BaseButton from '../components/base/baseButton.vue';
import { InputType } from "../utils/constants"

const main = authStore();
const { username, password } = storeToRefs(main);

const Component = defineComponent({
    components:  {
        BaseInput,
    },
})

</script>

<template>
    
    <div class="flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" target="frame">
        <label class="block text-center font-bold text-md">ВХОД</label>
        <div class="mt-9 ">
            <BaseInput placeholder="+7(___)-__-__" v-model="username" :type="InputType.Phone"/>
        </div>
        <div class="mt-5">
            <BaseInput placeholder="Пароль" v-model="password" :type="InputType.Password"/>
        </div>
        <label class="block text-center mt-4 font-base text-base">Забыли пароль?</label>
        <div class="mt-8 w-[23.25rem] h-[3.25rem]">
            <BaseButton name="Войти" @click="main.login"/>
        </div>
    </div>

</template>