import { useEffect } from 'react'
import './App.css'
import { ActionBlueprintGraphSchema } from './types/ActionBlueprintGraph'
import { useActionBlueprintGraphStore } from './stores/actionBlueprintGraphStore'
import NodeDisplay from './components/NodeDisplay/NodeDisplay'

function App() {
  const actionBlueprintGraph = useActionBlueprintGraphStore((state) => state.actionBlueprintGraph)
  const setFromActionBlueprintGraph = useActionBlueprintGraphStore((state) => state.setFromActionBlueprintGraph)
  
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
        setFromActionBlueprintGraph(data)
      })
  }, [])

  const nodes = actionBlueprintGraph?.nodes || []

  return (
    <>
      <div>
        <NodeDisplay nodes={nodes} />
      </div>
    </>
  )
}

export default App
