import kebabCase from "lodash/kebabCase";

declare module 'vue/types/vue' {
  interface Vue {
    $kebabCase: kebabCase;
  }
}