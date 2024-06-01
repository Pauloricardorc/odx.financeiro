export type IEmprestimo = {
  Id: number
  Valor: number
  ValorJuros: number
  ValorJurosDia: number
  IdCliente: string
  DataEmprestimo: Date | string
  DataQuitacao: Date | string
  DataVencimento: Date | string
  Status: number
}
