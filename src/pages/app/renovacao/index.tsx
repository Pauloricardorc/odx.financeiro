/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod'
import { HourglassIcon } from 'lucide-react'
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
  idEmprestimo: z.coerce.number({
    message: 'Precisa informar o valor do empréstimo',
  }),
  valor: z.coerce.number({ message: 'Valor do juros e obrigatório' }),
})

export default function Renovacao() {
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
        <Button
          variant="link"
          onClick={() => {}}
          className="flex h-full items-center gap-1.5 p-4 text-sm font-medium text-muted-foreground hover:text-primary/80 hover:no-underline"
        >
          <HourglassIcon size={18} />
          Renovação
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Renovar empréstimo</DialogTitle>
          <DialogDescription asChild>
            <div>
              <p>Fazer uma renovação do empréstimo de forma rápida aqui</p>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="mt-6 space-y-4"
                >
                  <div className="grid grid-cols-2 gap-6">
                    <InputForm
                      label="Emprestimo"
                      name="idEmprestimo"
                      type="number"
                      form={form}
                    />
                    <InputForm
                      label="Valor"
                      name="valor"
                      type="number"
                      form={form}
                    />
                  </div>
                  <div className="flex items-center justify-end">
                    <Button variant="default" type="submit" className="w-36">
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
