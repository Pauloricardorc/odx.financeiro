import { BadgeDollarSignIcon, LogOutIcon, UserCheck2 } from 'lucide-react'
import { useCookies } from 'react-cookie'

import { HeaderLogo } from '@/assets/header-logo'

import { NavLink } from './nav-link'
import { ModeToggle } from './theme/mode-toggle'
import { TooltipDemo } from './tooltip'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'

export default function Header() {
  const [, , removeSessionCookie] = useCookies(['session'])

  return (
    <div className="flex w-full items-center border-b bg-card px-4">
      <div className="flex flex-1 items-center">
        <div className="pr-4">
          <HeaderLogo />
        </div>
        <nav className="flex items-center space-x-2">
          <NavLink to="/">
            <BadgeDollarSignIcon size={18} />
            Empréstimos
          </NavLink>
          <NavLink to="/clientes">
            <UserCheck2 size={18} />
            Clientes
          </NavLink>
        </nav>
      </div>
      <div className="hidden items-center gap-2 sm:flex">
        <ModeToggle />
        <TooltipDemo title="Sair">
          <Button
            variant="outline"
            className="border-0 bg-primary/20 px-2"
            onClick={() => removeSessionCookie('session', { path: '/' })}
          >
            <LogOutIcon size={18} className="text-primary" />
          </Button>
        </TooltipDemo>
        <div className="hidden h-full w-[220px] items-center gap-2 border-l px-4 md:flex">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col -space-y-2">
            <span className="font-medium text-muted-foreground">
              adm@ordex.com
            </span>
            <span className="font-normal text-primary">painel admin</span>
          </div>
        </div>
      </div>
    </div>
  )
}
