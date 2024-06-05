/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
import { Input, InputFormMask, InputProps } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { API } from '@/service/axios'

const formSchema = z.object({
  nome: z
    .string({
      message: 'Nome e obrigatório',
    })
    .min(5, 'O nome precisa ter mais de 5 digitos'),
  telefone: z
    .string({ message: 'Telefone e obrigatório' })
    .min(17, 'Minimo de digitos obrigatório'),
})

export default function NovoCliente() {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: '',
      telefone: '',
    },
  })

  const defaultValues = () => {
    form.reset()
    queryClient.invalidateQueries({ queryKey: ['clientes'] })
    toast({
      variant: 'default',
      title: 'Criado com sucesso',
      description: 'Um novo cliente foi criado com sucesso.',
    })
  }

  const mutation = useMutation({
    mutationKey: ['users'],
    mutationFn: async (data: any) => {
      API.post('/Cliente/Criar', data)
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
        <Button variant="default">Novo cliente</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[380px] rounded-lg sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Novo Cliente</DialogTitle>
          <DialogDescription>Criar um novo cliente</DialogDescription>
          <DialogDescription asChild>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 pt-4"
              >
                <InputForm
                  label="Nome"
                  name="nome"
                  type="text"
                  form={form}
                  className="col-span-2"
                />
                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="telefone"
                    render={({ field }) => (
                      <FormItem className="col-span-2 sm:col-span-1">
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <InputFormMask {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
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
