import axios from 'axios'
import { TreeNodeApi } from './tree-node.api'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
})

export const treeNodeApi = new TreeNodeApi(axiosInstance)
