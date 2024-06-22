export type IEmprestimo = {
  id: number
  valorEmprestado: number
  valorAreceber: number
  valorJuros: number
  valorJurosDia: number
  dataEmprestimo: string
  dataQuitacao: string
  dataVencimento: string
  observacao: string
  status: number
  cliente: {
    id: number
    nome: string
    telefone: string
  }
  renovacoes: {
    dataPagamento: string
    valor: number
  }[]
}
