import { IEmprestimo } from '@/@types/emprestimos'
import { Badge } from '@/components/ui/badge'
import { TableCell, TableRow } from '@/components/ui/table'

import Renovacao from '../renovacao'

interface Props {
  emprestimo: IEmprestimo
}

export default function RowTable({ emprestimo }: Props) {
  return (
    <TableRow key={emprestimo.id} className="transition-all duration-300">
      <TableCell className="px-4 font-medium">{emprestimo.id}</TableCell>
      <TableCell>{emprestimo.valorEmprestado}</TableCell>
      <TableCell>{emprestimo.valorAreceber}</TableCell>
      <TableCell>{emprestimo.valorJuros}</TableCell>
      <TableCell className="text-center">{emprestimo.valorJurosDia}%</TableCell>
      <TableCell>{emprestimo.cliente.nome}</TableCell>
      <TableCell>{String(emprestimo.dataEmprestimo)}</TableCell>
      <TableCell>{String(emprestimo.dataQuitacao)}</TableCell>
      <TableCell>{String(emprestimo.dataVencimento)}</TableCell>
      <TableCell>
        {emprestimo.status === 0 ? (
          <Badge className="flex w-[70px] justify-center" variant="outline">
            Aberto
          </Badge>
        ) : (
          <Badge className="flex w-[70px] justify-center" variant="outline">
            Quitado
          </Badge>
        )}
      </TableCell>
      <TableCell align="center" className="p-0">
        <Renovacao idEmprestimo={emprestimo.id} />
      </TableCell>
    </TableRow>
  )
}
