/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FileEdit } from 'lucide-react'
import { CurrencyInput } from 'react-currency-mask'
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
import { Input, InputProps } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { API } from '@/service/axios'

const formSchema = z.object({
  valorEmprestado: z.coerce
    .number({
      message: 'Precisa informar o valor do empréstimo',
    })
    .min(1, 'Valor mínimo precisar ser maior que zero'),
  valorJuros: z.coerce
    .number({ message: 'Valor do juros e obrigatório' })
    .min(1, 'Valor mínimo precisar ser maior que zero'),
  valorJurosDia: z.coerce
    .number({
      message: 'Valor de juros por dia e obrigatório',
    })
    .min(1, 'Valor mínimo precisar ser maior que zero'),
})

export default function EditarEmprestimo({
  idEmprestimo,
}: {
  idEmprestimo: number
}) {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      valorEmprestado: 0,
      valorJuros: 0,
      valorJurosDia: 0,
    },
  })

  const defaultValues = () => {
    form.reset()
    queryClient.invalidateQueries({ queryKey: ['emprestimos'] })
    toast({
      variant: 'default',
      title: 'Editado com sucesso',
      description: 'Um emprestimo foi editado com sucesso.',
    })
  }

  const mutation = useMutation({
    mutationKey: ['emprestimo'],
    mutationFn: async (data: any) => {
      API.put('/Emprestimos/Alterar', {
        ...data,
        id: idEmprestimo,
      })
        .then(() => defaultValues())
        .catch(() =>
          toast({
            variant: 'destructive',
            title: 'Erro ao editar',
            description: 'Um erro ocorreu ao editar o empréstimo.',
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
        <Button
          variant="link"
          className="flex h-7 w-[30px] max-w-[30px] items-center justify-center rounded-full bg-amber-400/20 p-0 text-amber-400"
        >
          <FileEdit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Editar Empréstimo</DialogTitle>
          <DialogDescription>
            Editar um registro de empréstimo
          </DialogDescription>
          <DialogDescription asChild>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 pt-4"
              >
                <div className="grid grid-cols-2 gap-6">
                  <InputCurrencyForm
                    label="Valor"
                    name="valorEmprestado"
                    form={form}
                  />
                  <InputCurrencyForm
                    label="Juros"
                    name="valorJuros"
                    form={form}
                  />
                </div>
                <InputCurrencyForm
                  label="Juros do dia"
                  name="valorJurosDia"
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
