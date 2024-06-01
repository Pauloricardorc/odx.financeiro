import { User } from '@/@types/users'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function Clientes() {
  const USERS: User[] = [
    { id: 1, nome: 'Alice', telefone: '123-456-7890' },
    { id: 2, nome: 'Bob', telefone: '234-567-8901' },
    { id: 3, nome: 'Charlie', telefone: '345-678-9012' },
    { id: 4, nome: 'David', telefone: '456-789-0123' },
    { id: 5, nome: 'Eve', telefone: '567-890-1234' },
    { id: 6, nome: 'Frank', telefone: '678-901-2345' },
    { id: 7, nome: 'Grace', telefone: '789-012-3456' },
    { id: 8, nome: 'Hank', telefone: '890-123-4567' },
    { id: 9, nome: 'Ivy', telefone: '901-234-5678' },
    { id: 10, nome: 'Jack', telefone: '012-345-6789' },
  ]
  return (
    <>
      <span className="text-2xl font-semibold text-muted-foreground">
        Clientes
      </span>
      <div className="h-full w-full">
        <Table className="border">
          <TableCaption>Uma lista dos usúarios recentes.</TableCaption>
          <TableHeader className="rounded-xl bg-gray-100">
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead className="w-auto">Nome</TableHead>
              <TableHead className="w-auto">Telefone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {USERS.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.nome}</TableCell>
                <TableCell>{user.telefone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}></TableCell>
              <TableCell className="text-right"></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  )
}
