import { Router } from 'express'

import {
  create,
  getAll,
  getById,
  remove,
  update,
} from '../../controllers/fornecedor'

const routes = Router()

routes.get('/', async (req, res) => {
  const result = await getAll()
  res.json(result)
})

routes.get('/:id', async (req, res) => {
  const { id } = req.params

  const result = await getById(id)

  if (!result) {
    res.status(404).json({
      message: 'Fornecedor not exists.',
    })
  } else {
    res.json(result)
  }
})

routes.post('/', async (req, res) => {
  const { nome } = req.body
  if (!nome) {
    res.status(400).json({
      message: 'Nome is required.',
    })
    return
  }

  const result = await create(nome)

  if (!result) {
    res.status(404).json({
      message: 'Fornecedor is not exist.',
    })
  } else {
    res.json(result)
  }
})

routes.put('/:id', async (req, res) => {
  const { id } = req.params // para buscarmos o produto no banco

  const { nome } = req.body // dados para update

  if (!id || !nome) {
    res.status(400).json({
      message: 'id and name fields are mandatory',
    })
    return
  }

  const result = await update(id, nome)

  res.status(200).json(result)
})

routes.delete('/:id', async (req, res) => {
  const { id } = req.params // para buscarmos o produto no banco

  if (!id) {
    res.status(400).json({
      message: 'id field is required.',
    })
    return
  }
  const result = await remove(id)

  if (!result) {
    res.status(404).json({
      message: 'Fornecedor is not exist.',
    })
  }
  res.json()
})

export default routes
