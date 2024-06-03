export type IEmprestimo = {
  id: number
  valorEmprestado: number
  valorAreceber: number
  valorJuros: number
  valorJurosDia: number
  dataEmprestimo: string
  dataQuitacao: string
  dataVencimento: string
  status: number
  cliente: {
    id: number
    nome: string
    telefone: string
  }
  renovacoes: []
}
