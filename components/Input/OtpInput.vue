<template>
  <div class="d-flex">
    <SingleOtpInput
      v-for="(item, i) in numInputs"
      :key="i"
      :position="i"
      :num-inputs="numInputs"
      :focus="activeInput === i"
      :value="otp[i]"
      :separator="separator"
      :input-classes="inputClasses"
      :is-last-child="i === numInputs - 1"
      :should-auto-focus="shouldAutoFocus"
      :valid="valid"
      @on-change="handleOnChange"
      @on-keydown="handleOnKeyDown"
      @on-paste="handleOnPaste"
      @on-focus="handleOnFocus(i)"
      @on-blur="handleOnBlur"
    />
  </div>
</template>

<script>
import SingleOtpInput from "./SingleOtpInput.vue";

// keyCode constants
const BACKSPACE = 8;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const DELETE = 46;

export default {
  name: "OtpInput",
  components: {
    SingleOtpInput,
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    numInputs: {
      type: Number,
      default: 4,
    },
    separator: {
      type: String,
      default: "**",
    },
    inputClasses: {
      type: String,
      default: "",
    },
    valid: {
      type: Boolean,
      default: true,
    },
    shouldAutoFocus: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      activeInput: 0,
      otp: [],
      oldOtp: [],
    };
  },

  methods: {
    handleOnFocus(index) {
      this.activeInput = index;
    },
    handleOnBlur() {
      this.activeInput = -1;
    },
    // Helper to return OTP from input
    checkFilledAllInputs() {
      if (this.otp.join("").length === this.numInputs) {
        const value = this.otp.join("");
        this.$emit("input", value);
        return this.$emit("on-complete", value);
      }
      return null;
    },
    // Focus on input by index
    focusInput(input) {
      this.activeInput = Math.max(Math.min(this.numInputs - 1, input), 0);
    },
    // Focus on next input
    focusNextInput() {
      this.focusInput(this.activeInput + 1);
    },
    // Focus on previous input
    focusPrevInput() {
      this.focusInput(this.activeInput - 1);
    },
    // Change OTP value at focused input
    changeCodeAtFocus(value) {
      this.oldOtp = Object.assign([], this.otp);
      this.$set(this.otp, this.activeInput, value);
      if (this.oldOtp.join("") !== this.otp.join("")) {
        this.$emit("on-change", this.otp.join(""));
        this.checkFilledAllInputs();
      }
    },
    // Handle pasted OTP
    handleOnPaste(event) {
      event.preventDefault();
      const pastedData = event.clipboardData
        .getData("text/plain")
        .slice(0, this.numInputs - this.activeInput)
        .split("");
      // Paste data from focused input onwards
      const currentCharsInOtp = this.otp.slice(0, this.activeInput);
      const combinedWithPastedData = currentCharsInOtp.concat(pastedData);
      this.otp = combinedWithPastedData.slice(0, this.numInputs);
      this.focusInput(combinedWithPastedData.slice(0, this.numInputs).length);
      return this.checkFilledAllInputs();
    },
    handleOnChange(value) {
      this.changeCodeAtFocus(value);
      this.focusNextInput();
    },
    clearInput() {
      if (this.otp.length > 0) {
        this.$emit("on-change", "");
      }
      this.otp = [];
      this.activeInput = 0;
    },
    // Handle cases of backspace, delete, left arrow, right arrow
    handleOnKeyDown(event) {
      switch (event.keyCode) {
        case BACKSPACE:
          event.preventDefault();
          this.changeCodeAtFocus("");
          this.focusPrevInput();
          break;
        case DELETE:
          event.preventDefault();
          this.changeCodeAtFocus("");
          break;
        case LEFT_ARROW:
          event.preventDefault();
          this.focusPrevInput();
          break;
        case RIGHT_ARROW:
          event.preventDefault();
          this.focusNextInput();
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss">
.otp {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 10px;
}
.otp-input {
  position: relative;
  border: 1.5px solid $gray-200;
  border-radius: 4px;
  width: 40px;
  height: 60px;
  font-family: $font-family-sans-serif;
  font-size: 30px;
  caret-color: transparent;
  text-align: center;

  &:active {
    border: 1.5px solid $gray-400;
  }
  &:focus {
    border: 1.5px solid $gray-400;
    -webkit-animation: blink 0.9s infinite; /* Safari 4+ */
    -moz-animation: blink 0.9s infinite; /* Fx 5+ */
    -o-animation: blink 0.9s infinite; /* Opera 12+ */
    animation: blink 0.9s infinite; /* IE 10+, Fx 29+ */
  }
  &:focus-visible {
    border: 1.5px solid $gray-400;
    outline: 0px;
  }
}

@-webkit-keyframes blink {
  0%,
  49% {
    background: linear-gradient($black 2px, transparent 0px, transparent)
      no-repeat padding-box;
    background-size: 25px;
    background-position-x: 7px;
    background-position-y: 50px;
  }
  50%,
  100% {
    background-color: transparent;
    background-size: 25px;
    background-position-x: 7px;
    background-position-y: 50px;
  }
}
</style>
