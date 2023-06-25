<script setup lang="ts">
import { object, string } from "yup";
import { useAuthenticationStore } from "~/store/Authentication";
import { Step } from "@/types/Form";
import { RegisterPaylod } from "@/types/Register";
const swal = inject("$swal");
const store = useAuthenticationStore();
const { register } = store;
const showButtons = ref<boolean>(true);
const registration = reactive<RegisterPaylod>({});

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
      class:
        "bg-white border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5",
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
      submit-save-text="Registrovat se"
      @submit-form="submitForm"
    >
      <template #header>
        <div class="text-left">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 mb-4">
            Registrace
          </h2>
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
