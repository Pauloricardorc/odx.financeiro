import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface PropsPage {
  totalPages: number
  page: number
  perPage: number
  setPage: (value: number) => void
  setPerPage: (value: number) => void
}

export default function CustomPagination({
  totalPages,
  page,
  perPage,
  setPage,
  setPerPage,
}: PropsPage) {
  const PreventPagination = () => {
    if (page > 0) {
      setPage(page - 10)
      setPerPage(perPage - 10)
    }
  }
  const NextPagination = () => {
    if (totalPages > perPage) {
      setPage(page + 10)
      setPerPage(perPage + 10)
    }
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => PreventPagination()} />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={() => NextPagination()} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
