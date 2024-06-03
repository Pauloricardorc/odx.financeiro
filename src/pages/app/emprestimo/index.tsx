/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from '@tanstack/react-query'
import { CheckCircle, CircleAlertIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { IEmprestimo } from '@/@types/emprestimos'
import { FilterRounded } from '@/assets/filter-rounded'
import { DatePickerDemo } from '@/components/filter-date'
import { Button } from '@/components/ui/button'
import { InputSearch } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { API } from '@/service/axios'

import CriarEmprestimo from './criar-emprestimo'
import RowTable from './emprestimo-row-table'

export default function Emprestimo() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [ListaEmprestimo, setListaEmprestimo] = useState<IEmprestimo[]>([])
  const [search, setSearch] = useState('')
  const status = searchParams.get('status')

  const { data: Emprestimos } = useQuery({
    queryKey: ['emprestimos'],
    queryFn: async () => {
      const response = await API.get('/Emprestimos/Listar')
      setListaEmprestimo(response.data)
      return response.data
    },
  })

  useEffect(() => {
    if (searchParams.get('status') === 'Aberto') {
      const newList = Emprestimos.filter(
        (emprestimo: { Status: number }) => emprestimo.Status === 0,
      )
      setListaEmprestimo(newList)
    }
    if (searchParams.get('status') === 'Quitado') {
      const newList = Emprestimos.filter(
        (emprestimo: { Status: number }) => emprestimo.Status === 1,
      )
      setListaEmprestimo(newList)
    }
    if (!searchParams.get('status')) {
      return setListaEmprestimo(Emprestimos)
    }
  }, [status])

  useEffect(() => {
    if (search) {
      const newList = ListaEmprestimo.filter((list) =>
        list.IdCliente.includes(search),
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
      <span className="text-2xl font-semibold text-muted-foreground">
        Empréstimo
      </span>
      <div className="h-full w-full">
        <div className="flex w-full flex-col rounded-xl border bg-card pt-2 shadow-md">
          <div className="flex flex-col px-4 pt-2">
            <span className="text-lg font-semibold text-muted-foreground">
              Filtros
            </span>
            <div className="flex items-end">
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
              </div>
              <div className="flex w-[500px] items-center gap-2 py-2">
                <CriarEmprestimo />

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-1 font-semibold"
                    >
                      Filtro
                      <FilterRounded />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="flex flex-col gap-2">
                      <h4 className="font-medium leading-none">Filtros</h4>
                      <p className="text-sm text-muted-foreground">
                        faça um filtro mais completo
                      </p>
                      <DatePickerDemo
                        id="inicioData"
                        className="col-span-3 h-8 w-full"
                        placeholder="Data do Empréstimo"
                      />
                      <DatePickerDemo
                        id="fimData"
                        className="col-span-3 h-8 w-full"
                        placeholder="Data da Quitação"
                      />
                      <DatePickerDemo
                        id="vencimentoData"
                        className="col-span-3 h-8 w-full"
                        placeholder="Data do Vencimento"
                      />
                    </div>
                    <Button className="mt-2 w-full">Filtrar</Button>
                  </PopoverContent>
                </Popover>
                <InputSearch
                  type="text"
                  placeholder="Procurar..."
                  onChange={(state) => setSearch(state.target.value)}
                />
              </div>
            </div>
          </div>
          <Table>
            <TableCaption>Uma lista de todos os empréstimos.</TableCaption>
            <TableHeader className="bg-transparent/5">
              <TableRow>
                <TableHead className="w-[80px] px-4">ID</TableHead>
                <TableHead className="w-[80px]">Valor</TableHead>
                <TableHead className="w-[80px]">Juros</TableHead>
                <TableHead className="w-[80px] text-center">
                  Juros/Dia
                </TableHead>
                <TableHead className="w-[80px]">Cliente</TableHead>
                <TableHead className="w-[80px]">Data Empréstimo</TableHead>
                <TableHead className="w-[80px]">Data Quitação</TableHead>
                <TableHead className="w-[80px]">Data Vencimento</TableHead>
                <TableHead className="w-[80px]">Status</TableHead>
                <TableHead className="w-[40px] max-w-[50px] text-center">
                  Renovar
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ListaEmprestimo &&
                ListaEmprestimo.map((value) => {
                  return <RowTable key={value.Id} emprestimo={value} />
                })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
