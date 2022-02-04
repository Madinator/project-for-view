<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { authStore } from "../../services/stores/authStore";
import { mapState, mapWritableState, storeToRefs} from 'pinia';
import { InputType } from "../../utils/constants"

const AuthStore = authStore();
const { numberPhone, isRegister, response } = storeToRefs(AuthStore);


const Component = defineComponent({
})

let ModalInfoHidden = ref(true);
let text = ref('');

function hideModalInfo(): void {
    ModalInfoHidden.value = true;
}

async function RequestSmsCodeWeb() {
    await AuthStore.RequestSmsCodeWeb();

    if(response.value.error) {
        text.value = response.value.text;
        ModalInfoHidden.value = false;
    } 
}

</script>

<template>
    
    <div class="flex-col center" target="frame">
        <label class="block text-center font-bold text-md">РЕГИСТРАЦИЯ</label>
        <div class="mt-9 h-mdh w-mdw">
            <BaseInput placeholder="+7(___)-__-__" v-model="numberPhone" :type="InputType.Phone" :mask="'+7(###)###-##-##'" :maxlength="16"/>
        </div>
        <div class="mt-8 h-mdh w-mdw">
            <BaseButton name="Запросить СМС код" class="btn-primary" @click="RequestSmsCodeWeb"/>
        </div>
        <label class="block text-center mt-4 font-semibold text-base">Уже есть аккаунт</label>
    </div>
    <ModalInfo @closeModal="hideModalInfo" :hidden="ModalInfoHidden" :text="text" />

</template>