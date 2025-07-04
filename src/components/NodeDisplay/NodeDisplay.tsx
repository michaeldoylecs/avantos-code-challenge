import { Node } from "../../types/ActionBlueprintGraph"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type NodeListProps = {
  nodes: Node[]
  onClickCallback: (node: Node) => () => void
}

export default function NodeDisplay({nodes, onClickCallback} : NodeListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left">ID</TableHead>
          <TableHead className="text-left">Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {nodes.map((node, _) => (
          <TableRow key={node.id} className="hover:cursor-pointer" onClick={onClickCallback(node)}>
            <TableCell className="text-left">{node.data.id}</TableCell>
            <TableCell className="text-left">{node.data.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
