<template>
  <div class="flex">
    <div v-for="(item, index) in data" class="flex-1" :key="index">
      <ColorItem :data="item" :canCopy="canCopy" :customClass="classItem" />

      <slot name="itemFooter" v-bind="{ item, index }" />
    </div>
  </div>
</template>

<script>
import ColorItem from "@/components/combination/ColorItem";

export default {
  name: "ColorsBar",

  components: {
    ColorItem,
  },

  props: {
    data: {
      type: Array,
      default: () => [],
    },

    classItem: {
      type: String,
      default: () => "",
    },

    canCopy: {
      type: Boolean,
      default: () => false,
    },
  },
};
</script>