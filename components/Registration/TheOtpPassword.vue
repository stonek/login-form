<script setup lang="ts">
import { object, string } from "yup";
import { useAuthenticationStore } from "~/store/Authentication";
import { OtpPayload } from "@/types/Register";
import otpInput from "~/components/Input/OtpInput.vue";

const store = useAuthenticationStore();
const { validateCode } = store;

const done = ref<boolean>(false);
const showButtons = ref<boolean>(true);
const registration = reactive<RegisterPaylod>({});

const submitForm = async (values: OtpPayload) => {
  try {
    await values;
    done.value = true;
    showButtons.value = false;
  } catch (e) {
    console.log("e", e);
  }
};

const schema = object({
  otp: string().email().required("Pole je povinné."),
});

const firstFormSchema = {
  fields: [
    {
      label: "",
      value: registration?.otp,
      name: "otp",
      as: 'input',
      type: "text",
      id: "email",
      class:
        "bg-white border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5",
    },
  ],
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
      <Form :validation-schema="schema" keep-values @submit="submitForm">
        <DynamicForm :schema="firstFormSchema" />
      </Form>
    </div>
  </div>
</template>
