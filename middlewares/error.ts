import type { NextFunction, Request, Response } from 'express'
import ErrorApi from 'interfaces/errorApi'

const handleError = (
  err: ErrorApi,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ErrorApi) {
    res.status(err.statusCode).json({
      sucess: false,
      message: err.message,
    })
  }
  next(err)
}

export default handleError
