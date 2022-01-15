type Lang = {
  methodNotAllowed: string
  corsError: string
  internalServerError: string
  missingParameter: string
  duplicateParameter: string
  invalidChoice: string
  invalidParameter: string
}

export const english: Lang = {
  methodNotAllowed: 'Method not allowed',
  corsError: 'CORS error',  // TODO
  internalServerError: 'Internal server error',
  missingParameter: 'Missing parameter',
  duplicateParameter: 'Duplicate parameter',
  invalidChoice: 'Invalid parameter value',
  invalidParameter: 'Invalid parameter value',
}

export const portuguese: Lang = {
  methodNotAllowed: 'Método não permitido',
  corsError: 'Erro de CORS',  // TODO
  internalServerError: 'Erro interno do servidor',
  missingParameter: 'Parâmetro faltando',
  duplicateParameter: 'Parâmetro duplicado',
  invalidChoice: 'Parâmetro inválido',
  invalidParameter: 'Parâmetro inválido',
}

export let lang = english

export function setLang(newLang: Lang) {
  lang = newLang
}

export default {
  lang,
  setLang,
  english,
  portuguese,
}
