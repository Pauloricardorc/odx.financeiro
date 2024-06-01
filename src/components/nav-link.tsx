import { ComponentProps } from 'react'
import { Link, useLocation } from 'react-router-dom'

export type NavLinkProps = ComponentProps<typeof Link>

export function NavLink(props: NavLinkProps) {
  const { pathname } = useLocation()

  return (
    <Link
      {...props}
      data-current={pathname === props.to}
      className="relative flex items-center gap-1.5 p-4 text-sm font-medium text-muted-foreground transition-all duration-300 before:absolute before:-bottom-0.5 before:left-0 before:h-0.5 before:w-full before:transition-all before:duration-300 hover:text-primary/80 data-[current=true]:text-primary data-[current=true]:before:bg-primary/80"
    />
  )
}
