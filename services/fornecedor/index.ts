import db from '../../data/db'

const getAll = async () => {
  const result = await db.all('SELECT * FROM Fornecedor')
  return result
}

const getById = async (id: number) => {
  const result = await db.get('SELECT * FROM Fornecedor WHERE id = ?', id)
  return result
}

const create = async (nome: string) => {
  const result = await db.run('INSERT INTO Fornecedor (nome) VALUES (?)', nome)

  if (result.lastID) {
    const cliente = await db.get(
      'SELECT * FROM Fornecedor WHERE id = ?',
      result.lastID
    )
    return cliente
  }
  return null
}

const update = async (id: number, nome: string) => {
  const result = await db.run(
    'UPDATE Fornecedor SET nome = ? WHERE id = ?',
    nome,
    id
  )

  if (result.changes) {
    const cliente = await db.get('SELECT * FROM Fornecedor WHERE id = ?', id)

    return cliente
  }

  return null
}

const remove = async (id: number) => {
  const result = await db.run('DELETE FROM Fornecedor WHERE id = ?', id)

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
