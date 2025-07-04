import * as z from "zod/v4"

export const SLADuration = z.object({
  number: z.number(),
  unit: z.string(),
})

export const Position = z.object({
  x: z.number(),
  y: z.number(),
})

// export const FieldSchemaPropertyButton = z.object({
//   avantos_type: z.literal("button"),
//   title: z.string(),
//   type: z.string(),
// })

// export const FieldSchemaPropertyCheckboxGroup = z.object({
//   avantos_type: z.literal("checkbox-group"),
//   items: z.object({
//     enum: z.array(z.string()),
//     type: z.string(),
//   }),
//   type: z.string(),
//   uniqueItems: z.boolean(),
// })

// export const FieldSchemaPropertyObjectEnum = z.object({
//   avantos_type: z.literal("object-enum"),
//   enum: z.any(),
//   title: z.string(),
//   type: z.string(),
// })

// export const FieldSchemaPropertyShortText = z.object({
//   avantos_type: z.literal("short-text"),
//   format: z.string(),
//   title: z.string(),
//   type: z.string(),
// })

// export const FieldSchemaPropertyMultiSelect = z.object({
//   avantos_type: z.literal("multi-select"),
//   items: z.object({
//     enum: z.array(z.string()),
//     type: z.string(),
//   }),
//   type: z.string(),
//   uniqueItems: z.boolean(),
// })

// export const FieldSchemaPropertyMultiLineText = z.object({
//   avantos_type: z.literal("multi-line-text"),
//   title: z.string(),
//   type: z.string(),
// })

// export const FieldSchemaProperty = z.union([
//   FieldSchemaPropertyButton,
//   FieldSchemaPropertyCheckboxGroup,
//   FieldSchemaPropertyObjectEnum,
//   FieldSchemaPropertyShortText,
//   FieldSchemaPropertyMultiSelect,
//   FieldSchemaPropertyMultiLineText,
// ])

export const FieldSchemaProperties = z.record(z.string(), z.any())

export const FieldSchema = z.object({
  type: z.string(),
  properties: FieldSchemaProperties,
})

export const Form = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  is_reusable: z.boolean(),
  field_schema: FieldSchema,
})

export const Edge = z.object({
  source: z.string(),
  target: z.string(),
})

export const NodeData = z.object({
  id: z.string(),
  component_key: z.string(),
  component_type: z.string(),
  component_id: z.string(),
  name: z.string(),
  prerequisites: z.array(z.string()),
  permitted_roles: z.array(z.string()),
  input_mapping: z.object(),
  sla_duration: SLADuration,
  approval_required: z.boolean(),
  approval_roles: z.array(z.string()),
})

export const Node = z.object({
  id: z.string(),
  type: z.string(),
  position: Position,
  data: NodeData,
})

export const ActionBlueprintGraphSchema = z.object({
  "$schema": z.string(),
  id: z.string(),
  tenant_id: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.string(),
  nodes: z.array(Node),
  edges: z.array(Edge),
  forms: z.array(Form),
  branches: z.array(z.string()),
  triggers: z.array(z.string()),
})

export type ActionBlueprintGraph = z.infer<typeof ActionBlueprintGraphSchema>
export type Node = z.infer<typeof Node>
export type NodeData = z.infer<typeof NodeData>
export type Edge = z.infer<typeof Edge>
export type Form = z.infer<typeof Form>
export type FieldSchema = z.infer<typeof FieldSchema>
export type FieldSchemaProperties = z.infer<typeof FieldSchemaProperties>
// export type FieldSchemaProperty = z.infer<typeof FieldSchemaProperty>
// export type FieldSchemaPropertyButton = z.infer<typeof FieldSchemaPropertyButton>
// export type FieldSchemaPropertyCheckboxGroup = z.infer<typeof FieldSchemaPropertyCheckboxGroup>
// export type FieldSchemaPropertyObjectEnum = z.infer<typeof FieldSchemaPropertyObjectEnum>
// export type FieldSchemaPropertyShortText = z.infer<typeof FieldSchemaPropertyShortText>
// export type FieldSchemaPropertyMultiSelect = z.infer<typeof FieldSchemaPropertyMultiSelect>
// export type FieldSchemaPropertyMultiLineText = z.infer<typeof FieldSchemaPropertyMultiLineText>
export type Position = z.infer<typeof Position>
export type SLADuration = z.infer<typeof SLADuration>
