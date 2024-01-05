import { cpf, cnpj } from 'cpf-cnpj-validator'
import { DocumentInvalidError } from './errors/doument-invalid-error'

export async function validateDocumentUseCase(
  document: string,
): Promise<string> {
  const numbersDocument = document.replace(/[^\d]+/g, '')

  if (numbersDocument.length === 11) {
    const cpfIsValid = cpf.isValid(numbersDocument)

    if (!cpfIsValid) {
      throw new DocumentInvalidError()
    }
    return numbersDocument
  } else if (numbersDocument.length === 14) {
    const cnpjIsValid = cnpj.isValid(numbersDocument)

    if (!cnpjIsValid) {
      throw new DocumentInvalidError()
    }
    return numbersDocument
  } else {
    throw new DocumentInvalidError()
  }
}
