import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

export function ClientesTableSkeleton() {
  return Array.from({ length: 3 }).map((_, i) => {
    return (
      <TableRow key={i}>
        <TableCell>
          <Skeleton className="h-4 w-auto" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-auto" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-auto" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-auto" />
        </TableCell>
      </TableRow>
    )
  })
}
