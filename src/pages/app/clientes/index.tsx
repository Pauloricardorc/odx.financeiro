/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { IUser } from '@/@types/users'
import { InputSearch } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { API } from '@/service/axios'

import NovoCliente from './criar-clientes'
import EditarCliente from './editar-clientes'

export default function Clientes() {
  const [search, setSearch] = useState('')
  const [listClientes, setListClientes] = useState<IUser[]>([])

  const { data: Clientes } = useQuery({
    queryKey: ['clientes'],
    queryFn: async () => {
      const response = await API.get('/Cliente/Listar')
      setListClientes(response.data)
      return response.data
    },
  })

  useEffect(() => {
    if (search) {
      const newList = listClientes.filter((list) => list.nome.includes(search))
      setListClientes(newList)
    } else {
      setListClientes(Clientes)
    }
  }, [search])

  return (
    <>
      <span className="text-2xl font-semibold text-muted-foreground">
        Clientes
      </span>
      <div className="h-full w-full">
        <div className="flex w-full flex-col rounded-xl border bg-card pt-2 shadow-md">
          <div className="flex flex-col px-4 pt-2">
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
            <TableCaption>Uma lista dos todos os usúarios.</TableCaption>
            <TableHeader className="bg-transparent/5">
              <TableRow>
                <TableHead className="w-[80px] px-4">ID</TableHead>
                <TableHead className="w-auto">Nome</TableHead>
                <TableHead className="w-auto">Telefone</TableHead>
                <TableHead className="w-auto text-center">Editar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listClientes &&
                listClientes.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="px-4 font-medium">
                      {user.id}
                    </TableCell>
                    <TableCell>{user.nome}</TableCell>
                    <TableCell>{user.telefone}</TableCell>
                    <TableCell align="center" className="p-0">
                      <EditarCliente idUser={user.id} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
