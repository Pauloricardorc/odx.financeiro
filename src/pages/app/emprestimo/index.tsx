import { format } from 'date-fns'
import { CheckCircle, CircleAlertIcon } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

import { IEmprestimo } from '@/@types/emprestimos'
import { FilterRounded } from '@/assets/filter-rounded'
import { DatePickerDemo } from '@/components/filter-date'
import { Badge } from '@/components/ui/badge'
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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function Emprestimo() {
  const [searchParams, setSearchParams] = useSearchParams()
  const statusSearch = searchParams.get('status') === 'Aberto' ? 0 : 1
  const Emprestimos: IEmprestimo[] = [
    {
      Id: 1,
      Valor: 1000.0,
      ValorJuros: 0.05,
      ValorJurosDia: 0.2,
      IdCliente: 'Alice',
      DataEmprestimo: format(new Date(), 'MM/dd/yyyy'),
      DataQuitacao: format(new Date(), 'MM/dd/yyyy'),
      DataVencimento: format(new Date(), 'MM/dd/yyyy'),
      Status: 0,
    },
    {
      Id: 2,
      Valor: 2000.0,
      ValorJuros: 0.04,
      ValorJurosDia: 0.2,
      IdCliente: 'Bob',
      DataEmprestimo: format(new Date(), 'MM/dd/yyyy'),
      DataQuitacao: format(new Date(), 'MM/dd/yyyy'),
      DataVencimento: format(new Date(), 'MM/dd/yyyy'),
      Status: 0,
    },
    {
      Id: 3,
      Valor: 1500.0,
      ValorJuros: 0.045,
      ValorJurosDia: 0.2,
      IdCliente: 'Charlie',
      DataEmprestimo: format(new Date(), 'MM/dd/yyyy'),
      DataQuitacao: format(new Date(), 'MM/dd/yyyy'),
      DataVencimento: format(new Date(), 'MM/dd/yyyy'),
      Status: 1,
    },
    {
      Id: 4,
      Valor: 2500.0,
      ValorJuros: 0.035,
      ValorJurosDia: 0.2,
      IdCliente: 'David',
      DataEmprestimo: format(new Date(), 'MM/dd/yyyy'),
      DataQuitacao: format(new Date(), 'MM/dd/yyyy'),
      DataVencimento: format(new Date(), 'MM/dd/yyyy'),
      Status: 0,
    },
    {
      Id: 5,
      Valor: 3000.0,
      ValorJuros: 0.05,
      ValorJurosDia: 0.2,
      IdCliente: 'Eve',
      DataEmprestimo: format(new Date(), 'MM/dd/yyyy'),
      DataQuitacao: format(new Date(), 'MM/dd/yyyy'),
      DataVencimento: format(new Date(), 'MM/dd/yyyy'),
      Status: 0,
    },
    {
      Id: 6,
      Valor: 1800.0,
      ValorJuros: 0.03,
      ValorJurosDia: 0.2,
      IdCliente: 'Frank',
      DataEmprestimo: format(new Date(), 'MM/dd/yyyy'),
      DataQuitacao: format(new Date(), 'MM/dd/yyyy'),
      DataVencimento: format(new Date(), 'MM/dd/yyyy'),
      Status: 0,
    },
    {
      Id: 7,
      Valor: 1200.0,
      ValorJuros: 0.06,
      ValorJurosDia: 0.2,
      IdCliente: 'Grace',
      DataEmprestimo: format(new Date(), 'MM/dd/yyyy'),
      DataQuitacao: format(new Date(), 'MM/dd/yyyy'),
      DataVencimento: format(new Date(), 'MM/dd/yyyy'),
      Status: 1,
    },
    {
      Id: 8,
      Valor: 2200.0,
      ValorJuros: 0.045,
      ValorJurosDia: 0.2,
      IdCliente: 'Hank',
      DataEmprestimo: format(new Date(), 'MM/dd/yyyy'),
      DataQuitacao: format(new Date(), 'MM/dd/yyyy'),
      DataVencimento: format(new Date(), 'MM/dd/yyyy'),
      Status: 0,
    },
    {
      Id: 9,
      Valor: 1400.0,
      ValorJuros: 0.055,
      ValorJurosDia: 0.2,
      IdCliente: 'Ivy',
      DataEmprestimo: format(new Date(), 'MM/dd/yyyy'),
      DataQuitacao: format(new Date(), 'MM/dd/yyyy'),
      DataVencimento: format(new Date(), 'MM/dd/yyyy'),
      Status: 1,
    },
    {
      Id: 10,
      Valor: 1600.0,
      ValorJuros: 0.05,
      ValorJurosDia: 0.2,
      IdCliente: 'Jack',
      DataEmprestimo: format(new Date(), 'MM/dd/yyyy'),
      DataQuitacao: format(new Date(), 'MM/dd/yyyy'),
      DataVencimento: format(new Date(), 'MM/dd/yyyy'),
      Status: 0,
    },
  ]
  const applyFilters = (value: string) => {
    setSearchParams({ status: value })
  }

  return (
    <>
      <span className="text-2xl font-semibold text-muted-foreground">
        Empréstimo
      </span>
      <div className="h-full w-full">
        <div className="flex w-full flex-col rounded-xl border pt-2">
          <div className="flex flex-col px-4 pt-2">
            <span className="text-lg font-semibold text-muted-foreground">
              Filtros
            </span>
            <div className="flex items-end">
              <div className="flex flex-1 gap-3">
                <Button
                  variant="link"
                  className={`relative hover:no-underline ${statusSearch === 0 ? 'before:b-0 gap-2 rounded-none before:absolute before:bottom-0 before:h-0.5 before:w-full before:bg-primary' : 'gap-2 rounded-none text-muted-foreground'}`}
                  onClick={() => applyFilters('Aberto')}
                >
                  <CircleAlertIcon size={16} />
                  Em aberto
                </Button>
                <Button
                  variant="link"
                  className={`relative hover:no-underline ${statusSearch === 1 ? 'before:b-0 gap-2 rounded-none before:absolute before:bottom-0 before:h-0.5 before:w-full before:bg-primary' : 'gap-2 rounded-none text-muted-foreground'}`}
                  onClick={() => applyFilters('Quitado')}
                >
                  <CheckCircle size={16} />
                  Quitados
                </Button>
              </div>
              <div className="flex w-[380px] items-center gap-2 py-2">
                <Popover>
                  <PopoverTrigger>
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
                <InputSearch type="text" placeholder="Procurar..." />
              </div>
            </div>
          </div>
          <Table>
            <TableCaption>Uma lista de todos os empréstimos.</TableCaption>
            <TableHeader className="bg-gray-100">
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {Emprestimos.filter((value) => value.Status === statusSearch).map(
                (emprestimo) => (
                  <TableRow
                    key={emprestimo.Id}
                    className="transition-all duration-300"
                  >
                    <TableCell className="px-4 font-medium">
                      {emprestimo.Id}
                    </TableCell>
                    <TableCell>{emprestimo.Valor}</TableCell>
                    <TableCell>{emprestimo.ValorJuros}</TableCell>
                    <TableCell className="text-center">
                      {emprestimo.ValorJurosDia}%
                    </TableCell>
                    <TableCell>{emprestimo.IdCliente}</TableCell>
                    <TableCell>{String(emprestimo.DataEmprestimo)}</TableCell>
                    <TableCell>{String(emprestimo.DataQuitacao)}</TableCell>
                    <TableCell>{String(emprestimo.DataVencimento)}</TableCell>
                    <TableCell>
                      {emprestimo.Status === 0 ? (
                        <Badge
                          className="flex w-[70px] justify-center"
                          variant="outline"
                        >
                          Aberto
                        </Badge>
                      ) : (
                        <Badge
                          className="flex w-[70px] justify-center"
                          variant="outline"
                        >
                          Quitado
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
