import { BadgeDollarSignIcon, Boxes, UserCheck2 } from 'lucide-react'

import Renovacao from '@/pages/app/renovacao'

import { NavLink } from './nav-link'
import { ModeToggle } from './theme/mode-toggle'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export default function Header() {
  return (
    <div className="flex w-full items-center border-b bg-card px-4">
      <div className="flex flex-1 items-center">
        <div className="pr-4">
          <Boxes className="h-8 w-8 text-primary" strokeWidth={1.2} />
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
          <Renovacao />
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <ModeToggle />
        <div className="flex h-full w-[220px] items-center gap-2 border-l px-4">
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
