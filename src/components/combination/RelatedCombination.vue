<template>
  <div
    class="relative group border border-gray-300"
    @click="$emit('click', data)"
  >
    <ColorsBar :data="data?.colors ?? []" classItem="h-[50px] lg:h-[75px]" />

    <div
      class="group-hover:block hidden absolute w-full bottom-0 left-0 h-1/2 bg-white text-black"
    >
      <div class="flex justify-between items-center h-full px-2">
        <div class="flex-1 flex items-center">
          <p class="text-left truncate">{{ data?.name }}</p>
        </div>
        <div class="flex gap-1 items-center">
          <span>
            <i
              :class="
                data?.liked ? 'far fa-heart' : 'fas fa-heart text-red-500'
              "
            ></i>
          </span>
          <span class="text-sm">{{ data?.likes ?? 0 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ColorsBar from "@/components/combination/ColorsBar.vue";

export default {
  name: "RelatedCombination",

  components: {
    ColorsBar,
  },

  props: {
    data: {
      type: Object,
      default: () => null,
    },
  },
};
</script>