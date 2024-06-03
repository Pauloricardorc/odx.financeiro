/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod'
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

const formSchema = z.object({
  valorEmprestado: z.coerce.number({
    message: 'Precisa informar o valor do empréstimo',
  }),
  valorJuros: z.coerce.number({ message: 'Valor do juros e obrigatório' }),
  valorJurosDia: z.coerce.number({
    message: 'Valor de juros por dia e obrigatório',
  }),
  idCliente: z.coerce.number({ message: 'Adicione um clinete' }),
})

export default function CriarEmprestimo() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
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
                <InputForm
                  label="Cliente"
                  name="idCliente"
                  type="number"
                  form={form}
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
                  <Button variant="default" type="submit" className="w-36">
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
