<script setup lang="ts">
import { object, string } from "yup";
import { useAuthenticationStore } from "~/store/Authentication";
import { Step } from "@/types/Form";
import { RegisterPaylod } from "@/types/Register";

const store = useAuthenticationStore();
const { register } = store;

const done = ref<boolean>(false);
const showButtons = ref<boolean>(true);
const registration = reactive<RegisterPaylod>({});

const submitForm = async (values: RegisterPaylod) => {
  await register(values);
  done.value = true;
  showButtons.value = false;
};

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
    },
  ],
};
</script>

<template>
  <div class="bg-black">
    <TheMultiStepForm
      class="px-6 py-10 lg:px-8 rounded mx-auto"
      :steps="steps"
      :show-buttons="showButtons"
      @submit-form.once="submitForm"
    >
      <template #header>
        <div class="mx-auto text-center ">
          <h2
            class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4"
          >
            Registrace
          </h2>
        </div>
      </template>
      <template #step0>
        <div class="sm:col-span-2">
          <DynamicForm :schema="firstFormSchema" />
        </div>
      </template>
    </TheMultiStepForm>
  </div>
</template>
