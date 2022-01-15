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
  corsError: 'CORS',  // TODO
  internalServerError: 'Internal server error',
  missingParameter: 'Missing parameter: {name}',
  duplicateParameter: 'Duplicate parameter: {name}',
  invalidChoice: 'Invalid parameter value: {name} = "{value}"',
  invalidParameter: 'Invalid parameter value: {name} = "{value}"',
}

export const portuguese: Lang = {
  methodNotAllowed: 'Método não permitido',
  corsError: 'CORS',  // TODO
  internalServerError: 'Erro interno do servidor',
  missingParameter: 'Parâmetro faltando: {name}',
  duplicateParameter: 'Parâmetro duplicado: {name}',
  invalidChoice: 'Parâmetro inválido: {name} = {value}',
  invalidParameter: 'Parâmetro inválido: {name} = {value}',
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
