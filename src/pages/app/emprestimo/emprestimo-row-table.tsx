import { format } from 'date-fns'

import { IEmprestimo } from '@/@types/emprestimos'
import { Badge } from '@/components/ui/badge'
import { TableCell, TableRow } from '@/components/ui/table'
import { ConvertCurrency } from '@/utils/convertCurrency'

import DetalhesEmprestimo from './detalhes-emprestimo'
import EditarEmprestimo from './editar-emprestimo'
import OpcoesRowTable from './opcoes-table-row'

interface Props {
  emprestimo: IEmprestimo
}

export default function RowTable({ emprestimo }: Props) {
  return (
    <TableRow key={emprestimo.id} className="transition-all duration-300">
      <TableCell className="px-4 font-medium">{emprestimo.id}</TableCell>
      <TableCell className="text-center">
        {ConvertCurrency(emprestimo.valorEmprestado)}
      </TableCell>
      <TableCell className="text-center">
        {ConvertCurrency(emprestimo.valorAreceber)}
      </TableCell>
      <TableCell className="text-center">
        {ConvertCurrency(emprestimo.valorJuros)}
      </TableCell>
      <TableCell className="text-center">
        {ConvertCurrency(emprestimo.valorJurosDia)}
      </TableCell>
      <TableCell>{emprestimo.cliente.nome}</TableCell>
      <TableCell>
        {String(format(emprestimo.dataEmprestimo, 'dd/MM/yyyy'))}
      </TableCell>
      <TableCell>
        {String(format(emprestimo.dataQuitacao, 'dd/MM/yyyy'))}
      </TableCell>
      <TableCell>
        {String(format(emprestimo.dataVencimento, 'dd/MM/yyyy'))}
      </TableCell>
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

      <TableCell
        align="center"
        className="w-[40px] min-w-[40px] max-w-[40px] p-0 text-amber-400"
      >
        <EditarEmprestimo idEmprestimo={emprestimo.id} />
      </TableCell>
      <TableCell
        align="center"
        className="w-[40px] min-w-[40px] max-w-[40px] p-0"
      >
        <DetalhesEmprestimo data={emprestimo} />
      </TableCell>
      <TableCell
        align="center"
        className="w-[40px] min-w-[40px] max-w-[40px] p-0"
      >
        <OpcoesRowTable idEmprestimo={emprestimo.id} />
      </TableCell>
    </TableRow>
  )
}
