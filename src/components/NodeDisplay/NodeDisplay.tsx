import { Node } from "../../types/ActionBlueprintGraph"

type NodeListProps = {
  nodes: Node[]
}

export default function NodeDisplay({nodes} : NodeListProps) {
  return (
    <ul>
      {nodes.map((node, _) => (
        <li key={node.id}>{node.data.name}</li>
      ))}
    </ul>
  )
}
