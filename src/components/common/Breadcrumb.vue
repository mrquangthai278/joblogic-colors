<template>
  <div class="flex gap-2">
    <div v-for="(item, index) in data" class="flex items-center gap-2" :key="$kebabCase(item?.label)">
      <template v-if="item?.to">
        <router-link :to="item.to">{{ item?.label }}</router-link>
      </template>
      <template v-else>
        <span>{{ item?.label }}</span>
      </template>

      <span v-if="seperator && index < data?.length - 1">
        <slot name="seperator">
          {{ seperator }}
        </slot>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';

interface DataItem {
  label: string;
  to?: string
}

@Component
export default class BreadcrumbCommon extends Vue {
  @Prop({ type: Array, default: () => [], required: true }) data!: DataItem[];
  @Prop({ type: String, default: '>' }) seperator!: string;
}
</script>