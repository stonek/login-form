<script setup lang="ts">
import { object, string } from "yup";
import { useAuthenticationStore } from "~/store/Authentication";
import { Step } from "~/types/Form";
import { LoginPayload } from "@/types/Login";
const swal = inject("$swal");

const store = useAuthenticationStore();
const { loginUser } = store;

const showButtons = ref<boolean>(true);
const login = reactive<LoginPayload>({});

const submitForm = async (values: LoginPayload) => {
  try {
    await loginUser(values);
    swal.fire({
      icon: "success",
      title: "You are logged in",
      showConfirmButton: false,
    });
  } catch (e) {
    console.log("e", e);
    swal.fire({
      icon: "error",
      title: "Oops...",
      text: JSON.stringify(e.value.data),
      showConfirmButton: false,
    });
  }
};

const schema = object({
  email: string().email().required("Pole je povinné."),
});

const steps: Array<Step> = [{ validationSchema: schema }];

const firstFormSchema = {
  fields: [
    {
      label: "Email",
      value: login?.email,
      name: "email",
      as: "input",
      type: "text",
      id: "email",
      class:
        "bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",
    },
    {
      label: "Heslo",
      value: login?.password,
      name: "password",
      as: "input",
      type: "password",
      id: "password",
      class:
        "bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",
    },
  ],
};
</script>

<template>
  <TheMultiStepForm
    class="rounded mx-auto"
    :steps="steps"
    :show-buttons="showButtons"
    submit-save-text="Přihlásit se"
    @submit-form="submitForm"
  >
    <template #header>
      <div class="text-left block md:flex">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900 mb-4 w-50">
          Login
        </h2>
        <span
          class="w-100 md:w-80 text-black text-xs leading-8 text-right mt-1"
        >
          Jste nový uživatel?
          <NuxtLink to="/registration" class="text-blue ml-auto underline"
            >Registrovat se</NuxtLink
          ></span
        >
      </div>
    </template>
    <template #step0>
      <div>
        <DynamicForm :schema="firstFormSchema" />
      </div>
    </template>
  </TheMultiStepForm>
</template>
