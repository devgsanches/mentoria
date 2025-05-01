import db from '../../data/db'

const getAll = async () => {
  const result = await db.all('SELECT * FROM Venda')
  return result
}

const getById = async (id: number) => {
  const result = await db.get('SELECT * FROM Venda WHERE id = ?', id)
  return result
}

const create = async (data: number, total: number, id_cliente: number) => {
  const result = await db.run(
    'INSERT INTO Venda (data, total, id_cliente) VALUES (?, ?, ?)',
    data,
    total,
    id_cliente
  )

  if (result.lastID) {
    const cliente = await db.get(
      'SELECT * FROM Venda WHERE id = ?',
      result.lastID
    )
    return cliente
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
