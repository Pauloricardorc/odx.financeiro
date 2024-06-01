export type IEmprestimo = {
  Id: number
  Valor: number
  ValorJuros: number
  ValorJurosDia: number
  IdCliente: string
  DataEmprestimo: Date
  DataQuitacao: Date
  DataVencimento: Date
  Status: number
}
