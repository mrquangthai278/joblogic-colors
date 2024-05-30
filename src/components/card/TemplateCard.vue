<template>
  <div>
    <div class="relative">
      <img
        v-if="data?.featuredImage?.url"
        class="w-full object-cover"
        :src="require(`@/assets/images/thumbnail/${data?.featuredImage?.url}`)"
        :alt="data?.featuredImage?.alt || data?.slug"
      />
      <div
        class="absolute top-4 right-4 shadow-sm bg-white p-2 text-black flex gap-1 cursor-pointer hover:opacity-80 rounded-sm items-center"
      >
        <span>
          <i
            :class="data?.liked ? 'far fa-heart' : 'fas fa-heart text-red-500'"
          ></i>
        </span>
        <span class="text-sm">{{ data?.likes }}</span>
      </div>
    </div>
    <div>
      <ColorsBar :data="getColorsData" :canCopy="true">
        <template #itemFooter="{ item, index }">
          <div class="flex flex-col text-black mt-5">
            <p class="underline font-bold text-center">{{ item.name }}</p>

            <ColorPicker
              :value="item.hex"
              @input="
                (value) => {
                  $emit('changeColor', {
                    value,
                    index,
                  });
                }
              "
            >
              <template #content="{ active }">
                <div class="flex justify-center">
                  <span
                    class="uppercase text-gray-500 cursor-pointer hover:opacity-80 text-center"
                    @click="active"
                  >
                    {{ item.hex }}
                  </span>
                </div>
              </template>
            </ColorPicker>
          </div>
        </template>
      </ColorsBar>
    </div>
  </div>
</template>

<script>
import ColorsBar from "@/components/combination/ColorsBar.vue";

import ColorPicker from "@/components/common/ColorPicker.vue";

export default {
  name: "TemplateCard",

  components: {
    ColorsBar,
    ColorPicker,
  },

  props: {
    data: {
      type: Object,
      default: () => null,
    },
  },

  emits: ["changeColor"],

  computed: {
    getColorsData() {
      const colors = this.data?.colors ?? [];
      return colors;
    },
  },
};
</script>