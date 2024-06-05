/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from '@tanstack/react-query'
import { CheckCircle, CircleAlertIcon, LogOutIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSearchParams } from 'react-router-dom'

import { IEmprestimo } from '@/@types/emprestimos'
import { ModeToggle } from '@/components/theme/mode-toggle'
import { TooltipDemo } from '@/components/tooltip'
import { Button } from '@/components/ui/button'
import { InputSearch } from '@/components/ui/input'
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
import { API } from '@/service/axios'

import CriarEmprestimo from './criar-emprestimo'
import RowTable from './emprestimo-row-table'
import { EmprestimoTableSkeleton } from './emprestimo-skeleton'

export default function Emprestimo() {
  const [, , removeSessionCookie] = useCookies(['session'])
  const [searchParams, setSearchParams] = useSearchParams()
  const [ListaEmprestimo, setListaEmprestimo] = useState<IEmprestimo[]>([])
  const [search, setSearch] = useState('')
  const status = searchParams.get('status')

  const { data: Emprestimos, isLoading } = useQuery({
    queryKey: ['emprestimos'],
    queryFn: async () => {
      const response = await API.get('/Emprestimos/Listar')
      setListaEmprestimo(response.data)
      return response.data
    },
  })

  const {
    data: EmprestimosAtrasados,
    refetch: RefetchEmprestimosAtrasados,
    isRefetching: StatusRefetchAtrasados,
  } = useQuery({
    queryKey: ['emprestimos-atrasados'],
    queryFn: async () => {
      const response = await API.get('/Emprestimos/ListarAtrasados')
      return response.data
    },
  })

  useEffect(() => {
    if (searchParams.get('status') === 'Aberto') {
      const newList = Emprestimos?.filter(
        (emprestimo: { status: number }) => emprestimo.status === 0,
      )
      setListaEmprestimo(newList)
    }
    if (searchParams.get('status') === 'Quitado') {
      const newList = Emprestimos?.filter(
        (emprestimo: { status: number }) => emprestimo.status === 1,
      )
      setListaEmprestimo(newList)
    }
    if (searchParams.get('status') === 'Atrasados') {
      RefetchEmprestimosAtrasados()
      setListaEmprestimo(EmprestimosAtrasados)
    }
    if (!searchParams.get('status')) {
      setSearchParams({})
      return setListaEmprestimo(Emprestimos)
    }
  }, [status, Emprestimos, EmprestimosAtrasados])

  useEffect(() => {
    if (search) {
      const newList = ListaEmprestimo.filter((list) =>
        list.cliente.nome.includes(search),
      )
      setListaEmprestimo(newList)
    } else {
      setListaEmprestimo(Emprestimos)
    }
  }, [search])

  const applyFilters = (value: string) => {
    if (value === status) {
      setSearchParams({})
    } else {
      setSearchParams({ status: value })
    }
  }

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <span className="text-2xl font-semibold text-muted-foreground">
          Empréstimo
        </span>
        <div className="flex gap-3 sm:hidden">
          <ModeToggle />
          <TooltipDemo title="Sair">
            <Button
              variant="outline"
              className="border-0 bg-primary/20 px-2"
              onClick={() => removeSessionCookie('session', { path: '/' })}
            >
              <LogOutIcon size={18} className="text-primary" />
            </Button>
          </TooltipDemo>
        </div>
      </div>

      <div className="h-full w-full">
        <div className="flex w-full flex-col rounded-xl border bg-card pt-2 shadow-md">
          <div className="flex flex-col px-4 pt-2">
            <span className="text-lg font-semibold text-muted-foreground">
              Filtros
            </span>
            <div className="flex flex-col items-end md:flex-row">
              <div className="flex flex-1 gap-6">
                <Button
                  variant="link"
                  className={`relative px-0 hover:no-underline ${searchParams.get('status') === 'Aberto' ? 'before:b-0 gap-2 rounded-none before:absolute before:bottom-0 before:h-0.5 before:w-full before:bg-primary' : 'gap-2 rounded-none text-muted-foreground'}`}
                  onClick={() => applyFilters('Aberto')}
                >
                  <CircleAlertIcon size={16} />
                  Em aberto
                </Button>
                <Button
                  variant="link"
                  className={`relative px-0 hover:no-underline ${searchParams.get('status') === 'Quitado' ? 'before:b-0 gap-2 rounded-none before:absolute before:bottom-0 before:h-0.5 before:w-full before:bg-primary' : 'gap-2 rounded-none text-muted-foreground'}`}
                  onClick={() => applyFilters('Quitado')}
                >
                  <CheckCircle size={16} />
                  Quitados
                </Button>
                <Button
                  variant="link"
                  className={`relative px-0 hover:no-underline ${searchParams.get('status') === 'Atrasados' ? 'before:b-0 gap-2 rounded-none before:absolute before:bottom-0 before:h-0.5 before:w-full before:bg-primary' : 'gap-2 rounded-none text-muted-foreground'}`}
                  onClick={() => applyFilters('Atrasados')}
                >
                  <CheckCircle size={16} />
                  Atrasados
                </Button>
              </div>
              <div className="flex w-full items-center gap-2 py-2 sm:max-w-[400px] md:w-[800px]">
                <CriarEmprestimo />

                {/* <DatePickerWithRange /> */}
                <InputSearch
                  type="text"
                  placeholder="Procurar..."
                  onChange={(state) => setSearch(state.target.value)}
                />
              </div>
            </div>
          </div>
          <Table>
            <TableCaption className="py-2">
              Uma lista de todos os empréstimos.
            </TableCaption>
            <TableHeader className="bg-transparent/5">
              <TableRow>
                <TableHead className="w-[20px] max-w-[20px] px-4">ID</TableHead>
                <TableHead className="w-[40px] text-center">Valor</TableHead>
                <TableHead className="w-[40px] text-center">Receber</TableHead>
                <TableHead className="w-[40px] text-center">Juros</TableHead>
                <TableHead className="w-[40px] text-center">
                  Juros/Dia
                </TableHead>
                <TableHead className="flex w-[220px] items-center">
                  Cliente
                </TableHead>
                <TableHead className="w-[140px]">Data Empréstimo</TableHead>
                <TableHead className="w-[140px]">Data Quitação</TableHead>
                <TableHead className="w-[140px]">Data Vencimento</TableHead>
                <TableHead className="w-[80px]">Status</TableHead>
                <TableHead className="w-[40px] min-w-[80px] max-w-[80px] text-center">
                  Renovar
                </TableHead>
                <TableHead className="w-[40px] min-w-[80px] max-w-[80px] text-center">
                  Quitar
                </TableHead>
                <TableHead className="w-[40px] min-w-[80px] max-w-[80px] text-center">
                  Editar
                </TableHead>
                <TableHead className="w-[40px] min-w-[80px] max-w-[80px] text-center">
                  Detalhes
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ||
                (StatusRefetchAtrasados && <EmprestimoTableSkeleton />)}
              {ListaEmprestimo &&
                ListaEmprestimo.map((value) => {
                  return <RowTable key={value.id} emprestimo={value} />
                })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell
                  className="text-center text-sm font-semibold text-muted-foreground"
                  colSpan={14}
                >
                  Total de {ListaEmprestimo?.length} empréstimos{' '}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </>
  )
}
