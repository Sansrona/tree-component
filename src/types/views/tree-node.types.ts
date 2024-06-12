export type DbTreeNodeType = {
  title: string
  parent_id: string | null
  id: string
}

export type ViewTreeNodeType = DbTreeNodeType & {
  children: ViewTreeNodeType[]
}
