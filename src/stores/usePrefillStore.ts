import { create } from 'zustand'
import { type NodeID, type FieldSchemaPropertyName } from '../types/ActionBlueprintGraph'

type PrefillStore = {
  prefillMap: Record<NodeID, Record<FieldSchemaPropertyName, { node_id: NodeID, property: FieldSchemaPropertyName}>>
  setPrefill: (node_id: NodeID, property_name: FieldSchemaPropertyName, mapped_node_id: NodeID, mapped_property_name: FieldSchemaPropertyName) => void
  removePrefill: (node_id: NodeID, property_name: FieldSchemaPropertyName) => void
}

export const usePrefillStore = create<PrefillStore>((set) => ({
  prefillMap: {},
  setPrefill: (
    node_id: NodeID,
    property_name: FieldSchemaPropertyName,
    mapped_node_id: NodeID,
    mapped_property_name: FieldSchemaPropertyName
  ) => set((state) => ({
    prefillMap: {
      ...state.prefillMap,
      [node_id]: {
        ...(state.prefillMap[node_id] || {}),
        [property_name]: { node_id: mapped_node_id, property: mapped_property_name}
      }
    }
  })),
  removePrefill: (node_id: NodeID, property_name: FieldSchemaPropertyName) => set((state) => {
    const { [property_name]: _, ...nodeWithoutProperty } = state.prefillMap[node_id]
    return {
      prefillMap: {
        ...state.prefillMap,
        [node_id]: {
          ...nodeWithoutProperty
        }
      }
    }
  })
}))
