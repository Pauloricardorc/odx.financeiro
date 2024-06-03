/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { IUser } from '@/@types/users'
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
import { useToast } from '@/components/ui/use-toast'
import { API } from '@/service/axios'

const formSchema = z.object({
  valorEmprestado: z.coerce.number({
    message: 'Precisa informar o valor do empréstimo',
  }),
  valorJuros: z.coerce.number({ message: 'Valor do juros e obrigatório' }),
  valorJurosDia: z.coerce.number({
    message: 'Valor de juros por dia e obrigatório',
  }),
  idCliente: z.coerce.number({ required_error: 'Selecione um cliente' }),
})

export default function CriarEmprestimo() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const defaultValues = () => {
    form.reset()
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
      API.post('/Emprestimos/Criar', data)
        .then(() => defaultValues())
        .catch(() =>
          toast({
            variant: 'destructive',
            title: 'Erro ao criar',
            description: 'Um erro ocorreu ao criar o cliente.',
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
      <DialogContent className="max-w-[480px]">
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
                                  String(result.id) ===
                                    form.watch('idCliente') && result.nome,
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
                  <InputForm
                    label="Valor"
                    name="valorEmprestado"
                    type="number"
                    form={form}
                  />
                  <InputForm
                    label="Juros"
                    name="valorJuros"
                    type="number"
                    form={form}
                  />
                </div>
                <InputForm
                  label="Juros do dia"
                  name="valorJurosDia"
                  type="number"
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

export function InputForm({ label, form, name, ...props }: PropsFormInput) {
  return (
    <>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input {...field} {...props} />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </>
  )
}
