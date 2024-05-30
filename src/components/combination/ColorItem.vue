<template>
  <div class="block relative group" :class="customClass ? customClass : 'h-[75px] lg:h-[100px]'" :style="getItemStyles"
    @click="$emit('click', data)">
    <div v-if="canCopy || isMessaging"
      class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 z-10 cursor-pointer group-hover:flex w-full h-full items-center justify-center text-white"
      :class="[isMessaging ? 'flex' : 'hidden']" @click="handleClickCopy">
      <span v-if="!isCopied">Copy</span>
      <i v-else class="fa-solid fa-check"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "ColorItem",

  props: {
    data: {
      type: [Object, String],
      default: () => null,
    },

    customClass: {
      type: String,
      default: () => "",
    },

    canCopy: {
      type: Boolean,
      default: () => false,
    },
  },

  data() {
    return {
      isCopied: false,

      isMessaging: false,
    };
  },

  computed: {
    getDataValue() {
      return typeof this.data === "string" ? this.data : this.data?.hex;
    },

    getItemStyles() {
      return {
        backgroundColor: this.getDataValue,
      };
    },
  },

  methods: {
    resetStateCopy() {
      this.isMessaging = false;
      this.isCopied = false;
    },


    async handleClickCopy() {
      try {
        await navigator.clipboard.writeText(this.getDataValue);
        this.isCopied = true;
        this.isMessaging = true;

        setTimeout(() => {
          this.resetStateCopy()
        }, 2000);
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    },
  },

  watch: {
    data: {
      deep: true,
      handler() {
        this.resetStateCopy()
      }
    }
  }
};
</script>
