<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { authStore } from "../services/stores/authStore";
import { mapState, mapWritableState, storeToRefs} from 'pinia';
import { InputType } from "../utils/constants"

const AuthStore = authStore();
const { numberPhone, password, response } = storeToRefs(AuthStore);


const Component = defineComponent({
})

let ModalErrorHidden = ref(true);
let text = ref('');

function hideModalError(): void {
    ModalErrorHidden.value = true;
}

async function login() {
    await AuthStore.login()
    
    if(response.value.error) {
        text.value = response.value.text;
        ModalErrorHidden.value = false;
    } 
}

</script>

<template>
    
    <div class="flex-col center" target="frame">
        <label class="block text-center font-bold text-md">ВХОД</label>
        <div class="mt-9 h-mdh w-mdw">
            <BaseInput placeholder="+7(___)-__-__" v-model="numberPhone" :type="InputType.Phone" :mask="'+7(###)###-##-##'" :maxlength="16"/>
        </div>
        <div class="mt-5 h-mdh w-mdw">
            <BaseInput placeholder="Пароль" v-model="password" :type="InputType.Password"/>
        </div>
        <label class="block text-center mt-4 font-semibold text-base">Забыли пароль?</label>
        <div class="mt-8 h-mdh w-mdw">
            <BaseButton name="Войти" class="btn-primary" @click="login"/>
        </div>
        <label class="block text-center mt-4 font-semibold text-base">Установить пароль</label>
    </div>
    <ModalError @closeModal="hideModalError" :hidden="ModalErrorHidden" :text="text"/>

</template>