import type { IProduto } from 'interfaces/produto'
import db from '../../data/db'

const getAll = async () => {
  const result = await db.all('SELECT * FROM Venda')
  return result
}

const getById = async (id: number) => {
  const result = await db.get('SELECT * FROM Venda WHERE id = ?', id)
  return result
}

const createItemVenda = async (
  quantidade: number,
  total: number,
  venda: number,
  produto: number
) => {
  const result = await db.run(
    'INSERT INTO Item_Venda (quantidade, total, id_venda, id_produto) VALUES (?, ?, ?, ?)',
    quantidade,
    total,
    venda,
    produto
  )

  if (result.lastID) {
    return true
  }

  return false
}

const create = async (idCliente: number, produtos: IProduto[]) => {
  const data = Date()

  const total = produtos.reduce((total, produto) =>
    total + produto.preco!
  , 0)

  const result = await db.run(
    'INSERT INTO Venda (data, total, id_cliente) VALUES (?, ?, ?)',
    data,
    total,
    idCliente
  )

  if (result.lastID) {
    const idVenda = result.lastID

    produtos.forEach(async produto => {
      const total = produto.quantidade * produto.preco!

      await createItemVenda(produto.quantidade, total, idVenda, produto.id)
    })

    const response = await db.get(
      `
        SELECT Venda.id AS id_venda,
        Item_venda.id AS id_item_venda,
        CLiente.nome AS  cliente,
        Produto.nome AS produto,
        Item_venda.quantidade,
        Produto.preco,
        Item_venda.total
        FROM Venda
        INNER JOIN Item_venda ON (Item_venda.id_venda = Venda.id)
        INNER JOIN Cliente ON (Cliente.id = Venda.id_cliente)
        INNER JOIN Produto ON (Item_venda.id = Produto.id)
        WHERE Venda.id = ?
      `,
      idVenda
    )
    return response
  }
  return null
}

const update = async (
  id: number,
  data: number,
  total: number,
  id_cliente: number
) => {
  const result = await db.run(
    'UPDATE Venda SET data = ?, total = ?, id_cliente = ? WHERE id = ?',
    data,
    total,
    id_cliente,
    id
  )

  if (result.changes) {
    const cliente = await db.get('SELECT * FROM Venda WHERE id = ?', id)

    return cliente
  }

  return null
}

const remove = async (id: number) => {
  const result = await db.run('DELETE FROM Venda WHERE id = ?', id)

  if (result.changes) {
    return true
  }
  return false
}

export default {
  getAll,
  getById,
  create,
  update,
  remove,
}
