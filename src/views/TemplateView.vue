<template>
  <div class="relative py-8">
    <!-- <p class="text-white z-20 relative">{{ currentTemplateInfo }}</p> -->

    <div class="absolute w-full top-0 left-0 h-[375px]">
      <img
        class="w-full h-full object-bottom"
        src="@/assets/images/asset/foreground.png"
        :style="getMainBackgroundStyles"
      />
    </div>

    <div class="relative z-10 container m-auto">
      <div
        class="h-[calc(375px-200px)] flex flex-col items-center"
        :class="getMainTitleClasses"
      >
        <Breadcrumb :data="getBreadcrumbData">
          <template #seperator>
            <i class="fa-solid fa-chevron-right"></i>
          </template>
        </Breadcrumb>

        <h1 class="mt-2 text-4xl font-bold text-center">
          {{ getCurrentTemplateDetail?.name }}
          <br />
          color combination
        </h1>
      </div>

      <TemplateCard
        :data="getCurrentTemplateDetail"
        @changeColor="handleChangeColorItem"
      />

      <div class="mt-8">
        <h1 class="text-black text-4xl font-bold text-center">
          Related Combinations
        </h1>

        <div class="grid grid-cols-2 gap-8 mt-4">
          <div v-for="item in getCurrentTemplateListRelated" :key="item.slug">
            <RelatedCombination
              class="cursor-pointer"
              :data="item"
              @click="handleClickTemplateRelatedItem"
            />
          </div>

          <button
            v-if="isCanLoadMore"
            class="bg-gray-300 flex items-center justify-center h-[50px] lg:h-[75px] hover:opacity-80"
            @click="loadMoreListData"
          >
            <p>See more combinations</p>
          </button>
        </div>
      </div>

      <div class="mt-16 flex flex-col gap-4 items-center">
        <p class="text-xl text-center">
          Use this color pallete and create beautiful designs and documents!
        </p>

        <button
          class="w-fit py-2 px-4 rounded-sm hover:opacity-80"
          :style="getMainBackgroundStyles"
          @click="handeClickBrowse"
        >
          <p :class="getMainTitleClasses">Browse templates</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script >
import set from "lodash/set";
import cloneDeep from "lodash/cloneDeep";

import Breadcrumb from "@/components/common/Breadcrumb";
import TemplateCard from "@/components/card/TemplateCard";
import RelatedCombination from "@/components/combination/RelatedCombination";

import ListHandler from "@/mixins/ListHandler";

import listCombinations from "@/assets/jsons/combinations/combinations.json";

import { mixColors, isBlackOrWhite } from "@/ultils/color";

export default {
  name: "TemplateView",

  components: {
    Breadcrumb,
    TemplateCard,
    RelatedCombination,
  },

  mixins: [ListHandler()],

  props: {
    slug: {
      type: String,
      default: () => "",
    },
  },

  data() {
    return {
      currentTemplateInfo: null,
    };
  },

  computed: {
    getMainColorTheme() {
      const defaultColor = "#f9ccd3";

      if (!this.getCurrentTemplateDetail) return defaultColor;

      const [color1, color2, color3, color4] =
        this.getCurrentTemplateDetail?.colors?.map((item) => item.hex);

      return mixColors(color1, color2, color3, color4);
    },

    getMainTitleClasses() {
      return isBlackOrWhite(this.getMainColorTheme) === "black"
        ? "text-white"
        : "text-black";
    },

    getMainBackgroundStyles() {
      return {
        backgroundColor: this.getMainColorTheme,
      };
    },

    getCurrentTemplateDetail() {
      return this.currentTemplateInfo;
    },
    getCurrentTemplateListRelated() {
      return this.getListDataView;
    },

    getBreadcrumbData() {
      return [
        { label: "Colors", to: "/" },
        { label: "Colors Palettes", to: "/" },
        { label: this.getCurrentTemplateDetail?.name },
      ];
    },
  },

  methods: {
    fetchCurrentTemplateInfo(slug) {
      const { combinations = [] } = listCombinations;

      try {
        const foundTemplate = combinations.find(
          (item) => slug === item?.combination?.slug
        );

        if (!foundTemplate || !this.slug)
          throw new Error("Not found combination");

        const resultTemplate = cloneDeep(foundTemplate);

        this.currentTemplateInfo = resultTemplate?.combination;
        this.setListData(resultTemplate?.relatedCombinations);
      } catch (e) {
        console.log("Getting default combination!");

        const defaultInfo = cloneDeep(combinations[0]);

        this.currentTemplateInfo = defaultInfo.combination;
        this.setListData(defaultInfo.relatedCombinations);
      }
    },

    handleClickTemplateRelatedItem(item) {
      this.$router.push({
        name: "template",
        params: {
          slug: item.slug,
        },
      });
    },

    handleChangeColorItem({ value, index }) {
      set(this.currentTemplateInfo, `colors[${index}].hex`, value);
    },

    handeClickBrowse() {
      console.log("Payload:", this.currentTemplateInfo);
    },
  },

  created() {
    this.fetchCurrentTemplateInfo(this.slug);
  },

  watch: {
    slug: {
      handler(newVal) {
        this.fetchCurrentTemplateInfo(newVal);
      },
    },
  },
};
</script>
