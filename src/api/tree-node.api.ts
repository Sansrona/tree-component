import type { AxiosInstance } from 'axios'
import { BasicRest } from './core'
import type { ViewTreeNodeType } from '../types/views/tree-node.types'

export class TreeNodeApi extends BasicRest {
  url = 'items'

  constructor(endpoint: AxiosInstance) {
    super(endpoint)
  }

  async getTasks() {
    return await this.getRequest<ViewTreeNodeType[]>(`${this.url}`)
  }
}
