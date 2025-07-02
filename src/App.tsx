import { useEffect, useState } from 'react'
import './App.css'
import { ActionBlueprintGraphSchema, type ActionBlueprintGraph } from './types/ActionBlueprintGraph'
import NodeDisplay from './components/NodeDisplay/NodeDisplay'

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
