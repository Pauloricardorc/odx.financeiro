import { useMutation, useQueryClient } from '@tanstack/react-query'
import { EllipsisVertical } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useToast } from '@/components/ui/use-toast'
import { API } from '@/service/axios'

import Renovacao from './renovar-emprestimo'

interface Props {
  idEmprestimo: number
}

export default function OpcoesRowTable({ idEmprestimo }: Props) {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const handleQuitado = () => {
    toast({
      title: 'O emprestimo quitado',
      description: `Emprestimo quitado`,
    })
    queryClient.invalidateQueries({ queryKey: ['emprestimos'] })
  }

  const { mutate: QuitarEmprestimo } = useMutation({
    mutationKey: ['emprestimos'],
    mutationFn: async () => {
      API.put('/Emprestimos/Quitar', {
        id: idEmprestimo,
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="link"
          className="flex h-7 w-[30px] items-center justify-center rounded-lg bg-accent p-0 text-muted-foreground"
        >
          <EllipsisVertical className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Opções</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel asChild>
          <Button
            variant="link"
            className="flex w-full items-center justify-start px-3.5 text-sm text-accent-foreground transition-colors hover:bg-transparent/10 hover:no-underline"
          >
            PDF
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuLabel asChild>
          <Button
            variant="link"
            className="flex w-full items-center justify-start px-3.5 text-sm text-accent-foreground transition-colors hover:bg-transparent/10 hover:no-underline"
            onClick={() => QuitarEmprestimo()}
          >
            quitar
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Renovacao idEmprestimo={idEmprestimo} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
