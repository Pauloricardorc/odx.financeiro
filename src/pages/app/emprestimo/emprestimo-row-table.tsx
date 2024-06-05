import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { CheckSquareIcon } from 'lucide-react'

import { IEmprestimo } from '@/@types/emprestimos'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { useToast } from '@/components/ui/use-toast'
import { API } from '@/service/axios'
import { ConvertCurrency } from '@/utils/convertCurrency'

import DetalhesEmprestimo from './detalhes-emprestimo'
import EditarEmprestimo from './editar-emprestimo'
import Renovacao from './renovar-emprestimo'

interface Props {
  emprestimo: IEmprestimo
}

export default function RowTable({ emprestimo }: Props) {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const handleQuitado = () => {
    toast({
      title: 'O emprestimo quitado',
      description: `Emprestimo do ${emprestimo.cliente.nome} foi quitado`,
    })
    queryClient.invalidateQueries({ queryKey: ['emprestimos'] })
  }

  const { mutate: QuitarEmprestimo } = useMutation({
    mutationKey: ['emprestimos'],
    mutationFn: async () => {
      API.put('/Emprestimos/Quitar', {
        id: emprestimo.id,
      })
        .then(() => handleQuitado())
        .catch(() => {
          toast({
            variant: 'destructive',
            title: 'O emprestimo não foi quitado',
            description: `Ocorreu um erro do quitar o emprestimo`,
          })
        })
    },
  })

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
        className="w-[40px] min-w-[40px] max-w-[40px] p-0"
      >
        <Renovacao idEmprestimo={emprestimo.id} />
      </TableCell>

      <TableCell
        align="center"
        className="w-[40px] min-w-[40px] max-w-[40px] p-0"
      >
        <Button
          variant="link"
          className="flex h-7 w-[30px] items-center justify-center rounded-full bg-secondary/60 p-0"
          onClick={() => QuitarEmprestimo()}
        >
          <CheckSquareIcon className="h-4 w-4 text-blue-400" />
        </Button>
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
    </TableRow>
  )
}
