import { format } from 'date-fns'
import { BadgeDollarSign, EyeIcon } from 'lucide-react'

import { IEmprestimo } from '@/@types/emprestimos'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

interface Props {
  data: IEmprestimo
}

export default function DetalhesEmprestimo({ data }: Props) {
  return (
    <Sheet>
      <SheetTrigger>
        <Button
          variant="link"
          className="flex h-7 w-[30px] max-w-[30px] items-center justify-center rounded-full bg-primary/10 p-0"
        >
          <EyeIcon className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Detalhes do {data.cliente?.nome}</SheetTitle>
          <SheetDescription>
            <p>
              Todas as informações do empréstimo que foi feito por esse cliente
            </p>
            <div className="mt-12 flex flex-col gap-3">
              <p>Cliente</p>
              <Separator />
              <div className="flex flex-col gap-2">
                <Label htmlFor="clienteNome">Nome</Label>
                <Input id="clienteNome" value={data.cliente?.nome} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" value={data.cliente?.telefone} />
              </div>
              <p>Empréstimo</p>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="valorEmprestado">Empréstimo</Label>
                  <Input id="valorEmprestado" value={data.valorEmprestado} />
                </div>
                <div>
                  <Label htmlFor="valorAreceber">A receber</Label>
                  <Input id="valorAreceber" value={data.valorAreceber} />
                </div>
                <div>
                  <Label htmlFor="valorJuros">Juros</Label>
                  <Input id="valorJuros" value={data.valorJuros} />
                </div>
                <div>
                  <Label htmlFor="valorJurosDia">Juros/Dia</Label>
                  <Input id="valorJurosDia" value={data.valorJurosDia} />
                </div>
                <div>
                  <Label htmlFor="dataEmprestimo">Data Empréstimo</Label>
                  <Input
                    id="dataEmprestimo"
                    value={format(data.dataEmprestimo, 'dd/MM/yyyy')}
                  />
                </div>
                <div>
                  <Label htmlFor="dataQuitacao">Data Quitação</Label>
                  <Input
                    id="dataQuitacao"
                    value={format(data.dataQuitacao, 'dd/MM/yyyy')}
                  />
                </div>
                <div>
                  <Label htmlFor="dataVencimento">Data Vencimento</Label>
                  <Input
                    id="dataVencimento"
                    value={format(data.dataVencimento, 'dd/MM/yyyy')}
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Input
                    id="status"
                    value={data.status === 0 ? 'Aberto' : 'Quitado'}
                  />
                </div>
              </div>
              <p>Empréstimo</p>
              <Separator />
              <Accordion type="single" collapsible className="border">
                {data?.renovacoes.map((renova) => (
                  <AccordionItem
                    key={renova.dataPagamento}
                    value={renova.dataPagamento}
                    className="items-center px-4 text-center"
                  >
                    <AccordionTrigger>
                      <BadgeDollarSign size={18} />
                      {format(renova?.dataPagamento, 'dd/MM/yyyy')}
                    </AccordionTrigger>
                    <AccordionContent>
                      valor: R$ {renova?.valor}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
