<script setup lang="ts">
import { object, string } from "yup";
import { useAuthenticationStore } from "~/store/Authentication";
import { Step } from "@/types/Form";
import { RegisterPaylod } from "@/types/Register";
const swal = inject("$swal");
const store = useAuthenticationStore();
const { register } = store;
const showButtons = ref<boolean>(true);
const registration = reactive<RegisterPaylod>({ email: "" });

async function submitForm(values: RegisterPaylod) {
  try {
    await register(values);
    await navigateTo({
      path: "/registration/otp",
      query: {
        email: values.email,
      },
    });
  } catch (error) {
    swal.fire({
      icon: "error",
      title: "Oops...",
      text: "somthing went wrong",
      showConfirmButton: false,
    });
  }
}

const schema = object({
  email: string().email().required("Pole je povinné."),
});

const steps: Array<Step> = [{ validationSchema: schema }];

const firstFormSchema = {
  fields: [
    {
      label: "Email",
      value: registration?.email,
      name: "email",
      as: "input",
      type: "text",
      id: "email",
      placeholder: "test@test.com",
      class:
        "bg-white border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5",
    },
  ],
};
</script>
<template>
  <TheMultiStepForm
    class="rounded mx-auto"
    :steps="steps"
    :show-buttons="showButtons"
    submit-save-text="Registrovat se"
    @submit-form="submitForm"
  >
    <template #header>
      <div class="text-left block md:flex">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900 mb-4">
          Registrace
        </h2>
        <span
          class="w-100 md:w-80 text-black text-xs leading-8 text-right mt-1"
        >
          Máte účet?
          <NuxtLink to="/" class="text-blue ml-auto underline"
            >Přihlaste se</NuxtLink
          ></span
        >
      </div>
      <span class="w-100 text-black text-xs text-left mt-1">
        Na e-mail Vám bude zaslán ověřovací kód. Po ověření prosím pokračujte v
        dalších krocích registrace.</span
      >
    </template>
    <template #step0>
      <div>
        <DynamicForm :schema="firstFormSchema" />
      </div>
    </template>
  </TheMultiStepForm>
</template>
