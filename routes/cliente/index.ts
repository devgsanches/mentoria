import express from 'express'

import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../../controllers/cliente'

const router = express.Router()

// router.get('/', async (req, res) => {
//   const result = await db.all(`
//     SELECT Venda.id AS id_venda,
//       Item_venda.id AS id_item_venda,
//       Cliente.nome AS cliente,
//       Produto.nome AS produto,
//       Item_venda.quantidade,
//       Produto.preco,
//       Item_venda.total
//     FROM Venda
//     INNER JOIN Item_venda ON (Item_venda.id_venda = Venda.id)
//     INNER JOIN Cliente ON (Cliente.id = Venda.id_cliente)
//     INNER JOIN Produto ON (Item_venda.id = Produto.id);
//   `);

//   res.status(200).json({
//     data: result,
//   })
// })

router.get('/', async (req, res) => {
  const result = await getAll()
  res.status(200).json(result)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params

  if (!id) {
    res.status(400).json({
      message: 'Id is required',
    })
  }

  const result = await getById(id)

  res.json(result)
})

router.post('/', async (req, res) => {
  const { nome } = req.body

  if (!nome) {
    res.status(400).json({
      message: 'Nome is required',
    })
  }

  const result = await create(nome)

  if (result) {
    res.status(200).json(result)
    return
  }

  res.status(400).json({
    message: 'Cliente not created',
  })
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { nome } = req.body

  if (!nome || !id) {
    res.status(400).json({
      message: 'Nome and id are required',
    })
  }

  const result = await update(id, nome)

  if (result) {
    res.status(200).json(result)
  }

  res.status(400).json({
    message: 'Cliente not updated',
  })
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  if (!id) {
    res.status(400).json({
      message: 'Id is required',
    })
  }

  const result = await remove(id)

  if (result) {
    res.status(200).json({
      message: 'Cliente deleted',
    })
  } else {
    res.status(400).json({
      message: 'Cliente not deleted',
    })
  }
})

export default router
