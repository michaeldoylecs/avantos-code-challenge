import { create } from 'zustand'
import { type ActionBlueprintGraph, type Node, type NodeID, type Form } from '../types/ActionBlueprintGraph'

interface ActionBlueprintGraphStore {
  actionBlueprintGraph: ActionBlueprintGraph | null,
  setFromActionBlueprintGraph: (graph: ActionBlueprintGraph) => void,
  getNode: (node_id: NodeID) => Node | null,
  getNodes: () => Node[],
  getForm: (id: string) => Form | null
}

export const useActionBlueprintGraphStore = create<ActionBlueprintGraphStore>((set, get) => ({
  actionBlueprintGraph: null,
  setFromActionBlueprintGraph: (graph: ActionBlueprintGraph) => set({actionBlueprintGraph: graph}),
  getNode: (node_id: NodeID) => get().actionBlueprintGraph?.nodes.find((node) => node.id == node_id) || null,
  getNodes: () => get().actionBlueprintGraph?.nodes || [],
  getForm: (id: string) => get().actionBlueprintGraph?.forms.find((form: Form) => form.id === id) || null
}))
