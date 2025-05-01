import { Router } from 'express'

import {
  create,
  getAll,
  getById,
  remove,
  update,
} from '../../controllers/produto'

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

  if (result) {
    res.json(result)
  } else {
    res.status(404).json({
      message: 'product is not exists.',
    })
  }
})

routes.post('/', async (req, res) => {
  const { nome, preco, idFornecedor } = req.body

  if (!nome || !preco || !idFornecedor) {
    res.status(400).json({ message: 'nome, preco e idFornecedor is required.' })
    return
  }

  const result = await create(nome, preco, idFornecedor)

  if (result) {
    res.status(201).json({ message: nome, preco, idFornecedor })
  } else {
    res.status(400).json()
  }
})

routes.put('/:id', async (req, res) => {
  const { id } = req.params // para buscarmos o produto no banco

  if (!id) {
    res.status(400).json({
      message: 'id field is required.',
    })
  }
  const { nome, preco, idFornecedor } = req.body // dados para update

  if (!nome || !preco || !idFornecedor) {
    res.status(400).json({
      message: 'nome, preco and idFornecedor is required.',
    })
    return
  }

  const result = await update(id, nome, preco, idFornecedor)

  if (!result) {
    res.status(404).json({
      message: 'this product not exists.',
    })
  }

  res.json(result)
})

routes.delete('/:id', async (req, res) => {
  const { id } = req.params // para buscarmos o produto no banco
  if (!id) {
    res.json({
      message: 'id field is required.',
    })
  }

  const result = await remove(id)

  if (!result) {
    res.status(404).json({
      message: 'this product not exists.',
    })
  }
  res.json()
})

export default routes
