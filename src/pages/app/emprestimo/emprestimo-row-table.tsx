import { IEmprestimo } from '@/@types/emprestimos'
import { Badge } from '@/components/ui/badge'
import { TableCell, TableRow } from '@/components/ui/table'

import Renovacao from '../renovacao'

interface Props {
  emprestimo: IEmprestimo
}

export default function RowTable({ emprestimo }: Props) {
  return (
    <TableRow key={emprestimo.Id} className="transition-all duration-300">
      <TableCell className="px-4 font-medium">{emprestimo.Id}</TableCell>
      <TableCell>{emprestimo.Valor}</TableCell>
      <TableCell>{emprestimo.ValorJuros}</TableCell>
      <TableCell className="text-center">{emprestimo.ValorJurosDia}%</TableCell>
      <TableCell>{emprestimo.IdCliente}</TableCell>
      <TableCell>{String(emprestimo.DataEmprestimo)}</TableCell>
      <TableCell>{String(emprestimo.DataQuitacao)}</TableCell>
      <TableCell>{String(emprestimo.DataVencimento)}</TableCell>
      <TableCell>
        {emprestimo.Status === 0 ? (
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
        <Renovacao idEmprestimo={emprestimo.Id} />
      </TableCell>
    </TableRow>
  )
}
