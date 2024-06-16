import { Document, Page, Text, View } from '@react-pdf/renderer'

export const ContratoDeEmprestimo = () => {
  return (
    <Document>
      <Page size="A4">
        <View style={{ color: 'white', textAlign: 'center', margin: 30 }}>
          <Text style={{ color: 'black' }}>
            CONTRATO DE EMPRÉSTIMO DE DINHEIRO
          </Text>
        </View>
      </Page>
    </Document>
  )
}
