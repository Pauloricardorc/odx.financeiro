import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import Hero from '../../../assets/hero-juros.svg'

const session = z.object({
  email: z.string().email('nome@examplo.com'),
  senha: z.string(),
})

type Schema = z.infer<typeof session>

export function Login() {
  const [passwordView, setPasswordView] = useState(false)

  const { register, handleSubmit } = useForm<Schema>({
    resolver: zodResolver(session),
  })

  const onSubmit = () => {}

  return (
    <div className="mx-auto flex h-full w-full flex-col items-center justify-center gap-6 overflow-hidden px-2 xl:max-w-sm">
      <div>
        <img src={Hero} alt="" className="h-full w-full" />
      </div>
      <div className="flex flex-col items-center">
        <p className="text-2xl font-bold text-primary">Entrar agora</p>
        <span className="text-sm text-muted-foreground">
          hora de fazer o login na sua conta
        </span>
      </div>
      <div className="flex w-full flex-col">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <div className="relative">
            <Input
              {...register('email')}
              name="email"
              placeholder="nome@exemplo.com"
              required
              className="dark:bg-gray-950"
            />
          </div>
          <div className="relative">
            <Input
              {...register('senha')}
              name="senha"
              type={passwordView ? 'text' : 'password'}
              placeholder="*****"
              required
              className="dark:bg-gray-950"
            />
            <Button
              type="button"
              variant="link"
              className="absolute right-0 top-0 z-50 transition-all duration-200"
              onClick={() => setPasswordView(!passwordView)}
            >
              {passwordView ? <EyeIcon size={18} /> : <EyeOff size={18} />}
            </Button>
          </div>
          <Button type="submit" className="w-full" variant="outline">
            Entrar agora
          </Button>
        </form>
      </div>
      <span className="text-center text-sm font-normal text-muted-foreground">
        Ao clicar em continuar, você concorda com nossos{' '}
        <Button
          variant="link"
          className="px-0 text-sm font-normal text-primary underline"
        >
          Termos de serviço
        </Button>{' '}
        e{' '}
        <Button
          variant="link"
          className="px-0 text-sm font-normal text-primary underline"
        >
          política de Privacidade
        </Button>
        .
      </span>
    </div>
  )
}
