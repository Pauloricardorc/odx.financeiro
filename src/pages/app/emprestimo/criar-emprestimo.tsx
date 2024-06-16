/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { setDefaultOptions } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CurrencyInput } from 'react-currency-mask'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { IUser } from '@/@types/users'
import { SimpleDateForm } from '@/components/simples-date-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input, InputProps } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea, TextareaProps } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { API } from '@/service/axios'

const formSchema = z.object({
  valorEmprestado: z.coerce
    .number({
      message: 'Valor do empréstimo e obrigatório',
    })
    .min(1, 'Valor mínimo não permitido'),
  valorJuros: z.coerce.number({ message: 'Valor do juros e obrigatório' }),
  valorJurosDia: z.coerce.number({
    message: 'Valor de juros por dia e obrigatório',
  }),
  observacao: z.string().nullable(),
  idCliente: z.coerce.number({ message: 'Selecione um cliente' }),
  dataEmprestimo: z.date({
    required_error: 'A data do empréstimo e obrigatório.',
  }),
})

export default function CriarEmprestimo() {
  setDefaultOptions({ locale: ptBR })
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const defaultValues = () => {
    form.reset()
    queryClient.invalidateQueries({ queryKey: ['emprestimos'] })
    toast({
      variant: 'default',
      title: 'Criado com sucesso',
      description: 'Um novo emprestimo foi criado com sucesso.',
    })
  }

  const { data: Users } = useQuery({
    queryKey: ['clientes'],
    queryFn: async () => {
      const result = await API.get<IUser[]>('/Cliente/Listar')
      return result.data
    },
  })

  const mutation = useMutation({
    mutationKey: ['emprestimo'],
    mutationFn: async (data: any) => {
      await API.post('/Emprestimos/Criar', data)
        .then(() => defaultValues())
        .catch(() =>
          toast({
            variant: 'destructive',
            title: 'Erro ao criar',
            description: 'Um erro ocorreu ao criar o emprestimo.',
          }),
        )
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Novo empréstimo</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[380px] rounded-lg sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Novo Empréstimo</DialogTitle>
          <DialogDescription>
            Criar um novo registro de empréstimo
          </DialogDescription>
          <DialogDescription asChild>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 pt-4"
              >
                <FormField
                  control={form.control}
                  name="idCliente"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cliente</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um cliente">
                              {Users?.filter(
                                (result) =>
                                  String(result?.id) ===
                                    String(form.watch('idCliente')) &&
                                  result.nome,
                              ).map((res) => res.nome)}
                            </SelectValue>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Users?.map((user) => (
                            <SelectItem key={user.id} value={String(user.id)}>
                              {user.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-6">
                  <SimpleDateForm
                    form={form}
                    label="Date Empréstimo"
                    name="dataEmprestimo"
                    placeholder="Data do empréstimo"
                  />
                  <InputCurrencyForm
                    label="Valor"
                    name="valorEmprestado"
                    form={form}
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <InputCurrencyForm
                    label="Juros"
                    name="valorJuros"
                    form={form}
                  />
                  <InputCurrencyForm
                    label="Juros do dia"
                    name="valorJurosDia"
                    form={form}
                  />
                </div>
                <TextAreaForm
                  label="Observação"
                  name="observacao"
                  form={form}
                />
                <div className="flex items-center justify-end">
                  <Button
                    variant="default"
                    type="submit"
                    className="w-36"
                    disabled={mutation.isPending}
                  >
                    Salvar
                  </Button>
                </div>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

interface PropsFormInput extends InputProps {
  label: string
  form: any
  name: string
}
interface PropsFormTextArea extends TextareaProps {
  label: string
  form: any
  name: string
}

export function InputCurrencyForm({
  label,
  form,
  name,
  ...props
}: PropsFormInput) {
  return (
    <>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <CurrencyInput
                value={field.value}
                onChangeValue={(_, value) => {
                  field.onChange(value)
                }}
                InputElement={<Input {...field} {...props} />}
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </>
  )
}

export function TextAreaForm({
  label,
  form,
  name,
  ...props
}: PropsFormTextArea) {
  return (
    <>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Textarea className="resize-none" {...field} {...props} />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </>
  )
}
