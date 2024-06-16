import { useMutation, useQueryClient } from '@tanstack/react-query'
import { EllipsisVertical, Loader2Icon } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { API } from '@/service/axios'

import Renovacao from './renovar-emprestimo'

interface Props {
  idEmprestimo: number
}

export default function OpcoesRowTable({ idEmprestimo }: Props) {
  const queryClient = useQueryClient()

  const { mutateAsync: QuitarEmprestimo, isPending } = useMutation({
    mutationKey: ['emprestimos'],
    mutationFn: async () => {
      try {
        await API.put('/Emprestimos/Quitar', {
          id: idEmprestimo,
        })
        return true
      } catch (error) {
        toast('Erro ao quitar o empréstimo')
        throw error
      }
    },
  })

  const handleQuintarEmprestimo = async () => {
    try {
      await toast.promise(QuitarEmprestimo(), {
        loading: 'Quitando o empréstimo',
        success: 'Empréstimo quitado com sucesso',
        error: 'Erro ao quitar o empréstimo',
      })
      queryClient.invalidateQueries({ queryKey: ['emprestimos'] })
    } catch (error) {
      console.error('Erro ao tentar quitar o empréstimo:', error)
    }
  }

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
        {/* <DropdownMenuLabel asChild>
          <PDFDownloadLink
            document={<ContratoDeEmprestimo />}
            fileName="contrato_de_empréstimo.pdf"
          >
            {({ loading }) => (
              <Button
                variant="link"
                className="flex w-full items-center justify-start px-3.5 text-sm text-accent-foreground transition-colors hover:bg-transparent/20 hover:no-underline"
              >
                {loading ? 'Carregando documento...' : 'PDF'}
              </Button>
            )}
          </PDFDownloadLink>
        </DropdownMenuLabel> */}
        <DropdownMenuLabel asChild>
          <Button
            variant="link"
            className="duration-400 flex w-full items-center justify-start px-3.5 text-sm text-accent-foreground transition-all hover:bg-transparent/20 hover:no-underline"
            onClick={() => handleQuintarEmprestimo()}
            disabled={isPending}
          >
            {isPending && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}{' '}
            Quitar
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Renovacao idEmprestimo={idEmprestimo} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
