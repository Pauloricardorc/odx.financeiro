import { IEmprestimo } from '@/@types/emprestimos'
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

export default function Emprestimo() {
  const Emprestimos: IEmprestimo[] = [
    {
      Id: 1,
      Valor: 1000.0,
      ValorJuros: 0.05,
      ValorJurosDia: 0.001,
      IdCliente: 'Alice',
      DataEmprestimo: new Date(),
      DataQuitacao: new Date(),
      DataVencimento: new Date(),
      Status: 0,
    },
    {
      Id: 2,
      Valor: 2000.0,
      ValorJuros: 0.04,
      ValorJurosDia: 0.001,
      IdCliente: 'Bob',
      DataEmprestimo: new Date(),
      DataQuitacao: new Date(),
      DataVencimento: new Date(),
      Status: 0,
    },
    {
      Id: 3,
      Valor: 1500.0,
      ValorJuros: 0.045,
      ValorJurosDia: 0.001,
      IdCliente: 'Charlie',
      DataEmprestimo: new Date(),
      DataQuitacao: new Date(),
      DataVencimento: new Date(),
      Status: 1,
    },
    {
      Id: 4,
      Valor: 2500.0,
      ValorJuros: 0.035,
      ValorJurosDia: 0.001,
      IdCliente: 'David',
      DataEmprestimo: new Date(),
      DataQuitacao: new Date(),
      DataVencimento: new Date(),
      Status: 0,
    },
    {
      Id: 5,
      Valor: 3000.0,
      ValorJuros: 0.05,
      ValorJurosDia: 0.001,
      IdCliente: 'Eve',
      DataEmprestimo: new Date(),
      DataQuitacao: new Date(),
      DataVencimento: new Date(),
      Status: 0,
    },
    {
      Id: 6,
      Valor: 1800.0,
      ValorJuros: 0.03,
      ValorJurosDia: 0.001,
      IdCliente: 'Frank',
      DataEmprestimo: new Date(),
      DataQuitacao: new Date(),
      DataVencimento: new Date(),
      Status: 0,
    },
    {
      Id: 7,
      Valor: 1200.0,
      ValorJuros: 0.06,
      ValorJurosDia: 0.001,
      IdCliente: 'Grace',
      DataEmprestimo: new Date(),
      DataQuitacao: new Date(),
      DataVencimento: new Date(),
      Status: 1,
    },
    {
      Id: 8,
      Valor: 2200.0,
      ValorJuros: 0.045,
      ValorJurosDia: 0.001,
      IdCliente: 'Hank',
      DataEmprestimo: new Date(),
      DataQuitacao: new Date(),
      DataVencimento: new Date(),
      Status: 0,
    },
    {
      Id: 9,
      Valor: 1400.0,
      ValorJuros: 0.055,
      ValorJurosDia: 0.001,
      IdCliente: 'Ivy',
      DataEmprestimo: new Date(),
      DataQuitacao: new Date(),
      DataVencimento: new Date(),
      Status: 1,
    },
    {
      Id: 10,
      Valor: 1600.0,
      ValorJuros: 0.05,
      ValorJurosDia: 0.001,
      IdCliente: 'Jack',
      DataEmprestimo: new Date(),
      DataQuitacao: new Date(),
      DataVencimento: new Date(),
      Status: 0,
    },
  ]
  return (
    <>
      <span className="text-2xl font-semibold text-muted-foreground">
        Empréstimo
      </span>
      <div className="h-full w-full overflow-hidden rounded-xl">
        <Table className="border">
          <TableCaption>Uma lista das suas faturas recentes.</TableCaption>
          <TableHeader className="rounded-xl">
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead className="w-full">Valor</TableHead>
              <TableHead className="w-full">Juros</TableHead>
              <TableHead className="w-full">Juros/Dia</TableHead>
              <TableHead className="w-full">Cliente</TableHead>
              <TableHead className="w-full">Data Empréstimo</TableHead>
              <TableHead className="w-full">Data Quitação</TableHead>
              <TableHead className="w-full">Data Vencimento</TableHead>
              <TableHead className="w-full">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Emprestimos.map((emprestimo) => (
              <TableRow key={emprestimo.Id}>
                <TableCell className="font-medium">{emprestimo.Id}</TableCell>
                <TableCell>{emprestimo.Valor}</TableCell>
                <TableCell>{emprestimo.ValorJuros}</TableCell>
                <TableCell>{emprestimo.ValorJurosDia}</TableCell>
                <TableCell>{emprestimo.IdCliente}</TableCell>
                <TableCell>{String(emprestimo.DataEmprestimo)}</TableCell>
                <TableCell>{String(emprestimo.DataQuitacao)}</TableCell>
                <TableCell>{String(emprestimo.DataVencimento)}</TableCell>
                <TableCell>{emprestimo.Status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  )
}
