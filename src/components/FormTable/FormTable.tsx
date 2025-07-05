import { FieldSchemaPropertyName, Form } from "../../types/ActionBlueprintGraph"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type FormTableProps = {
  form: Form
  onClickCallback: (name: FieldSchemaPropertyName) => () => void
}

export default function FormTable({form, onClickCallback} : FormTableProps) {
  const schema_properties = Object.keys(form.field_schema.properties)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left">ID</TableHead>
          <TableHead className="text-left">Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {schema_properties.map((property, _) => (
          <TableRow key={form.id} className="hover:cursor-pointer" onClick={onClickCallback(property)}>
            <TableCell className="text-left">{property}</TableCell>
            <TableCell className="text-left">{property}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
