import formidable from 'formidable'
import { IncomingMessage } from 'http'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

/**
 * Use as `export const config = formConfig`, otherwise Next.js will
 * intercept the body and fail to parse it.
 */
export const formConfig = {
  api: {
    bodyParser: false,
  },
}

/**
 * The result of successfully parsing a form.
 * @see {@link parseForm}
 */
export type Form = {
  fields: formidable.Fields
  files: formidable.Files
}

/**
 * Manually parse a form from a request object.
 * @param req The request object, usually from a Next.js API handler.
 * @returns Form A promise that resolves to the parsed {@link Form}.
 */
export function parseForm(req: IncomingMessage): Promise<Form> {
  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: true })
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err)
      } else {
        resolve({ fields, files })
      }
    })
  })
}

// type FormHandler = (
//   req: NextApiRequest,
//   res: NextApiResponse,
//   form: Form,
// ) => Promise<void>

/**
 * Create a handler that simplifies "multipart/form-data" APIs.
 * This is somewhat less useful than {@link parseForm}, because it
 * prevents the use of `amemori/api`.
 *
 * @param handler The handler to wrap.
 * @returns A Next.js API handler.
 */
// export function form(handler: FormHandler): NextApiHandler {
//   return async (req: NextApiRequest, res: NextApiResponse) => {
//     const form = await parseForm(req)
//     await handler(req, res, form)
//   }
// }
