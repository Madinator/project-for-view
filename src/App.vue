<script setup lang="ts">
import { defineComponent } from 'vue';
import Login from "./pages/Login.vue";
import PhoneNumber from "./pages/Registration/PhoneNumber.vue";
import smsCode from "./pages/Registration/smsCode.vue";
import CreatePassword from "./pages/Registration/CreatePassword.vue"

const Component = defineComponent({
    components: {
      Login,
      PhoneNumber,
      smsCode,
      CreatePassword
    }
})

</script>

<template>
  <Login />
</template>

<style lang="scss">


</style>
