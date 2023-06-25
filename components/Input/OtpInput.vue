<template>
  <div ref="otpCont" class="flex justify-center gap-7px">
    <input
      v-for="(el, ind) in digits"
      :key="el + ind"
      v-model="digits[ind]"
      type="text"
      class="digit-box bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 w-56px h-72px pl-10px"
      :autofocus="ind === 0"
      :placeholder="ind + 1"
      maxlength="1"
      @keydown="handleKeyDown($event, ind)"
    />
  </div>
</template>
<script setup>
const props = defineProps({
  default: String,

  digitCount: {
    type: Number,
    required: true,
  },
});

const digits = reactive([]);

if (props.default && props.default.length === props.digitCount) {
  for (let i = 0; i < props.digitCount; i++) {
    digits[i] = props.default.charAt(i);
  }
} else {
  for (let i = 0; i < props.digitCount; i++) {
    digits[i] = null;
  }
}

const otpCont = ref(null);
const emit = defineEmits(["update:otp"]);

const isDigitsFull = function () {
  for (const elem of digits) {
    if (elem == null || elem === undefined) {
      return false;
    }
  }

  return true;
};
const handleKeyDown = function (event, index) {
  if (
    event.key !== "Tab" &&
    event.key !== "ArrowRight" &&
    event.key !== "ArrowLeft"
  ) {
    event.preventDefault();
  }

  if (event.key === "Backspace") {
    digits[index] = null;

    if (index != 0) {
      otpCont.value.children[index - 1].focus();
    }

    return;
  }

  if (new RegExp("^([0-9])$").test(event.key)) {
    digits[index] = event.key;

    if (index != props.digitCount - 1) {
      otpCont.value.children[index + 1].focus();
    }
  }
  if (isDigitsFull()) {
    emit("update:otp", digits.join(""));
  }
};
</script>

<style scoped>
.digit-box {
  font-size: 32px;
  font-weight: 700;
  line-height: 39px;
  letter-spacing: 0em;
  text-align: center;
}
</style>
