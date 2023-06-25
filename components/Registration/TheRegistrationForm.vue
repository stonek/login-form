<script setup lang="ts">
import { object, string } from "yup";
import { useAuthenticationStore } from "~/store/Authentication";
import { Step } from "@/types/Form";
import { RegisterPaylod } from "@/types/Register";
const swal = inject("$swal");
const store = useAuthenticationStore();
const { register } = store;
const router = useRouter();
const done = ref<boolean>(false);
const showButtons = ref<boolean>(true);
const registration = reactive<RegisterPaylod>({});

const submitForm = async (values: RegisterPaylod) => {
  const data: any = await register(values);
  console.log("data", data.value.statusCode);
  if (data.value.statusCode !== 200) {
    swal.fire({
      icon: "error",
      title: "Oops...",
      text: JSON.stringify(data.value.data),
      showConfirmButton: false,
    });
  } else {
    router.push({ path: "/registration/otp" });
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
      @submit-form.once="submitForm"
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
