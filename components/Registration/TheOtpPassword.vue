<script setup lang="ts">
import { useAuthenticationStore } from "~/store/Authentication";
import { OtpPayload } from "@/types/Register";

const store = useAuthenticationStore();
const { validateCode } = store;
const route = useRoute();
const email = route.query.email
  ? route.query.email
  : await navigateTo({
      path: "/",
    });

const payload = reactive<OtpPayload>({
  code: "",
  email,
});

const submitForm = async () => {
  try {
    await validateCode(payload);
    await navigateTo({
      path: "/",
    });
  } catch (e) {
    console.log("e", e);
  }
};
</script>

<template>
  <div class="bg-card lg:min-w-463px max-w-md p-32px rounded-lg">
    <div class="text-left">
      <h2 class="text-2xl font-bold tracking-tight text-gray-900 mb-4">
        Zadejte kód
      </h2>
    </div>
    <div>
      <form @submit.prevent="submitForm">
        <InputOtpInput
          :digit-count="4"
          :default="payload?.code"
          @update:otp="payload.code = $event"
        />
        <button
          type="submit"
          class="flex justify-center items-center w-100 h-10 bg-blue rounded font-semibold text-sm text-center text-white mt-4"
        >
          {{ "Ověřit a pokračovat" }}
        </button>
      </form>
    </div>
  </div>
</template>
