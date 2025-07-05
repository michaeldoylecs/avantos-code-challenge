import { useActionBlueprintGraphStore } from "@/stores/useActionBlueprintGraphStore";
import {
  FieldSchemaPropertyName,
  type Node,
} from "../../types/ActionBlueprintGraph";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePrefillStore } from "@/stores/usePrefillStore";
import { Button } from "../ui/button";

type FormTableProps = {
  node: Node;
  onClickCallback: (name: FieldSchemaPropertyName) => () => void;
} & React.ComponentProps<typeof Table>;

export default function FormTable({
  node,
  onClickCallback,
  ...props
}: FormTableProps) {
  const prefillMap = usePrefillStore((state) => state.prefillMap);
  const removePrefill = usePrefillStore((state) => state.removePrefill);
  const getNode = useActionBlueprintGraphStore((state) => state.getNode);
  const getForm = useActionBlueprintGraphStore((state) => state.getForm);
  const form = getForm(node.data.component_id);
  const schema_properties =
    (form && Object.keys(form.field_schema.properties)) || [];

  const getPrefillStringIfExists = (
    field_property: FieldSchemaPropertyName,
  ) => {
    if (
      prefillMap == null ||
      prefillMap[node.id] == null ||
      prefillMap[node.id][field_property] == null
    ) {
      return "";
    }
    const { node_id, property } = prefillMap[node.id][field_property];
    if (node_id != null && property != null) {
      const node = getNode(node_id);
      if (node != null) {
        return `${node.data.name}.${property}`;
      }
    } else {
      return "";
    }
  };

  return (
    <Table {...props}>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left">Name</TableHead>
          <TableHead className="text-left">Prefill</TableHead>
          <TableHead className="text-left">Remove prefill</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {schema_properties.map((property, _) => (
          <TableRow
            key={property}
            className="hover:cursor-pointer"
            onClick={onClickCallback(property)}
          >
            <TableCell className="text-left">{property}</TableCell>
            <TableCell className="text-left">
              {getPrefillStringIfExists(property)}
            </TableCell>
            <TableCell className="text-left">
              {prefillMap[node.id] && prefillMap[node.id][property] && (
                <Button
                  className="p-2"
                  onClick={() => removePrefill(node.id, property)}
                >
                  Remove
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
