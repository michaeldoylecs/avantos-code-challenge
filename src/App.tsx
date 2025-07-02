import { useEffect, useState } from 'react'
import * as z from "zod/v4"
import './App.css'

const SLADuration = z.object({
  number: z.number(),
  unit: z.string(),
})

const Position = z.object({
  x: z.number(),
  y: z.number(),
})

const Form = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  is_reusable: z.boolean(),
  field_schema: z.object(), // Left untyped
})

const Edge = z.object({
  source: z.string(),
  target: z.string(),
})

const NodeData = z.object({
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

const Node = z.object({
  id: z.string(),
  type: z.string(),
  position: Position,
  data: NodeData,
})

const ActionBlueprintGraphSchema = z.object({
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

type ActionBlueprintGraph = z.infer<typeof ActionBlueprintGraphSchema>

function App() {
  const [data, setData] = useState<ActionBlueprintGraph>()
  
  useEffect(() => {
    fetch("http://localhost:3000/api/v1/1/actions/blueprints/1/graph/")
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error(`HTTP error: ${response.status}`)
        }
      })
      .then(data => {
        return ActionBlueprintGraphSchema.parse(data)
      })
      .then(data => {
        setData(data)
      })
  }, [])

  return (
    <>
      <div>
        <code>
          {JSON.stringify(data, null, 2)}
        </code>
      </div>
    </>
  )
}

export default App
