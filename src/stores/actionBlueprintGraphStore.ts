import { create } from 'zustand'
import { type ActionBlueprintGraph, type Node, type Form } from '../types/ActionBlueprintGraph'

interface ActionBlueprintGraphStore {
  actionBlueprintGraph: ActionBlueprintGraph | null,
  setFromActionBlueprintGraph: (graph: ActionBlueprintGraph) => void,
  getNodes: () => Node[],
  getForm: (id: string) => Form | null
}

export const useActionBlueprintGraphStore = create<ActionBlueprintGraphStore>((set, get) => ({
  actionBlueprintGraph: null,
  setFromActionBlueprintGraph: (graph: ActionBlueprintGraph) => set({actionBlueprintGraph: graph}),
  getNodes: () => get().actionBlueprintGraph?.nodes || [],
  getForm: (id: string) => get().actionBlueprintGraph?.forms.find((form: Form) => form.id === id) || null
}))
