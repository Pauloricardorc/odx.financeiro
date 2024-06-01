import {
  BadgeDollarSignIcon,
  Boxes,
  HourglassIcon,
  UserCheck2,
} from 'lucide-react'

import { NavLink } from './nav-link'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'

export default function Header() {
  return (
    <div className="flex w-full items-center border-b px-4">
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
          <Button
            variant="link"
            onClick={() => {}}
            className="flex h-full items-center gap-1.5 p-4 text-sm font-medium text-muted-foreground hover:text-primary/80 hover:no-underline"
          >
            <HourglassIcon size={18} />
            Renovação
          </Button>
        </nav>
      </div>
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
  )
}
