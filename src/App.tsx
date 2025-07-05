import { useEffect, useState } from 'react'
import './App.css'
import { ActionBlueprintGraphSchema, Form, type Node } from './types/ActionBlueprintGraph'
import { useActionBlueprintGraphStore } from './stores/actionBlueprintGraphStore'
import NodeDisplay from './components/NodeDisplay/NodeDisplay'
import { Separator } from '@radix-ui/react-separator'
import { AppSidebar } from './components/AppSidebar/AppSidebar'
import Spinner from './components/Spinner/Spinner'
import { SidebarInset, SidebarProvider } from './components/ui/sidebar'

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedForm, setSelectedForm] = useState<Form>()
  const setFromActionBlueprintGraph = useActionBlueprintGraphStore((state) => state.setFromActionBlueprintGraph)
  const getNodes = useActionBlueprintGraphStore((state) => state.getNodes)
  const getForm = useActionBlueprintGraphStore((state) => state.getForm)
  
  useEffect(() => {
    setIsLoading(true)
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
        setIsLoading(false)
      })
  }, [])

  const nodes = getNodes()
  const nodeOnClickCallback = (node: Node) => () => {
    const newForm = getForm(node.data.component_id)
    if (newForm != null) {
      setSelectedForm(newForm)
    }
  }

  const selectedFormProperties = selectedForm?.field_schema.properties
    ? Object.keys(selectedForm?.field_schema.properties)
    : []

  return (
    <SidebarProvider>
      <AppSidebar data_sources={[]} />
      <SidebarInset>
        <div className="h-screen">
          {isLoading ? (
            <div className="h-screen flex flex-col justify-center items-center">
              <Spinner />
            </div>
          ) : (
            <main className="flex flex-col p-1">
              <div className="flex flex-col p-1">
                <h2 className="text-2xl font-bold">Forms</h2>
                <NodeDisplay nodes={nodes} onClickCallback={nodeOnClickCallback} />
              </div>
              <Separator />
              <div className="flex flex-col p-1">
                <h2 className="text-2xl font-bold">Form Properties</h2>
                <div className="flex flex-col">
                  {selectedFormProperties.map(item => (
                    <div key={item} className="flex flex-row h-10 border rounded-sm hover:cursor-pointer">
                      <div>
                        {item}
                      </div> 
                    </div>
                  ))}
                </div>
              </div>
            </main>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App
