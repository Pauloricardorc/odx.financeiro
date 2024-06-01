import { BadgeDollarSignIcon, Boxes, UserCheck2 } from 'lucide-react'

import { NavLink } from './nav-link'

export default function Header() {
  return (
    <div className="mt-4 flex w-full items-center border-b px-4">
      <div className="pr-4">
        <Boxes className="h-8 w-8 text-primary" strokeWidth={1.2} />
      </div>
      <nav className="flex items-center space-x-2">
        <NavLink to="/">
          <BadgeDollarSignIcon />
          Empréstimos
        </NavLink>
        <NavLink to="/clientes">
          <UserCheck2 />
          Clientes
        </NavLink>
      </nav>
    </div>
  )
}
