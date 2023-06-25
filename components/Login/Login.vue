<script setup lang="ts">
import { object, string } from "yup";
import { useAuthenticationStore } from "~/store/Authentication";
import { Step } from "~/types/Form";
import { LoginPayload } from "@/types/Login";

const store = useAuthenticationStore();
const { loginUser } = store;

const showButtons = ref<boolean>(true);
const login = reactive<LoginPayload>({});

const submitForm = async (values: LoginPayload) => {
  try {
    await loginUser(values);
  } catch (e) {
    console.log("e", e);
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
  <div class="bg-card lg:min-w-463px max-w-md p-32px rounded-lg">
    <TheMultiStepForm
      class="rounded mx-auto"
      :steps="steps"
      :show-buttons="showButtons"
      @submit-form.once="submitForm"
    >
      <template #header>
        <div class="text-left flex">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 mb-4 w-50">
            Login
          </h2>
          <span class="w-50 text-black text-xs leading-8">
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
  </div>
</template>
