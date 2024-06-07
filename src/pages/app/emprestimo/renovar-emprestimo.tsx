/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
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

interface Props {
  idEmprestimo: number
}

const formSchema = z.object({
  valor: z.coerce
    .number({ message: 'Valor do juros e obrigatório' })
    .min(1, 'Valor mínimo precisar ser maior que zero'),
})

export default function Renovacao({ idEmprestimo }: Props) {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      valor: 0,
    },
  })

  const defaultValues = () => {
    form.reset()
    toast({
      variant: 'default',
      title: 'Renovado com sucesso',
      description: 'Um novo emprestimo foi renovado com sucesso.',
    })
    queryClient.invalidateQueries({ queryKey: ['emprestimos'] })
  }

  const mutation = useMutation({
    mutationKey: ['renovacao'],
    mutationFn: async (valor: z.infer<typeof formSchema>) => {
      API.post('/Emprestimos/Renovar', {
        idEmprestimo,
        valor: valor.valor,
      })
        .then(() => defaultValues())
        .catch(() =>
          toast({
            variant: 'destructive',
            title: 'Erro ao renovar',
            description: 'Um erro ocorreu ao criar a renovação.',
          }),
        )
    },
  })

  function onSubmit(valor: z.infer<typeof formSchema>) {
    mutation.mutate(valor)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="flex w-full items-center justify-start text-sm text-accent-foreground transition-colors hover:bg-transparent/10 hover:no-underline"
        >
          renovar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[380px]">
        <DialogHeader>
          <DialogTitle>Renovar empréstimo</DialogTitle>
          <DialogDescription asChild>
            <div>
              <p>Fazer uma renovação do empréstimo de forma rápida aqui</p>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="mt-6 space-y-6"
                >
                  <div className="grid grid-cols-1 gap-6">
                    <InputCurrencyForm
                      label="Valor"
                      name="valor"
                      className="col-span-1"
                      form={form}
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
            </div>
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
