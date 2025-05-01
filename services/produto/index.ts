import db from '../../data/db'

const getAll = async () => {
  const result = await db.all('SELECT * FROM Produto')
  return result
}

const getById = async (id: number) => {
  const result = await db.get('SELECT * FROM Produto WHERE id = ?', id)
  return result
}

const create = async (nome: string, preco: number, id_fornecedor: number) => {
  const result = await db.run(
    'INSERT INTO Produto (nome, preco, id_fornecedor) VALUES (?, ?, ?)',
    nome,
    preco,
    id_fornecedor
  )

  if (result.lastID) {
    const cliente = await db.get(
      'SELECT * FROM Produto WHERE id = ?',
      result.lastID
    )
    return cliente
  }
  return null
}

const update = async (
  id: number,
  nome: string,
  preco: number,
  id_fornecedor: number
) => {
  const result = await db.run(
    'UPDATE Produto SET nome = ?, preco = ?, id_fornecedor = ? WHERE id = ?',
    nome,
    preco,
    id_fornecedor,
    id
  )

  if (result.changes) {
    const cliente = await db.get('SELECT * FROM Produto WHERE id = ?', id)

    return cliente
  }

  return null
}

const remove = async (id: number) => {
  const result = await db.run('DELETE FROM Produto WHERE id = ?', id)

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
