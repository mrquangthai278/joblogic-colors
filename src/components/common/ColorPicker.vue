<template>
  <div class="relative">
    <slot name="content" :active="triggerClickInput"></slot>

    <input :class="[
      $scopedSlots.content &&
      'absolute invisible w-0 h-0 left-0 bottom-0 -translate-x-1/2',
    ]" ref="mainInput" type="color" :value="value" @input="onInputValue" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Ref } from 'vue-property-decorator';

interface InputEvent extends Event {
  target: HTMLInputElement;
}

@Component
export default class ColorPicker extends Vue {
  @Prop({ default: '' }) value!: string;
  @Ref('mainInput') mainInput!: HTMLInputElement;

  @Emit('input')
  onInputValue(e: InputEvent) {
    return e.target.value
  }

  triggerClickInput() {
    if (this.mainInput) {
      this.mainInput.click();
    }
  }
}
</script>
