import { defineStore } from 'pinia'
import { treeNodeApi } from '@/api'
import type { ExpandedStateType } from '@/types/views/expanded-state.types'
import type { DbTreeNodeType, ViewTreeNodeType } from '@/types/views/tree-node.types'

interface State {
  items: ViewTreeNodeType[]
  expandedState: ExpandedStateType
  itemsIds: string[]
}

export const useTreeItemsStore = defineStore('tree-items', {
  state: (): State => ({
    items: [],
    expandedState: {},
    itemsIds: []
  }),
  getters: {
    rootItems: (state) => state.items
  },
  actions: {
    async fetchItems() {
      const response = await treeNodeApi.getTasks()
      const expandedStateFromLS = localStorage.getItem('tree-state')

      this.items = this.buildTree(response.data)
      if (expandedStateFromLS) {
        this.expandedState = JSON.parse(expandedStateFromLS)
      } else {
        this.items.forEach((item) => {
          this.expandedState[item.id] = false
        })
      }
    },
    buildTree(data: ViewTreeNodeType[]): ViewTreeNodeType[] {
      const itemMap = new Map<string, ViewTreeNodeType>()
      const treeItems: ViewTreeNodeType[] = []

      data.forEach((item) => {
        item.children = []
        itemMap.set(item.id, item)
      })

      data.forEach((item) => {
        if (item.parent_id) {
          const parent = itemMap.get(item.parent_id)
          if (parent) {
            parent.children.push(item)
          }
        } else {
          treeItems.push(item)
        }
      })
      treeItems.forEach((item) => this.flatTreeNode(item))

      return treeItems.filter((item) => item.parent_id === null)
    },
    toggleExpandState(id: string) {
      this.expandedState[id] = !this.expandedState[id]
      localStorage.setItem('tree-state', JSON.stringify(this.expandedState))
    },
    flatTreeNode(item: ViewTreeNodeType) {
      this.itemsIds.push(item.id)
      item.children.forEach((i) => {
        if (i.children.length) {
          this.flatTreeNode(i)
        } else {
          this.itemsIds.push(i.id)
        }
      })
    }
  }
})
