<script setup lang="ts">
import { ref } from 'vue'
import { useTreeItemsStore } from '@/stores/tree-node-items';
import TreeNode from '@/components/TreeNode.vue';

const treeNodesStore = useTreeItemsStore();

const currentKey = ref(0);


const handleToggle = (id: string) => {
  treeNodesStore.toggleExpandState(id)
};

const rerender = () => {
  currentKey.value += 1;
  console.log('Rerender triggered');
};

treeNodesStore.fetchItems();
</script>

<template>
  <div :key="currentKey">
    <button class="button" @click="rerender">Ререндер</button>
    <ul class="list">
      <TreeNode class="top-level" v-for="item in treeNodesStore.rootItems" :key="item.id" :item="item"
        :nodeIdsInOrder="treeNodesStore.itemsIds" :expandedState="treeNodesStore.expandedState" @toggle="handleToggle"
        :depth="0" />
    </ul>
  </div>
</template>
<style scoped>
.button {
  margin-bottom: 10px;
}
</style>
