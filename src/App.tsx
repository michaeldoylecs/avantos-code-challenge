import { useEffect, useState } from 'react'
import './App.css'
import { ActionBlueprintGraphSchema, FieldSchemaProperties, FieldSchemaPropertyName, type Node } from './types/ActionBlueprintGraph'
import { useActionBlueprintGraphStore } from './stores/actionBlueprintGraphStore'
import NodeDisplay from './components/NodeDisplay/NodeDisplay'
import { Separator } from '@radix-ui/react-separator'
import { AppSidebar, type AppSidebarDataSources } from './components/AppSidebar/AppSidebar'
import Spinner from './components/Spinner/Spinner'
import { SidebarInset, SidebarProvider } from './components/ui/sidebar'
import FormTable from './components/FormTable/FormTable'
import { usePrefillStore } from './stores/prefillStore'

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedNode, setSelectedNode] = useState<Node>()
  const [dataSources, setDataSources] = useState<AppSidebarDataSources>([])
  const setFromActionBlueprintGraph = useActionBlueprintGraphStore((state) => state.setFromActionBlueprintGraph)
  const getNode = useActionBlueprintGraphStore((state) => state.getNode)
  const getNodes = useActionBlueprintGraphStore((state) => state.getNodes)
  const getForm = useActionBlueprintGraphStore((state) => state.getForm)
  const setPrefill = usePrefillStore((state) => state.setPrefill)
  
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

  const nodeOnClickCallback = (node: Node) => () => {
    setSelectedNode(node)
    setDataSources([])
  }

  const formPropertySelectCallback = (name: FieldSchemaPropertyName) => () => {
    if (selectedNode == null) {
      return
    }

    const ancestor_properties: { node: Node, properties: FieldSchemaProperties}[] = []
    let visit_stack = selectedNode?.data.prerequisites.map((id) => getNode(id))
    while (visit_stack.length > 0) {
      const curr_node = visit_stack.pop()
      if (curr_node != null) {
        const form_properties = getForm(curr_node.data.component_id)?.field_schema.properties
        if (form_properties != null) {
          ancestor_properties.push({
            node: curr_node,
            properties: form_properties
          })
        }
      }
    }

    setDataSources(
      ancestor_properties.map((ap) => ({
        name: ap.node.data.name,
        fields: Object.keys(ap.properties).map((property) => ({
          name: property,
          onClickCallback: () => {
            setPrefill(selectedNode.id, name, ap.node.id, property)
          }
        }))
      }))
    )
  }

  return (
    <SidebarProvider>
      <AppSidebar data_sources={dataSources} />
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
                <NodeDisplay nodes={getNodes()} onClickCallback={nodeOnClickCallback} />
              </div>
              <Separator />
              { !!selectedNode && <FormTable key={selectedNode.id} node={selectedNode} onClickCallback={formPropertySelectCallback} /> }
            </main>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App
