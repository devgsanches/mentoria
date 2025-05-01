import { Router } from 'express'

import {
  create,
  getAll,
  getById,
  remove,
  update,
} from '../../controllers/venda'

const routes = Router()

routes.get('/', async (req, res) => {
  const result = await getAll()

  res.json(result)
})

routes.get('/:id', async (req, res) => {
  const { id } = req.params

  if (!id) {
    res.status(400).json({
      message: 'id field is required.',
    })
    return
  }

  const result = await getById(id)

  if (!result) {
    res.status(404).json({
      message: 'unregistered sale',
    })
  }

  res.json(result)
})

routes.post('/', async (req, res) => {
  const { data, total, idCliente } = req.body

  if (!data || !total || !idCliente) {
    res.status(400).json({
      message: 'data, total, idCliente fields is required.',
    })
  }

  const result = await create(data, total, idCliente)

  res.status(201).json(result)
})

routes.put('/:id', async (req, res) => {
  const { id } = req.params // para buscarmos o produto no banco
  if (!id) {
    res.status(400).json({
      message: 'id is required',
    })
    return
  }

  const { data, total, idCliente } = req.body // dados para update

  const result = await update(id, data, total, idCliente)

  if (!result) {
    res.status(404).json({
      message: 'Sale not found',
    })
    return
  }

  res.json(result)
})

routes.delete('/:id', async (req, res) => {
  const { id } = req.params // para buscarmos o produto no banco

  if (!id) {
    res.status(400).json({
      message: 'id is required.',
    })
  }
  const result = await remove(id)

  if (!result) {
    res.status(404).json({
      message: 'Sale not found',
    })
    return
  }

  res.json()
})

export default routes
