import { create } from 'zustand'
import { type ActionBlueprintGraph, type Node } from '../types/ActionBlueprintGraph'

interface ActionBlueprintGraphStore {
  actionBlueprintGraph: ActionBlueprintGraph | null,
  setFromActionBlueprintGraph: (graph: ActionBlueprintGraph) => void,
  getNodes: () => Node[],
}

export const useActionBlueprintGraphStore = create<ActionBlueprintGraphStore>((set, get) => ({
  actionBlueprintGraph: null,
  setFromActionBlueprintGraph: (graph: ActionBlueprintGraph) => set({actionBlueprintGraph: graph}),
  getNodes: () => get().actionBlueprintGraph?.nodes || [],
}))
