<template>
  <li>
    <div :style="{ paddingLeft: depth * 20 + 'px' }" :class="className">
      <span @click="toggle" class="icon">{{ icon }}</span>
      <span @click="toggle">{{ item.title }}</span>
    </div>
    <ul class="list" v-if="expanded">
      <TreeNode v-for="child in item.children" :key="child.id" :item="child" :depth="depth + 1"
        :nodeIdsInOrder="nodeIdsInOrder" :expandedState="expandedState" @toggle="handleToggle" />
    </ul>
  </li>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import type { ExpandedStateType } from '@/types/views/expanded-state.types'
import type { ViewTreeNodeType } from '@/types/views/tree-node.types'
const props = defineProps<{
  item: ViewTreeNodeType,
  expandedState: ExpandedStateType
  depth: number
  nodeIdsInOrder: string[];
}>();
const emits = defineEmits(['toggle']);

const expanded = computed(() =>
  props.expandedState[props.item.id]
);

const icon = computed(() => {
  if (!props.item.children || props.item.children.length === 0) {
    return '-';
  }
  return expanded.value ? '▼' : '▶';
});

const className = computed(() => {
  const index = props.nodeIdsInOrder.indexOf(props.item.id)
  if (props.item.parent_id === null) return 'odd'
  return index % 2 === 0 ? 'even' : 'odd';
});
console.log('Component Rendered', props.item.id);

const toggle = () => {
  emits('toggle', props.item.id);
};

const handleToggle = (id: string) => {
  emits('toggle', id);
};

</script>

<style scoped>
div {
  cursor: pointer;
}

.top-level>.odd {
  background-color: #2f2f2f;
}

.even {
  background-color: #fff;
}

.odd {
  background-color: #dfdfdf;
}
</style>