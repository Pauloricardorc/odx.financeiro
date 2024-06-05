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
import { ConvertCurrency } from '@/utils/convertCurrency'

interface Props {
  data: IEmprestimo
}

export default function DetalhesEmprestimo({ data }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="link"
          className="flex h-7 w-[30px] max-w-[30px] items-center justify-center rounded-full bg-primary/10 p-0"
        >
          <EyeIcon className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="h-full w-full overflow-y-scroll sm:w-[380px]">
        <SheetHeader>
          <SheetTitle>Detalhes do empréstimo</SheetTitle>
          <SheetDescription asChild>
            <div>
              <p>Todas as informações do empréstimo que foi feito.</p>
              <div className="mt-6 flex flex-col gap-3">
                <p>Cliente</p>
                <Separator />
                <div className="flex flex-col gap-2">
                  <Label htmlFor="clienteNome">Nome</Label>
                  <Input
                    id="clienteNome"
                    value={data.cliente?.nome}
                    onChange={() => {}}
                    autoFocus={false}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={data.cliente?.telefone}
                    onChange={() => {}}
                    autoFocus={false}
                  />
                </div>
                <p>Empréstimo</p>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="valorEmprestado">Empréstimo</Label>
                    <Input
                      id="valorEmprestado"
                      value={ConvertCurrency(data.valorEmprestado)}
                      onChange={() => {}}
                      autoFocus={false}
                    />
                  </div>
                  <div>
                    <Label htmlFor="valorAreceber">A receber</Label>
                    <Input
                      id="valorAreceber"
                      value={ConvertCurrency(data.valorAreceber)}
                      onChange={() => {}}
                      autoFocus={false}
                    />
                  </div>
                  <div>
                    <Label htmlFor="valorJuros">Juros</Label>
                    <Input
                      id="valorJuros"
                      value={ConvertCurrency(data.valorJuros)}
                      onChange={() => {}}
                      autoFocus={false}
                    />
                  </div>
                  <div>
                    <Label htmlFor="valorJurosDia">Juros/Dia</Label>
                    <Input
                      id="valorJurosDia"
                      value={ConvertCurrency(data.valorJurosDia)}
                      onChange={() => {}}
                      autoFocus={false}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dataEmprestimo">Data Empréstimo</Label>
                    <Input
                      id="dataEmprestimo"
                      value={format(data.dataEmprestimo, 'dd/MM/yyyy')}
                      onChange={() => {}}
                      autoFocus={false}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dataQuitacao">Data Quitação</Label>
                    <Input
                      id="dataQuitacao"
                      value={format(data.dataQuitacao, 'dd/MM/yyyy')}
                      onChange={() => {}}
                      autoFocus={false}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dataVencimento">Data Vencimento</Label>
                    <Input
                      id="dataVencimento"
                      value={format(data.dataVencimento, 'dd/MM/yyyy')}
                      onChange={() => {}}
                      autoFocus={false}
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Input
                      id="status"
                      value={data.status === 0 ? 'Aberto' : 'Quitado'}
                      onChange={() => {}}
                      autoFocus={false}
                    />
                  </div>
                </div>
                <p>Renovacões</p>
                <Separator />
                <Accordion type="single" collapsible className="border">
                  {data?.renovacoes.map((renova) => (
                    <AccordionItem
                      key={renova.dataPagamento}
                      value={renova.dataPagamento}
                      className="items-center px-4 text-center"
                    >
                      <AccordionTrigger>
                        <BadgeDollarSign size={18} onChange={() => {}} />
                        {format(renova?.dataPagamento, 'dd/MM/yyyy')}
                      </AccordionTrigger>
                      <AccordionContent>
                        valor: R$ {renova?.valor}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
