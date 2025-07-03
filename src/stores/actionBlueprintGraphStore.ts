import { create } from 'zustand'
import { type ActionBlueprintGraph } from '../types/ActionBlueprintGraph'

interface ActionBlueprintGraphStore {
  actionBlueprintGraph: ActionBlueprintGraph | null,
  setFromActionBlueprintGraph: (graph: ActionBlueprintGraph) => void,
}

export const useActionBlueprintGraphStore = create<ActionBlueprintGraphStore>((set) => ({
  actionBlueprintGraph: null,
  setFromActionBlueprintGraph: (graph: ActionBlueprintGraph) => set({actionBlueprintGraph: graph}),
}))
