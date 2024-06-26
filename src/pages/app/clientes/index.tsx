/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from '@tanstack/react-query'
import { LogOutIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

import { IUser } from '@/@types/users'
import CustomPagination from '@/components/pagination'
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

import { ClientesTableSkeleton } from './cliente-skeleton'
import NovoCliente from './criar-clientes'
import EditarCliente from './editar-clientes'

export default function Clientes() {
  const [, , removeSessionCookie] = useCookies(['session'])
  const [search, setSearch] = useState('')
  const [listClientes, setListClientes] = useState<IUser[]>([])
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(10)

  const { data: Clientes, isLoading } = useQuery({
    queryKey: ['clientes'],
    queryFn: async () => {
      const response = await API.get('/Cliente/Listar')
      setListClientes(response.data)
      return response.data
    },
  })

  useEffect(() => {
    if (search) {
      const newList = listClientes.filter((list) =>
        list.nome.toLowerCase().includes(search.toLowerCase()),
      )
      setListClientes(newList)
    } else {
      setListClientes(Clientes)
    }
  }, [search])

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <span className="text-2xl font-semibold text-muted-foreground">
          Clientes
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
          <div className="flex flex-col p-4">
            <span className="text-lg font-semibold text-muted-foreground">
              Filtros
            </span>
            <div className="flex items-end">
              <div className="flex flex-1 gap-3" />
              <div className="flex w-[380px] items-center gap-2 py-2">
                <NovoCliente />
                <InputSearch
                  type="text"
                  placeholder="Procurar..."
                  onChange={(value) => setSearch(value.target.value)}
                />
              </div>
            </div>
          </div>
          <Table>
            <TableCaption className="py-4">
              Uma lista dos todos os clientes.
            </TableCaption>
            <TableHeader className="bg-transparent/5">
              <TableRow>
                <TableHead className="w-[120px] px-8">ID</TableHead>
                <TableHead className="w-auto">Nome</TableHead>
                <TableHead className="w-[200px] text-left">Telefone</TableHead>
                <TableHead className="w-[240px] px-8 text-end">
                  Editar
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && <ClientesTableSkeleton />}
              {listClientes &&
                listClientes.slice(page, perPage).map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="px-8 font-medium">
                      {user.id}
                    </TableCell>
                    <TableCell>{user.nome}</TableCell>
                    <TableCell align="left">{user.telefone}</TableCell>
                    <TableCell align="right" className="w-auto p-0 px-8">
                      <EditarCliente idUser={user.id} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell
                  className="pr-16 text-right text-sm font-semibold text-muted-foreground"
                  colSpan={3}
                >
                  Total {Clientes?.length} clientes{' '}
                </TableCell>
                <TableCell className="max-w-[60px] justify-between" colSpan={1}>
                  <CustomPagination
                    totalPages={listClientes?.length}
                    page={page}
                    perPage={perPage}
                    setPage={(value) => setPage(value)}
                    setPerPage={(value) => setPerPage(value)}
                  />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </>
  )
}
