<template>
  <div>
    <input
      ref="input"
      v-model="model"
      type="text"
      maxlength="1"
      :class="[inputClasses, activeClasses, { invalid: !valid }]"
      @input="handleOnChange"
      @keydown="handleOnKeyDown"
      @paste="handleOnPaste"
      @focus="handleOnFocus"
      @blur="handleOnBlur"
    />
  </div>
</template>

<script>
export default {
  name: "SingleOtpInput",
  props: {
    value: {
      type: String,
      default: "",
    },
    position: {
      type: Number,
      default: 0,
    },
    numInputs: {
      type: Number,
      default: 4,
    },
    focus: {
      type: Boolean,
    },
    inputClasses: {
      type: String,
      default: "",
    },
    shouldAutoFocus: {
      type: Boolean,
    },
    valid: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      model: this.value || "",
      activeClasses: null,
    };
  },
  watch: {
    value(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.model = newValue;
      }
      if (this.position + 1 === this.numInputs) {
        this.$refs.input.blur();
      }
      this.isValid();
    },
    // whenever question changes, this function will run
    focus(newFocusValue, oldFocusValue) {
      // Check if focusedInput changed
      // Prevent calling function if input already in focus
      if (oldFocusValue !== newFocusValue && this.$refs.input && this.focus) {
        this.$refs.input.focus();
        this.$refs.input.select();
      }
    },
  },
  mounted() {
    if (this.$refs.input && this.focus && this.shouldAutoFocus) {
      this.$refs.input.focus();
    }
  },
  methods: {
    isValid() {
      if (this.model !== "") {
        this.activeClasses = "green";
      } else {
        this.activeClasses = "";
      }
    },
    handleOnChange() {
      if (this.model.length > 1) {
        this.model = this.model.slice(0, 1);
      }
      this.isValid();
      return this.$emit("on-change", this.model);
    },
    handleOnKeyDown(event) {
      this.$emit("on-keydown", event);
    },
    handleOnPaste(event) {
      return this.$emit("on-paste", event);
    },
    handleOnFocus() {
      this.isValid();
      this.activeClasses = "active-input";
      this.$refs.input.select();
      return this.$emit("on-focus");
    },
    handleOnBlur() {
      this.isValid();
      return this.$emit("on-blur");
    },
  },
};
</script>

<style lang="scss" scoped>
input {
  padding: 0px;
}
.active-input {
  padding: relative;
}

.green {
  border: 1.5px solid #b3e8ce;
  color: $green;
}

.invalid {
  border: 1.5px solid #f5dcda;
  color: $red;
}
</style>
