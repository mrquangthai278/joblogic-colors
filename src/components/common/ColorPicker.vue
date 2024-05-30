<template>
  <div class="relative">
    <slot name="content" v-bind="{ active: triggerClickInput }"></slot>

    <input
      :class="[
        $scopedSlots.content &&
          'absolute invisible w-0 h-0 left-0 bottom-0 -translate-x-1/2',
      ]"
      ref="mainInput"
      type="color"
      :value="value"
      @input="onInputValue"
    />
  </div>
</template>

<script>
export default {
  name: "ColorPicker",

  props: {
    value: {
      type: String,
      default: () => "",
    },
  },

  emits: ["change", "input"],

  methods: {
    triggerClickInput() {
      if (this.$refs.mainInput) {
        this.$refs.mainInput.click();
      }
    },

    onInputValue(e) {
      const { value } = e.target;
      this.$emit("input", value);
    },
  },
};
</script>